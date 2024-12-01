
// Fazendo a requisição para a API
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



document.getElementById("cadastrarIten").addEventListener("submit", async function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário
    
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

    