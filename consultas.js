const { Pool } = require("pg");
//database config
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database:process.env.DB_DATABASE,
};

//pool use config
const pool = new Pool(config);

const executeQuery = async (objConsulta) => {
  const client = await pool.connect();
  try {
    const respuesta = await client.query(objConsulta);
    client.release();
    return respuesta;
  } catch (error) {
    client.release();
    return error;
  }
};

const getUsers = async () => {
  //traemos a todos los usuarios a la vista "/" exceptuando los administradores
  const objConsulta = {
    text: `SELECT id, email, nombre, anos_experiencia, especialidad, foto, estado FROM skaters WHERE role = 0 ORDER BY id ASC;`,
  };
  const { rows: users } = await executeQuery(objConsulta);
  return users;
};

//registrar usuario
const registerUser = async (userData) => {
  //remove password2 from userData object
  delete userData.password2;
  //get values from userData object
  const values = Object.values(userData);



  const objConsulta = {
    text: `INSERT INTO skaters (nombre, email, password, anos_experiencia, especialidad, foto, estado, role)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *; `,
    values: values,
  };
  try {
    const registro = await executeQuery(objConsulta);
    return registro;
  } catch (error) {
    return error;
  }
};
//search email on table
const searchEmail = async (email) => {
   
    const objConsulta = {
        text: `SELECT email FROM skaters WHERE email = $1;`,
        values: [email],
      };
      try {
        const registro = await executeQuery(objConsulta);
        return registro;
      } catch (error) {
        return error;
      }
}

//verificar si en login admin se esta logueando un admin efectivamente
const verifyUser = async (email, pass)=>{

  const objConsulta = {
    text: `SELECT id, email, password,foto, role FROM skaters WHERE email = $1 AND password = $2;`,
    values: [email, pass],
  };
  try {
    const registro = await executeQuery(objConsulta);
    
    return registro;
  } catch (error) {
    return error;
  }

}

const changeUserStatus = async (userData)=>{
const {userId, finalStatus}= userData;

  const objConsulta = {
    text: `UPDATE skaters SET estado = $1 WHERE id = $2 RETURNING *;`,
    values: [finalStatus, userId],
};
const resultado = await pool.query(objConsulta);
const userUpdateStatus = resultado.rows;
return userUpdateStatus;
}

const deleteUser = async (userId)=>{
  console.log('userId CONSULTAS.js:', userId);
  const objConsulta = {
    text: `DELETE FROM skaters where id = $1 RETURNING *;`,
    values: [userId],
};

const resultado = await pool.query(objConsulta);
    const userDeleted= resultado.rows;
    return userDeleted;


}

//export functions
module.exports = {
  getUsers,
  registerUser,
  searchEmail,
  verifyUser,
  changeUserStatus,
  deleteUser

};
