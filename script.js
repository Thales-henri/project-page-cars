function mostrar_senha() {
  var senha = document.getElementById('caixa_senha')
  var senhaConfirm = document.getElementById('confirm_senha')
  if (senha.type || senhaConfirm.type == 'password') {
    senha.type = "text";
    senhaConfirm.type = "text";
  }
  else {
    senha.type = "password";
  }
};

document.getElementById("toggle-password").addEventListener("click", mostrar_senha)

async function Enter() {
   const email = document.getElementById('caixa_email').value
   const senha = document.getElementById('caixa_senha').value

   const dados  = (email, senha)

   const resposta = await fetch("http://localhost:3004/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })}
   )
  const data = await resposta.json();

  if (resposta.ok) {
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
console.log(data.usuario)
    alert("Login realizado!");
    window.location.href = "carros.html";
  } else {
    alert(data.erro);
  }
}


function Cadastrar() {
  window.location.href = "/cadastro_usuario.html"
}



function voltar() {
  window.history.back()
}

async function Cadastro() {
  const nome = document.getElementById("name").value;
  const sobrenome = document.getElementById("last_name").value;
  const numero = document.getElementById("number").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("caixa_email").value;
  const senha = document.getElementById("caixa_senha").value;
  const confirm_senha = document.getElementById("confirm_senha").value;


  if (senha !== confirm_senha) {
    alert("As senhas não coincidem!");
    return;
  }

  const dados = {
    nome,
    sobrenome,
    numero,
    cpf,
    email,
    senha
  };

  try {
    const resposta = await fetch("http://localhost:3004/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();
    console.log(resultado)
    if (resposta.ok) {
      alert(resultado.mensagem);
      window.location.href = "home.html"; 
    } else {
      alert("Erro: " + resultado.erro);
    }

  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
    alert("Erro na conexão com o servidor.");
  };
}
document.getElementsByClassName("Cadastra")[0].addEventListener("click", Cadastrar)

function verificarLogin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    alert("Você precisa estar logado!");
    window.location.href = "login.html";
  }
}

