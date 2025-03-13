import FuncionarioRepository from "../repositories/FuncionarioRepository";

class FuncionarioController{
    async criar(req, res){
        try{
            const funcionario = req.body;
            await FuncionarioRepository.create(funcionario);
            res.status(201).json({"message": "funcionario criado com sucesso"});
        }catch(error){
            res.status(500).json({"erro":error});
        }
    }
    async login(req, res){
        try{
            const funcionario = req.body;
            const resultado = await FuncionarioRepository.findByEmailAndSenha(funcionario.email, funcionario.senha);
            // Se não encontrou nenhum funcionário, retorna erro
            if (resultado.length === 0) {
                return res.status(404).json({"erro": "Email ou senha incorretos"});
            }
            res.status(201).json({"message": "login realizado com sucesso", "body": resultado});
        }catch(error){
            res.status(500).json({"erro":error});
        }
    }
}

export default new FuncionarioController();