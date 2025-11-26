function verificarLogin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    alert("Você precisa estar logado!");
    window.location.href = "login.html";
  }
}
