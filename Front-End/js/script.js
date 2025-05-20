//when DOM to load
document.addEventListener("DOMContentLoaded", function() {
    buscarTodasTurmas();
    carregarAlunosForm();
    carregarTurmasForm();
});

//search all classes
function buscarTodasTurmas(){
    const tbody = document.querySelector("#table_turmas tbody");
    tbody.innerHTML = "";//cleaning
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

//load classes on the forms
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

//load students on the form register students in the classes and update phone number
function carregarAlunosForm() {
    const select = document.getElementById("aluno");
    const selectwo = document.getElementById("estudante");
    // clear the existing options
    select.innerHTML = "";
    while (selectwo.options.length > 1) {//menos a placeholder
        selectwo.remove(1);
    }
    //fazendo
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
                option.value = aluno.rm;
                select.appendChild(option);
                //segundo
                const option2 = document.createElement("option");
                option2.textContent = aluno.nome;
                option2.value = aluno.rm;
                selectwo.appendChild(option2);
            });
        }
    ).catch(
        error => alert(error.message)
    );
}

//register students
document.getElementById("form-cadastro-aluno").addEventListener("submit", function(event){

    event.preventDefault();

    //getting values
    const nome = document.getElementById("nome-aluno").value;
    const cpf = document.getElementById("cpf").value;
    let numero_turma = document.getElementById("turma-aluno").value;
    const celular = document.getElementById("celular").value;
    let telefone = document.getElementById("telefone-aluno").value;

    //checking
    if(telefone == ""){
        telefone = null;
    }
     
    if(numero_turma == ""){
        numero_turma = null;
    }

    //creating body
    const aluno = {
        nome: nome,
        cpf: cpf,
        numero_turma: numero_turma,
        telefone:telefone,
        celular:celular
    }

    //post
    fetch("http://localhost:3000/alunos", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(aluno)
    })
    .then(
        response => {
            if (response.status === 409) {
                return response.json().then(error => {
                    throw new Error(error.error); // Interrompe o fluxo
                });
            }else{
                return response.json(); // Caso contrário, retorna os dados
            }
        }
    )
    .then(
        data => {
            alert(data.message);
            //cleaning
            document.getElementById("nome-aluno").value = "";
            document.getElementById("cpf").value = "";
            document.getElementById("celular").value = "";
            document.getElementById("telefone-aluno").value = "";
            document.getElementById("turma-aluno").value = "";
            carregarAlunosForm();
        }
    )
    .catch((error) => {alert(error.message);});
});

//search students by their names
document.getElementById("form-busca").addEventListener("submit", function(event){
    
    event.preventDefault();

    const nome = document.querySelector("#nome-search").value;
    const tbody = document.querySelector("#table_alunos tbody");
    tbody.innerHTML = "";//cleaning

    fetch(`http://localhost:3000/alunos/search/${nome}`, {
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(
        response => {
                if (response.status === 404) {
                    return response.json().then(error => {
                        throw new Error(error.error); // stop fluxe
                    });
                }else{
                    return response.json(); // return data(retorna dados)
                }
            }
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
        error => alert("Erro:"+ error.message)
    );
});

//update classrom of student
document.getElementById("update").addEventListener("submit", function(event){

    event.preventDefault();

    const rm = document.querySelector("#aluno").value;
    const turma_atualizada = document.querySelector("#turma").value;

    let aluno_new;


    //getting the student
    fetch(`http://localhost:3000/alunos/${rm}`, {
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(
        response => {
                if (response.status === 404) {
                    return response.json().then(error => {
                        throw new Error(error.error); 
                    });
                }else{
                    return response.json(); 
                }
        }
    ).then(
        data => {
               aluno_new = {
                    rm: data[0].rm,
                    nome: data[0].nome,
                    cpf: data[0].cpf,
                    numero_turma: turma_atualizada,
                    telefone:data[0].telefone,
                    celular:data[0].celular
               }
               //alert(JSON.stringify(aluno_new));
               fetch(`http://localhost:3000/alunos/${aluno_new.rm}`,{
                    method:"PUT",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:  JSON.stringify(aluno_new)
               }).then(
                    response => response.json()
               ).then(
                    data => {
                        alert(data.message);
                    }
               ).catch(
                    error => alert(error.message)
               );
        }
    ).catch(
        error => alert(error.message)
    );
});

//When selecting an option, the home phone number and cell phone number appear in the modification tab
document.getElementById("estudante").addEventListener("change", function(event){

    let cll = document.getElementById("mcelular"); 
    let tel = document.getElementById("mtelefone-aluno");
    const rm = this.value;

    fetch(`http://localhost:3000/alunos/${rm}`, {
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
    })
    .then( response => response.json() )
    .then(
        data => {
            cll.value = data[0].celular;
            tel.value = data[0].telefone;
        }
    )
    .catch( error => alert(error.message) );

});

//update numbers of student
document.getElementById("update-two").addEventListener("submit", function(event){

    event.preventDefault();

    const rm = document.getElementById("estudante").value;
    const celular = document.getElementById("mcelular").value;
    const telefone = document.getElementById("mtelefone-aluno").value;

    let aluno_new;

    fetch(`http://localhost:3000/alunos/${rm}`, {
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(
            response => {
                if (response.status === 404) {
                    return response.json().then(error => {
                        throw new Error(error.error); 
                    });
                }else{
                    return response.json(); 
                }
            }
    ).then(
            data => {
                aluno_new = {
                        rm: data[0].rm,
                        nome: data[0].nome,
                        cpf: data[0].cpf,
                        numero_turma: data[0].numero_turma,
                        telefone: telefone,
                        celular: celular
                }
                //alert(JSON.stringify(aluno_new));
                fetch(`http://localhost:3000/alunos/${aluno_new.rm}`,{
                        method:"PUT",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body:  JSON.stringify(aluno_new)
                }).then(
                        response => response.json()
                ).then(
                        data => {
                            alert(data.message);
                        }
                ).catch(
                        error => alert(error.message)
                );
            }
    ).catch(
        error => alert(error.message)
    );

});
