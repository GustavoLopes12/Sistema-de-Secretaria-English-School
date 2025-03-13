import {consulta} from "../database/conexao.js";

class TurmaRepository{
    findAll(){
        const sql = "select t.*, p.nome as nome_professor from turmas t join professores p on p.registro = t.registro_professor;";
        const msgError = "Não foi possível localizar as turmas";//POR ERRO NO SQL OU INTERNO
        return consulta(sql, msgError);
    }
    findById(numero){
        const sql = "SELECT * FROM turmas WHERE numero = ?";
        const msgError = "Não foi possível achar a turma requerida";//POR ERRO NO SQL OU INTERNO
        return consulta(sql, numero, msgError);
    }
    create(turma){
        const sql = "INSERT INTO turmas SET ?";
        const msgError = "Não foi possível criar a turma";
        return consulta(sql, turma, msgError);
    }
    update(turma, numero){
        const sql = "UPDATE turmas SET ? WHERE numero = ?";
        const msgError = "Não foi possível atualizar a turma requerida";
        return consulta(sql,[turma, numero], msgError);
    }
    delete(numero){
        const sql = "DELETE FROM turmas WHERE numero = ?";
        const msgError = "Não foi possivel deletar a turma";
        return consulta(sql, numero, msgError);
    }
}

export default new TurmaRepository();