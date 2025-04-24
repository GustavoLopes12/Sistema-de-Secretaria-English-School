//buscando todos as turmas ao entrar na pagina
function buscarTodasTurmas(){
    const tbody = document.querySelector("#table_turmas tbody");
    tbody.innerHTML = "";//limpando ela antes p garantir q estara vazia
    fetch("http://localhost:3000/turmas", {
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(
        response => response.json()
    ).then(
        data => {
            data.forEach(turma => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${turma.numero}</td>
                    <td>${turma.nivel}</td>
                    <td>${turma.nome_professor}</td>
                `;
                tbody.appendChild(tr);
            });
        }
    ).catch(
        error => alert(error.message)
    );
}

// Função para carregar turmas nos formulários
function carregarTurmasForm() {
    const select = document.getElementById("turma");
    const selecttwo = document.getElementById("turma-aluno");
    fetch("http://localhost:3000/turmas", {
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(
        response => response.json()
    ).then(
        data => {
            data.forEach(turma => {
                const option = document.createElement("option");
                option.textContent = turma.numero;

                const option2 = document.createElement("option");
                option2.textContent = turma.numero;

                select.appendChild(option);
                selecttwo.appendChild(option2);
            });
        }
    ).catch(
        error => alert(error.message)
    );
}

// Função para carregar alunos no formulário de adicionar aluno
function carregarAlunosForm() {
    const select = document.getElementById("aluno");
    // Limpa as opções existentes
    select.innerHTML = "";
    fetch("http://localhost:3000/alunos", {
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(
        response => response.json()
    ).then(
        data => {
            data.forEach(aluno => {
                const option = document.createElement("option");
                option.textContent = aluno.nome;
                select.appendChild(option);
            });
        }
    ).catch(
        error => alert(error.message)
    );
}

//cadastrar aluno
document.getElementById("form-cadastro-aluno").addEventListener("submit", function(event){

    event.preventDefault();

    //dados coletados
    const nome = document.getElementById("nome-aluno").value;
    const numero_turma = document.getElementById("turma-aluno").value;
    const celular = document.getElementById("celular").value;
    const telefone = document.getElementById("telefone-aluno").value;

    //passar JS q sera convertido em json
    const aluno = {
        nome: nome,
        numero_turma: numero_turma,
        telefone:telefone,
        celular:celular
    }

    //envio de dados para apirest nodejs
    fetch("http://localhost:3000/alunos", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(aluno)
    }).then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById("nome-aluno").value = "";//limpando
        document.getElementById("celular").value = "";//limpando
        document.getElementById("telefone-aluno").value = "";//limpando
        document.getElementById("turma-aluno").value = "";//limpando
        carregarAlunosForm();
    })
    .catch((error) => {alert(error.message);});
});

//BUSCAR ALUNO PELO NOME
document.getElementById("form-busca").addEventListener("submit", function(event){
    
    event.preventDefault();

    const nome = document.querySelector("#nome-search").value;
    const tbody = document.querySelector("#table_alunos tbody");
    tbody.innerHTML = "";//limpando ela antes p garantir q estara vazia

    fetch(`http://localhost:3000/alunos/search/${/*encodeURIComponent(*/nome/*)*/}`, {
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(
        response => {
                if (response.status === 404) {
                    return response.json().then(error => {
                        throw new Error(error.error); // Interrompe o fluxo
                    });
                }else{
                    return response.json(); // Caso contrário, retorna os dados
                }
            }
    ).then(
        data => {
               data.forEach(aluno => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${aluno.rm}</td>
                        <td>${aluno.nome}</td>
                        <td>${aluno.numero_turma}</td>
                        <td>${aluno.celular}</td>
                        <td>${aluno.telefone}</td>
                    `;
                    tbody.appendChild(tr);
                });
        }
    ).catch(
        error => alert("Erro:"+ error.message)
    );
});
//quando a page carregar
document.addEventListener("DOMContentLoaded", function() {
    buscarTodasTurmas();
    carregarAlunosForm();
    carregarTurmasForm();
});