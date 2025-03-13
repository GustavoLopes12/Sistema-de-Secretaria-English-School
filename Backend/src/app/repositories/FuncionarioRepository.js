import {consulta} from "../database/conexao.js";

class FuncionarioRepository{
    create(funcionario){
        const sql = "INSERT INTO funcionarios SET ?";
        const msgError = "Não foi possível criar o funcionario";
        return consulta(sql, funcionario, msgError);
    }
    findByEmailAndSenha(email, senha){
        const sql = "SELECT * FROM funcionarios WHERE email = ? AND senha = ?";
        const msgError = "Não foi possível fazer login com o funcionario";//POR ERRO NO SQL OU INTERNO
        return consulta(sql, [email, senha], msgError);
    }
}

export default new FuncionarioRepository();