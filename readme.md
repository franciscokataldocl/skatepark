¿Dónde quedé?
----------------------------------------------------------------------------------------------------
24-oct-2021
Quede en la parte de eliminar el error cuando el email no existe en la base de datos
el error queda marcado en el front end, aunque no haya error.
luego de esto, debo volver a recibir los datos en el backend, en la funcion:
app.post("/register", async (req, res) 
----------------------------------------------------------------------------------------------------
25-oct-2021
Quede en la parte de manejar el login de usuarios
sistema debera identificar:
1 - si usario existe en base de datos
2 - Si usuario no existe sugerir el registro
3 - Si usario existe y es admin enviar a vista de admin
4 - si usuario existe y no es admin enviar al perfil
----------------------------------------------------------------------------------------------------
25-oct-2021
login terminado
registro terminado
1- proceder a crear vista de administrador y sus funciones
2- proceder a crear vista de perfil de usuario
3- proceder a generar jwt para las vistas
4- proceder a proteger vistas de administrador
5- proceder a proteger vistas unicas de usuarios 
(solo el mismo usuiario puede ver su perfil, y un admin no puede modificar el perfil de un usuario)
----------------------------------------------------------------------------------------------------
26-oct-2012
terminado sistema de modificacion de estado de usuarios
terminado sistema de eliminacion de usuarios
1- proceder a proteger ruta de administrador, donde solo el admin podra verla
2 - Crear vista de perfil de cada usuario donde podra modificar sus datos personales
3- Proteger vista de perfil de usuario, donde usuario logueado solo podra ver su perfil
4 -Proteger todas las vistas de perfil de usuarios, solo usuario logeado podra verla