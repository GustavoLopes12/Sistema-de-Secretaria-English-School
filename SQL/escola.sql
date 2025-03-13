/*Sistewma de uma escola de ingles aonde turmas são divididas com base no nivel dos alunos*/
create database if not exists escola;
use escola;
create table if not exists alunos(
	rm int auto_increment primary key,
    nome varchar(100) not null,
    telefone varchar(11),
    celular varchar(11) not null,
    cpf varchar(11) not null,
    numero_turma int,
    foreign key (numero_turma) references turmas(numero)
);
create table if not exists professores(
	registro int auto_increment primary key,
    nome varchar(100) not null
);
create table if not exists turmas(
	numero int auto_increment primary key,
    nivel varchar(20) not null,
    registro_professor int not null,
    foreign key (registro_professor) references professores(registro)
);

create table if not exists funcionarios(
	registro int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(100) not null,
    telefone varchar(11),
    celular varchar(11) not null,
    cpf varchar(11) not null,
    setor varchar(100) not null
);

drop schema escola;