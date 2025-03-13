import ProfessorRepository from "../repositories/ProfessorRepository.js";

class ProfessorController {
    async index(req,res) {
        try{
            const result = await ProfessorRepository.findAll();
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({"error" : error})
        }
    }
    async show(req, res){
        try{
            const registro = parseInt(req.params.registro);
            //verificando se é numero msm o id
            if(isNaN(registro)){
                return res.status(400).json({"error":"Registro de professor nao é valido"});//bad request
            }
            const result = await ProfessorRepository.findById(registro);
            //VERIFICANDO SE RESULT NÃO VEM VAZIO OQUE INDICA QUE NAO FOI POSSIVEL ACHAR O professor
            if(result.length === 0){
                return res.status(404).json({"error":"Não foi possível achar o professor"});
            }
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({"error": error});
        }
    }
    async pegarPeloNome(req, res){
        try{
            const nome = req.params.nome;
            const result = await ProfessorRepository.findByName(nome);
            //VERIFICANDO SE RESULT NÃO VEM VAZIO OQUE INDICA QUE NAO FOI POSSIVEL ACHAR O professor
            if(result.length === 0){
                return res.status(404).json({"error":"Professor não existente na base de dados"});
            }
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({"error": error.message});
        }
    }
    async create(req, res){
        try{
            const professor = req.body;
            await ProfessorRepository.create(professor);
            res.status(201).json({"message": "professor criado com sucesso"});
        }catch(error){
            res.status(500).json({"erro":error});
        }
    }
    async update(req,  res){
        try{
            const registro = req.params.registro;
            const professor = req.body;
            //verificando se é numero msm o registro
            if(isNaN(registro)){
                return res.status(400).json({"error":"Registro nao é valido"});//bad request
            }
            await ProfessorRepository.update(professor, registro);
            res.status(200).json({"message":"Professor atualizado com sucesso"});
        }catch(error){
            res.status(500).json({"erro":error});
        }
    }
    async delete(req, res){
        try{
            const registro = req.params.registro;
            //verificando se é numero msm o id
            if(isNaN(registro)){
                return res.status(400).json({"error":"Registro nao é valido"});//bad request
            }
            await ProfessorRepository.delete(registro);
            res.status(200).json({"message":"Professor deletado com sucesso"});
        }catch(error){
            res.status(500).json({"erro":error});
        }
    }
}

export default new ProfessorController();