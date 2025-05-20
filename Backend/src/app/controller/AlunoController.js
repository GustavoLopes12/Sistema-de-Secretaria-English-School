import AlunoRepository from "../repositories/AlunoRepository.js";

class AlunoController{
    async index(req,res) {
        try{
            const result = await AlunoRepository.findAll();
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({"error" : error})
        }
    }

    async show(req, res){
        try{
            const rm = parseInt(req.params.rm);
            //checking rm
            if(isNaN(rm)){
                return res.status(400).json({"error":"Rm de aluno nao é valido"});//bad request
            }
            const result = await AlunoRepository.findById(rm);
            //if not found
            if(result.length === 0){
                return res.status(404).json({"error":"Aluno não existe"});
            }
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({"error": error.message});
        }
    }

    async pegarPeloNome(req, res){
        try{
            const nome = req.params.nome;
            const result = await AlunoRepository.findByName(nome);
            if(result.length === 0){
                return res.status(404).json({"error":"Aluno não existe"});
            }
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({"erro": error});
        }
    }

    async create(req, res){
            try{
                const aluno = req.body;
                 //checking cpf
                const alunoExistente = await AlunoRepository.findByCPF(aluno.cpf);
                if (alunoExistente != "") {
                    return res.status(409).json({ message: "Aluno já cadastrado com esse cpf" });
                }else{
                    //cadastrando
                    await AlunoRepository.create(aluno);
                    res.status(201).json({"message": "aluno criado com sucesso"});
                }

            }catch(error){
                res.status(500).json({"erro":error.message});
            }
    }

    async update(req,  res){
        try{
            const rm = req.params.rm;
            const aluno = req.body;
            //checking rm
            if(isNaN(rm)){
                return res.status(400).json({"error":"Rm nao é valido"});//bad request
            }
            await AlunoRepository.update(aluno, rm);
            res.status(200).json({"message":"Aluno atualizado com sucesso"});
        }catch(error){
            res.status(500).json({"erro":error});
        }
    }

    async delete(req, res){
        try{
            const rm = req.params.rm;
            //checking rm
            if(isNaN(rm)){
                return res.status(400).json({"error":"Rm nao é valido"});//bad request
            }
            await AlunoRepository.delete(rm);
            res.status(200).json({"message":"Aluno deletado com sucesso"});
        }catch(error){
            res.status(500).json({"erro":error});
        }
    }
}

export default new AlunoController();