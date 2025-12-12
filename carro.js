function trocarImagem(urlImagem) {
    document.getElementById('imagem-destaque').src = urlImagem;
}


async function deletarImagem(imagemId, carroId) {
    const confirmar = confirm("Tem certeza que deseja deletar esta imagem?");
    if (!confirmar) return;

    try {
        const resposta = await fetch(`http://localhost:3004/carros/imagem/${imagemId}`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            alert("Imagem deletada com sucesso!");
            await carregarImagensCarro(carroId);
        } else {
            alert("Erro ao deletar imagem");
        }
    } catch (erro) {
        console.error("Erro ao deletar imagem:", erro);
        alert("Erro ao deletar imagem");
    }
}

async function carregarImagensCarro(carroId) {
    try {
        const resposta = await fetch(`http://localhost:3004/carros/imagens/${carroId}`);
        const dados = await resposta.json();
        
        const miniaturasContainer = document.getElementById('miniaturas-container');
        miniaturasContainer.innerHTML = ''; 
        
        const usuarioJson = localStorage.getItem("usuario");
        const isAdmin = usuarioJson ? JSON.parse(usuarioJson).tipo === "admin" : false;
        
        if (dados.imagens && dados.imagens.length > 0) {
            dados.imagens.forEach((imagem, index) => {
                const urlImagem = `http://localhost:3004/image//${imagem.nome_arquivo}`;
                
                if (index === 0) {
                    document.getElementById('imagem-destaque').src = urlImagem;
                }
                
                const miniaturaWrapper = document.createElement('div');
                miniaturaWrapper.classList.add('miniatura-wrapper');
                
                const miniatura = document.createElement('img');
                miniatura.src = urlImagem;
                miniatura.classList.add('miniatura');
                if (index === 0) miniatura.classList.add('ativa');
                
                miniatura.onclick = () => {
                    trocarImagem(urlImagem);
                    document.querySelectorAll('.miniatura').forEach(m => m.classList.remove('ativa'));
                    miniatura.classList.add('ativa');
                };
                
                miniaturaWrapper.appendChild(miniatura);
                
                if (isAdmin) {
                    const botaoDeletar = document.createElement('button');
                    botaoDeletar.innerHTML = '🗑️';
                    botaoDeletar.classList.add('btn-deletar-imagem');
                    botaoDeletar.title = 'Deletar imagem';
                    botaoDeletar.onclick = (e) => {
                        e.stopPropagation(); 

                        deletarImagem(imagem.id, carroId);
                    };
                    miniaturaWrapper.appendChild(botaoDeletar);
                }
                
                miniaturasContainer.appendChild(miniaturaWrapper);
            });
            return true; 
        }
        return false; 
    } catch (erro) {
        console.error('Erro ao carregar imagens:', erro);
        return false;
    }
}


async function reservarCarro(idCarro) {
    const usuarioJson = localStorage.getItem("usuario");
    
    if (!usuarioJson) {
        alert("Você precisa estar logado para reservar!");
        window.location.href = "login.html";
        return;
    }

    const usuario = JSON.parse(usuarioJson);

    const reserva = {
        id_usuario: usuario.id,
        id_carro: idCarro
    };

    try {
        const response = await fetch("http://localhost:3004/usuarios/reservar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reserva)
        });

        const data = await response.json();
        alert(`${data.mensagem} - Reservado por: ${usuario.nome}`);
        
        location.reload();
    } catch (erro) {
        console.error("Erro ao reservar:", erro);
        alert("Erro ao reservar o veículo. Tente novamente.");
    }
}

async function Puxarcarro() {
    const resposta = await fetch("http://localhost:3004/carros/listar");
    const carros = await resposta.json();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const carro = carros.find((c) => c.id == Number(id));
    console.log("Carro encontrado:", carro);

    if (!carro) {
        document.querySelector('.container-detalhes').innerHTML = 
            '<h1>Carro não encontrado</h1>';
        return;
    }

    document.getElementById('titulo-carro').textContent = `${carro.marca} ${carro.modelo}`;
    document.getElementById('preco-carro').textContent = `R$: ${carro.preco}`;
    document.getElementById('ano-carro').textContent = carro.ano;
    document.getElementById('km-carro').textContent = carro.km == 0 ? '0 km (Novo)' : `${parseInt(carro.km).toLocaleString('pt-BR')} km`;
    document.getElementById('marca-carro').textContent = carro.marca;
    document.getElementById('modelo-carro').textContent = carro.modelo;


    if (carro.descricao) {
        document.getElementById('descricao-carro').textContent = carro.descricao;
    }


    const temImagensMultiplas = await carregarImagensCarro(carro.id);

    if (!temImagensMultiplas && carro.imagem) {
        const urlImagem = `http://localhost:3004/image//${carro.imagem}`;
        document.getElementById('imagem-destaque').src = urlImagem;
        
        const miniaturasContainer = document.getElementById('miniaturas-container');
        const miniatura = document.createElement('img');
        miniatura.src = urlImagem;
        miniatura.classList.add('miniatura', 'ativa');
        miniatura.onclick = () => trocarImagem(urlImagem);
        miniaturasContainer.appendChild(miniatura);
    }


    if (carro.nome_reserva) {
        document.getElementById('status-reserva').style.display = 'block';
        document.getElementById('nome-reserva').textContent = carro.nome_reserva;
        document.getElementById('btn-reservar').disabled = true;
        document.getElementById('btn-reservar').textContent = 'Já Reservado';
        document.getElementById('btn-reservar').style.opacity = '0.5';
    }

    
    document.getElementById('btn-reservar').onclick = () => reservarCarro(carro.id);
}


const linkAuth = document.getElementById('link-auth');
const textoAuth = document.getElementById('texto-auth');
const usuarioLogado = localStorage.getItem('usuario');

function logout() {
    localStorage.removeItem('usuario');
    localStorage.clear();
    window.location.href = "/Home.html";
}

if (usuarioLogado) {
    textoAuth.textContent = "Logout";
    linkAuth.href = "#";
    linkAuth.onclick = logout;
} else {
    textoAuth.textContent = "Login";
    linkAuth.href = "/login.html";
    linkAuth.onclick = null;
}

Puxarcarro();