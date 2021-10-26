//detectar checkbox
const checkBox = document.querySelectorAll(".checkbox");
const deleteButton = document.querySelectorAll(".delete-icon");

//convertir nodelist en arreglo
const checkButtons = Array.from(checkBox);
const deleteButtons = Array.from(deleteButton);

//iterar array de checkboxes
checkButtons.map((checkItem) => {
  //agregar listener a cada elemento
  checkItem.addEventListener("click", async (e) => {
    const userId = e.target.getAttribute("data-id");
    let userStatus = e.target.getAttribute("data-status");
    let finalStatus;
    if (userStatus === "false") {
      finalStatus = true;
      console.log(`el estado era ${userStatus} y ahora paso a ${finalStatus}`);
    }
    if (userStatus === "true") {
      finalStatus = false;
      console.log(`el estado era ${userStatus} y ahora paso a ${finalStatus}`);
    }
    const userData = { userId, finalStatus };
    //fetch para modificar el estado del usuario
    try {
      await fetch("http://localhost:3000/userstatus", {
        method: "PUT",
        body: JSON.stringify({ userData }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
        //   window.location.href = "/admin";
        Swal.fire({
            title: 'Usuario modificado!',
            text: 'El estado del usuario fue modificado satisfactoriamente',
            icon: 'success',
            confirmButtonText: 'TERMINAR',
            confirmButtonColor: '#f88e2b',
          }).then(function(){ 
            location.reload();
            })
        });
    } catch (error) {
      console.log(error);
    }
  });
});

//iterar delete buttons
deleteButtons.map((deleteItem)=>{
    //agregar listener a cada elemento
    deleteItem.addEventListener("click", async (e) => {
    const userId = e.target.getAttribute("data-id");
    //fetch para eliminar usuario
    try {
      await fetch("http://localhost:3000/deleteuser", {
        method: "DELETE",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
        // window.location.href = "/admin";
            console.log('data from admin.js',data)
        Swal.fire({
            title: 'Eliminado!',
            text: 'El usuario fue eliminado correctamente',
            icon: 'success',
            confirmButtonText: 'TERMINAR',
            confirmButtonColor: '#f88e2b',
          }).then(function(){ 
            location.reload();
            })
          
        
        });
    } catch (error) {
      console.log(error);
    }
  });
})


