// Escuchar el envío del formulario
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente
  
    // Obtener los valores del formulario
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    // Validar las credenciales
    if (email === "samuelrobayo714@gmail.com" && password === "Samuel12345") {
      // Guardar los datos del usuario en localStorage
      localStorage.setItem(
        "usuarioActivo",
        JSON.stringify({ nombre: "Samuel Robayo", email: email })
      );
  
      // Redirigir al perfil
      window.location.href = "perfil.html";
    } else {
      // Mostrar un mensaje de error si las credenciales son incorrectas
      alert("Correo o contraseña incorrectos. Inténtalo de nuevo.");
    }
  });
  