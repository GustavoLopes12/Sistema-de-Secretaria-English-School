import {Router} from "express";
import ProfessorController from "./app/controller/ProfessorController.js";
import TurmaController from "./app/controller/TurmaController.js";
import AlunoController from "./app/controller/AlunoController.js";
import FuncionarioController from "./app/controller/FuncionarioController.js"

const router = Router();

//professors routes
router.get("/professores", ProfessorController.index);
router.get("/professores/:registro", ProfessorController.show);
router.get("/professores/porNome/:nome", ProfessorController.pegarPeloNome);
router.post("/professores", ProfessorController.create);
router.put("/professores/:registro", ProfessorController.update);
router.delete("/professores/:registro", ProfessorController.delete);
//classrooms routes
router.get("/turmas", TurmaController.index);
router.get("/turmas/:numero", TurmaController.show);
router.post("/turmas", TurmaController.create);
router.put("/turmas/:numero", TurmaController.update);
router.delete("/turmas/:numero", TurmaController.delete);
//students routes
router.get("/alunos", AlunoController.index);
router.get("/alunos/:rm", AlunoController.show);
router.get("/alunos/search/:nome", AlunoController.pegarPeloNome);
router.post("/alunos", AlunoController.create);
router.put("/alunos/:rm", AlunoController.update);
router.delete("/alunos/:rm", AlunoController.delete);
//employees routes
router.post("/funcionarios", FuncionarioController.criar);
router.post("/funcionarios/login", FuncionarioController.login);

export default router;