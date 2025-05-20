document.getElementById("form-login").addEventListener("submit", function(event){
    //block default sending(bloquear envio padrao)
    event.preventDefault();
    //getting values
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    //checking for empty or null values (procurando por valores vazios ou nulos)
    if(email == "" || email == null){
        alert("Digite um email valido");
    }else if(senha == "" || senha == null){
        alert("Digite uma senha valida");
    }else{
        //creating body
        const funcionario = {
            email: email,
            senha:senha
        }
        //login
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
            //localStorage.setItem("nome", data.body[0].nome);
            //cleaning
            document.getElementById("email").value = "";
            document.getElementById("senha").value = "";
            window.location.href = "index.html";
        })
        .catch((error) => {alert(error.message);});
    }
});