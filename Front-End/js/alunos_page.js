//adicionando escutador de evento submit no formulario p enviar ao banco pela nossa api nodejs
document.getElementById("formulario_aluno").addEventListener("submit", function(event){

    event.preventDefault();//evitando envio padrao do formulario por action e method, oq faria ele recarregar a pagina e colocar os dados na url atual visto q n a method nem action ele definiria o method como get e o action como a url atual

    if(document.querySelector("#nome").value == "" || document.querySelector("#nome").value == null){
        alert("Digite o nome do aluno no campo");
    }else if(document.querySelector("#numero_turma").value !== "" && isNaN(document.querySelector("#numero_turma").value)){
        alert("Digite uma numero de turma valida");
    }else if(document.querySelector("#celular").value == "" || isNaN(document.querySelector("#celular").value)){
        alert("Digite um telefone celular valido");
    }else{
        //dados coletados
        const nome = document.getElementById("nome").value;
        const numero_turma = document.getElementById("numero_turma").value;
        const cpf = document.getElementById("cpf").value;
        const celular = document.getElementById("celular").value;
        const telefone = document.getElementById("telefone").value;
        
        //passar JS q sera convertido em json
        const aluno = {
            nome: nome,
            numero_turma: numero_turma,
            cpf:cpf,
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
            document.getElementById("nome").value = "";//limpando
            document.getElementById("numero_turma").value = "";//limpando
            document.getElementById("celular").value = "";//limpando
            document.getElementById("telefone").value = "";//limpando
            document.getElementById("cpf").value = "";//limpando
            buscarTodosAlunos();//att
        })
        .catch((error) => {alert(error.message);});//no primeiro then pegamos a resposta da promise de fetch e passamos pra um objeto javascript e no segundo pegamos a resposta de json() e imprimimos e o catch pega os erros
    }
});


//buscando todos os alunos ao entrar na pagina
function buscarTodosAlunos(){
    const tbody = document.querySelector("#table_alunos tbody");
    tbody.innerHTML = "";//limpando ela antes p garantir q estara vazia
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
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${aluno.rm}</td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.cpf}</td>
                    <td>${aluno.numero_turma}</td>
                    <td>${aluno.celular}</td>
                    <td>${aluno.telefone}</td>
                `;
                tbody.appendChild(tr);
            });
        }
    ).catch(
        error => alert(error.message)
    );
}