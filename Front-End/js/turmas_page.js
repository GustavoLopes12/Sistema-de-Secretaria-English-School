document.getElementById("formulario_turma").addEventListener("submit", function(event){

    event.preventDefault();

    //pegando dados e verificando
    const nome_professor = document.querySelector("#nome_professor").value;
    const nivel = document.querySelector("#nivel").value;

    if(nome_professor == "" || nome_professor == null){
        alert("Digite o nome do professor no campo");
    }
    
    else if(nivel === ""){
        alert("Selecione um nivel valido");
    }
    
    else{
        let registro;
        fetch(`http://localhost:3000/professores/porNome/${nome_professor}`, {
            method: "GET",
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
                //alert(JSON.stringify(data));
                registro = data[0].registro;
                //alert(registro);

                //passar p objJS q sera convertido em json
                const turma = {
                    nivel: nivel,
                    registro_professor: registro
                }

                //envio de dados para apirest nodejs
                fetch("http://localhost:3000/turmas", {

                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(turma)

                })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    document.querySelector("#nome_professor").value = "";
                    document.querySelector("#nivel").value = "";
                    buscarTodasTurmas();
                })
                .catch(error => {
                    alert(error.message);
                }); 
            }
        ).catch(error => alert(error.message));//fim 1° fetch

    }//fim else

});//fim func principal

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
                    <td>${turma.registro_professor}</td>
                    <td>${turma.nome_professor}</td>
                `;
                tbody.appendChild(tr);
            });
        }
    ).catch(
        error => alert(error.message)
    );
}