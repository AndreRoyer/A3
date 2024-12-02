// Faz uma requisição para a API para obter a lista de usuários
fetch('/get_users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários.');
        }
        return response.json();
    })
    .then(users => {
        const usersBody = document.getElementById('users-body');
        users.forEach(user => {
            // Criando uma nova linha na tabela
            const row = document.createElement('tr');
            // Coluna com o ID
            const idCell = document.createElement('td');
            idCell.textContent = user.id;
            row.appendChild(idCell);
            // Coluna com o Nome
            const nameCell = document.createElement('td');
            nameCell.textContent = user.data.item;
            row.appendChild(nameCell);
            // Adiciona a linha à tabela
            usersBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error(error);
        alert('Erro ao carregar os usuários.');
    });


// Adiciona item ao formulário de cadastro
document.getElementById("cadastrarIten").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const item = document.getElementById("cadastrar").value;
    
    
    const dados = { item };
    
    try {
        const resposta = await fetch("/add_user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
        });
    
        if (resposta.ok) {
        alert("Cadastro realizado com sucesso!");
        } else {
        alert("Erro ao cadastrar.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
    });

    
// Função para pesquisar itens
async function pesquisarItens() {
    const nomeItem = document.getElementById("barraPesquisa").value;
    
    if (nomeItem.trim() === "") {
        document.getElementById("resultado").innerHTML = ""; 
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/buscar?item=${nomeItem}`);
        const data = await response.json();
        
        if (response.ok) {
        mostrarResultados(data);
        } else {
        document.getElementById("resultado").innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error("Erro ao buscar itens:", error);
        document.getElementById("resultado").innerHTML = "<p style='color: red;'>Erro ao buscar itens.</p>";
    }
    }

// Função para exibir os resultados da busca na tela
    function mostrarResultados(itens) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";  // Limpa resultados anteriores

    if (itens.length === 0) {
        resultadoDiv.innerHTML = "<p>Nenhum item encontrado.</p>";
        return;
    }

// Itera sobre os itens encontrados e os exibe na tela
    itens.forEach(users => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        itemDiv.innerHTML = `<strong>${users.item}</strong> (ID: ${users.id})`;
        resultadoDiv.appendChild(itemDiv);
    });
    }