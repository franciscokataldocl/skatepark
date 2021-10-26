window.onload = () => {





  //variable para almacenar errores
  let errores = {};
  const error = document.getElementById("error");
  //boton formulario login
  const submiLogin = document.getElementById("submiLogin");

  //listener en boton formulario
  submiLogin.addEventListener("click", async (e) => {
    e.preventDefault();
    //tomar valores de inputs
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;














    //validaciones input
    if (email === "") {
      errores.email = "Email no puede estar vacio";
    } else {
      delete errores.email;
    }
    if (pass === "") {
      errores.pass = "Contraseña no puede estar vacio";
    } else {
      delete errores.pass;
    }

    //comprobar contenido de errores - - si es igual 0 errores
    if (Object.keys(errores).length === 0) {
      errores = {};
      error.innerHTML = "";

      //generar objeto con email y password para hacer el fetch a login
      const userData = { email, pass };
      //intentar hacer fetch
      try {
        await fetch("http://localhost:3000/login", {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const token = data.token;
            console.log('data: ', data)
            localStorage.setItem('token', JSON.stringify(token))
            //cuando haya respuesta del fetch
            //comprobar que usuario y contraseña coinciden con un user de la bbdd
            if (data.num === 0) {
              error.innerHTML = data.mensaje;
            }
            //si usuario existe y no es administrador lo enviamos al home ya logueado
            if (data.num === 1 && data.role === 0) {
              window.location.href = "/";
            }

            //si usuario existe y es administrador lo enviamos a la vista de admin
            if (data.num === 1 && data.role === 1) {
              window.location.href = "/admin";
            }
          });
      } catch (error) {
        console.log(error);
      }

      //end fetch to api
    } else {
      //si aun existen errores, pintarlos en el front end
      const errObj = Object.values(errores);
      error.innerHTML = "";
      errObj.map((err) => {
        error.innerHTML += `${err}<br>`;
      });
    }
  });
};
