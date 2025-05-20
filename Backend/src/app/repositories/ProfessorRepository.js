import {consulta} from "../database/conexao.js";

class ProfessorRepository{
    findAll(){
        const sql = "SELECT * FROM professores";
        const msgError = "Não foi possível localizar os professores";
        return consulta(sql, msgError);
    }
    findById(registro){
        const sql = "SELECT * FROM professores WHERE registro = ?";
        const msgError = "Não foi possível achar o professor requerido";
        return consulta(sql, registro, msgError);
    }
    findByName(nome){
        const sql = "SELECT * FROM professores WHERE nome = ?";
        const msgError = "Não foi possível achar o professor requerido";
        return consulta(sql, nome, msgError);
    }
    create(professor){
        const sql = "INSERT INTO professores SET ?";
        const msgError = "Não foi possível criar o professor";
        return consulta(sql, professor, msgError);
    }
    update(professor, registro){
        const sql = "UPDATE professores SET ? WHERE registro = ?";
        const msgError = "Não foi possível atualizar o professor requerido";
        return consulta(sql,[professor, registro], msgError);
    }
    delete(registro){
        const sql = "DELETE FROM professores WHERE registro = ?";
        const msgError = "Não foi possivel deletar o professor";
        return consulta(sql, registro, msgError);
    }
}

export default new ProfessorRepository();