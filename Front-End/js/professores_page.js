
//adicionando escutador de evento submit no formulario p enviar ao banco pela nossa api nodejs
document.getElementById("formulario_professor").addEventListener("submit", function(event){

    event.preventDefault();//evitando envio padrao do formulario por action e method, oq faria ele recarregar a pagina e colocar os dados na url atual visto q n a method nem action ele definiria o method como get e o action como a url atual

    if(document.querySelector("#nome").value == "" || document.querySelector("#nome").value == null){
        alert("Digite o nome do professor no campo");
    }
    else{
        //dados coletados
        const nome = document.getElementById("nome").value;
        //passar JS q sera convertido em json
        const professor = {
            nome: nome
        }
        //envio de dados para apirest nodejs
        fetch("http://localhost:3000/professores", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(professor)
        }).then(response => response.json()).then(data => {alert(data.message);}).catch((error) => {alert(error.message);});//no primeiro then pegamos a resposta da promise de fetch e passamos pra um objeto javascript e no segundo pegamos a resposta de json() e imprimimos e o catch pega os erros
        
        document.getElementById("nome").value = "";//limpando
        buscarTodosProfessores();//att
    }
});

//buscando todos os professores ao entrar na pagina
function buscarTodosProfessores(){
    const tbody = document.querySelector("#table_professores tbody");
    tbody.innerHTML = "";//limpando ela antes p garantir q estara vazia
    fetch("http://localhost:3000/professores", {
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(
        response => response.json()
    ).then(
        data => {
            data.forEach(professor => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${professor.registro}</td>
                    <td>${professor.nome}</td>
                `;
                tbody.appendChild(tr);
            });
        }
    ).catch(
        error => alert(error.message)
    );
}
