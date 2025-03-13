document.getElementById("form-login").addEventListener("submit", function(event){
    //evitar envio padrao
    event.preventDefault();
    //pegando variaveis
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    //verificação se está vazio
    if(email == "" || email == null){
        alert("Digite um email valido");
    }else if(senha == "" || senha == null){
        alert("Digite uma senha valida");
    }else{
        //criando corpo
        const funcionario = {
            email: email,
            senha:senha
        }
        //loginzao
        fetch("http://localhost:3000/funcionarios/login", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(funcionario)
        })
        .then(response => {
            if (response.status === 404) {
                return response.json().then(error => {
                    throw new Error(error.error); 
                });
            }else{
                return response.json(); 
            }
        })
        .then(data => {
            alert(data.message);
            localStorage.setItem("nome", data.body[0].nome);
            document.getElementById("email").value = "";//limpando
            document.getElementById("senha").value = "";//limpando
            window.location.href = "index.html";
        })
        .catch((error) => {alert(error.message);});
    }
});