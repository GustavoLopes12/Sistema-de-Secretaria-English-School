import TurmaRepository from "../repositories/TurmaRepository.js";

class TurmaController{
    async index(req, res){
        try{
            const result = await TurmaRepository.findAll();
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({"error" : error})
        }
    }
    async show(req, res){
        try{
            const numero = parseInt(req.params.numero);
            //verificando se é numero msm o id
            if(isNaN(numero)){
                return res.status(400).json({"error":"Numero de turma nao é valido"});//bad request
            }
            const result = await TurmaRepository.findById(numero);
            //VERIFICANDO SE RESULT NÃO VEM VAZIO OQUE INDICA QUE NAO FOI POSSIVEL ACHAR a turma
            if(result.length === 0){
                return res.status(404).json({"error":"Não foi possível achar a turma"});
            }
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({"error": error});
        }
    }
    async create(req, res){
        try{
            const turma = req.body;
            await TurmaRepository.create(turma);
            res.status(201).json({"message": "turma criada com sucesso"});
        }catch(error){
            res.status(500).json({"erro":error});
        }
    }
    async update(req, res){
        try{
            const numero = req.params.numero;
            const turma = req.body;
            //verificando se é numero msm o id
            if(isNaN(numero)){
                return res.status(400).json({"error":"Numero da turma nao é valido"});//bad request
            }
            await TurmaRepository.update(turma, numero);
            res.status(200).json({"message":"Turma atualizada com sucesso"});
        }catch(error){
            res.status(500).json({"erro":error});
        }
    }
    async delete(req, res){
        try{
            const numero = req.params.numero;
            //verificando se é numero msm o id
            if(isNaN(numero)){
                return res.status(400).json({"error":"Numero da turma nao é valido"});//bad request
            }
            await TurmaRepository.delete(numero);
            res.status(200).json({"message":"Turma deletada com sucesso"});
        }catch(error){
            res.status(500).json({"erro":error});
        }
    }
}

export default new TurmaController();