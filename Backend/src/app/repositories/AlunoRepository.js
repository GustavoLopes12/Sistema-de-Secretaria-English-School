import {consulta} from "../database/conexao.js";

class AlunoRepository{
    findAll(){
        const sql = "SELECT * FROM alunos";
        const msgError = "Não foi possível localizar os alunos";
        return consulta(sql, msgError);
    }
    findById(rm){
        const sql = "SELECT * FROM alunos WHERE rm = ?";
        const msgError = "Não foi possível achar o aluno requerido";
        return consulta(sql, rm, msgError);
    }
    findByName(nome){
        const sql = "SELECT * FROM alunos WHERE nome = ?";
        const msgError = "Não foi possível achar o aluno requerido";
        return consulta(sql, nome, msgError);
    }
    create(aluno){
        const sql = "INSERT INTO alunos SET ?";
        const msgError = "Não foi possível criar o aluno";
        return consulta(sql, aluno, msgError);
    }
    update(aluno, rm){
        const sql = "UPDATE alunos SET ? WHERE rm = ?";
        const msgError = "Não foi possível atualizar o aluno requerido";
        return consulta(sql,[aluno, rm], msgError);
    }
    delete(rm){
        const sql = "DELETE FROM alunos WHERE rm = ?";
        const msgError = "Não foi possivel deletar o aluno";
        return consulta(sql, rm, msgError);
    }
}

export default new AlunoRepository();