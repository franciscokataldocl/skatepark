window.onload = () => {
  //variable para almacenar erores
  let errores = {};
  //detectar html error para pintar errores
  const error = document.getElementById("error");
  //detectar input email para posterior verificacion en la base de datos
  const emailInput = document.getElementById("emailInput");

  //######FUNCTION DETECTAR SI EMAIL YA ESTA REGISTRADO EN LA BBDD
  emailInput.addEventListener("change", async () => {
    //tomar valor de input email
    const emailValue = emailInput.value;
    try {
      fetch("http://localhost:3000/searchEmail", {
        method: "POST",
        body: JSON.stringify({ emailValue }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //de la data tomar el numero (EmailExist = 1 email esta regitrado ya // EmailExist = 0 email no esta registrado)
          const { emailExist } = data;
          //si email ya existe en la base de datos
          if (emailExist === 1) {
            //aregar el error al objeto errores
            errores.mailExist = "El email ya está registrado";
            //agregar css al email input
            emailInput.classList.add(
              "animate__animated",
              "animate__shakeX",
              "input-error"
            );
            //si existe el mail en la bbdd recorrer el obj errores y pintarlo en el html
            let errObj = Object.values(errores);
            error.innerHTML = "";
            errObj.map((err) => {
              error.innerHTML += `${err}<br>`;
            });
          } else {
            //si el mail no existe en la bbdd eliminar errores del objeto errores y quitar el css del frontend
            delete errores.mailExist;
            emailInput.classList.remove(
              "animate__animated",
              "animate__shakeX",
              "input-error"
            );
          }
        });
    } catch (error) {
      console.log(error);
    }
  });

  //detectar formulario de registro
  document.getElementById("form").onsubmit = function onSubmit(form) {
    //variable para manejar el momento en el que se enviara el formulario... despues de validar
    let isValid = false;
    //detectar inputs del formulario
    const nombreInput = document.getElementById("nombreInput").value;
    const emailInput = document.getElementById("emailInput").value;
    const pass1 = document.getElementById("pass1").value;
    const pass2 = document.getElementById("pass2").value;
    const aniosInput = document.getElementById("aniosInput").value;
    const especialidadInput =
      document.getElementById("especialidadInput").value;
    const imageUpload = document.getElementById("imageUpload");

    //validaciones
    if (nombreInput === "") {
      //agregar al objeto errores si es que hay error, para luego pintarlo en el frontend
      errores.nombre = "Nombre no puede estar vacio";
    } else {
      delete errores.nombre;
    }
    if (emailInput === "") {
      errores.email = "Email no puede estar vacio";
    } else {
      delete errores.email;
    }

    if (pass1 === "") {
      errores.pass1 = "Contraseña no puede estar vacio";
    }
    if (pass2 === "") {
      errores.pass2 = "Debes confirmar tu contraseña";
    }
    //verificar si contraseñas son identicas
    if (pass1 !== "" && pass2 !== "" && pass1 === pass2) {
      delete errores.pass1;
      delete errores.pass2;
      delete errores.passMatch;
    } else {
      errores.passMatch = "Las contraseñas deben ser identicas";
    }

    if (aniosInput === "") {
      errores.anios = "Debes Seleccionar un año de experiencia";
    } else {
      delete errores.anios;
    }
    if (especialidadInput === "") {
      errores.especialidad = "Escribe tu especialidad";
    } else {
      delete errores.especialidad;
    }
    //verificar si existe imagen subida por el usuario
    if (imageUpload.files.length === 0) {
      errores.image = "Debes subir una imagen";
    } else {
      delete errores.image;
    }

    //si no hay errores en el objeto errores significa que todo esta ok
    if (Object.keys(errores).length === 0) {
      //vaciamos el objeto errores
      errores = {};
      //eliminamos los errores previos del html frontend
      error.innerHTML = "";
      //cambiamos la variable de validacion de false a true
      isValid = true;
    }

    //si isvalid es distinto de true
    if (!isValid) {
      //recorremos el objeto errores y pintamos esos errores en el html
      const errObj = Object.values(errores);
      error.innerHTML = "";
      errObj.map((err) => {
        error.innerHTML += `${err}<br>`;
      });

      return false;
    } else {
      //caso contrario si isvalid es verdadero, enviamos el formulario
      return true;
    }
  };
};
