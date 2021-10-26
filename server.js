const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
const expressFileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY;
const { v4: uuidv4 } = require("uuid");

//import js files
const {
  getUsers,
  registerUser,
  searchEmail,
  verifyUser,
  changeUserStatus,
  deleteUser
} = require("./consultas");

//url enconde
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//assets folders
app.use(express.static(__dirname + "/assets"));

//public folders
app.use(express.static(__dirname + "/public"));

//fileupload config
app.use(
  expressFileUpload({
    limits: 5000000, //5mb
    abortOnLimit: true,
    responseOnLimit: "El tamaño de la imagen supera el límite permitido",
  })
);

//handlebar engine config
app.set("view engine", "hbs");
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/mainlayout`,
    extname: ".hbs",
    helpers: {
      inc: function (value) {
        return parseInt(value) + 1;
      },
      ifEqual: function (obj, value, trueString, falseString) {
        return obj === value ? trueString : falseString;
      },
    },
  })
);

//-----ROUTES

//root route
app.get("/", async (req, res) => {
  const skaters = await getUsers();
  res.render("home", { skaters });
});

//register get route
app.get("/register", async (req, res) => {
  res.render("register");
});

//register new user
app.post("/register", async (req, res) => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("La imagen no ha podido ser enviada");
  } else {
    const userData = req.body;

    //img from frontend
    const files = req.files.profileImage;
    //add filename to userData object
    const uuidImage = uuidv4();
    userData.filename = `${uuidImage}-${files.name}`;
    //add default state to userData
    userData.estado = false;
    userData.role = 0;

    //save image into folder
    files.mv(
      `${__dirname}/public/userimages/${userData.filename}`,
      async (err) => {
        if (err)
          return res.status(500).send({
            error: `Algo salió mal... ${err}`,
            code: 500,
          });
        const ingreso = await registerUser(userData);
        res.redirect("/");
      }
    );
  }
});

//route searchEmail on register form
app.post("/searchEmail", async (req, res) => {
  const { emailValue } = req.body;
  // const email = 'franciscolork@gmail.com'
  const userEmail = await searchEmail(emailValue);
  res.send({ emailExist: userEmail.rowCount });
});

//route get admin
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    //enviar datos de usuario a consultas
    const verify = await verifyUser(email, pass);
    //variable para almacenar el rol del usuario
    let userRole = "";
    //verificar si existe row en la consulta (significa que se ha logueado un usuario que existe)
    //email y password coinciden con un registro de la base de datos
    //de ser asi, verificamos el rol del usuario
    if (typeof verify.rows[0] !== "undefined") {
      // the variable is defined
      userRole = verify.rows[0].role;
    } else {
      userRole = 0;
    }

    //si email y pass no coinciden con un registro de la base de datos
    if (verify.rowCount === 0) {
      res.status(200).send({
        num: 0,
        mensaje: "usuario no existe o contraseña es inválida",
      });
    }
    //si usuario existe, pero no es administrador
    if (verify.rowCount === 1 && userRole === 0) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 180,
          data: verify.rows[0],
        },
        secretKey
      );
      // res.redirect('/admin')
      res.status(200).send({ num: 1, role: 0, token: token });
    }
    //si usuario existe y es administrador
    if (verify.rowCount === 1 && userRole === 1) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 180,
          data: verify.rows[0],
        },
        secretKey
      );
      // res.redirect('/')
      res.status(200).send({ num: 1, role: 1, token: token });
    }
  } catch (error) {
    res.status(500).send({
      error: `upss... algo ha salido mal ${error}`,
      code: 500,
    });
  }
});

app.post("/verifytoken", async (req, res) => {
  const { email, password } = req.body;
  const user = await getUsers(email, password);
  if (user) {
    if (user.auth) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 180,
          data: user,
        },
        secretKey
      );
      res.send(token);
    } else {
      res.status(401).send({
        error: "este usuario aun no ha sido validado",
        code: 404,
      });
    }
  } else {
    res.status(404).send({
      error: "este usuario no esta registrado en la bae de datos",
      code: 404,
    });
  }
});

app.get("/admin", async (req, res) => {
  const skaters = await getUsers();
  res.render("admin", { skaters });
});

app.put("/userstatus", async (req, res) => {
  const { userData } = req.body;
  try {
    const userStatus = await changeUserStatus(userData);
    res.status(200).send(userStatus);
  } catch (error) {
    res.status(500).send({
      error: `No se hemos podido modificar el estado del usuario, por favor intenta más tarde... ${error.message}`,
      code: 500,
    });
  }
});

app.delete("/deleteuser", async (req, res) => {
  const { userId } = req.body;
  try {
    const userDelete = await deleteUser(userId);
    res.status(200).send(userDelete );
  } catch (error) {
    res.status(500).send({
      error: `El hemos podido eliminar el usuario, intenta más tarde... ${error.message}`,
      code: 500,
    });
  }
});

//server init
app.listen(port, () => console.log(`server on port ${port}`));
