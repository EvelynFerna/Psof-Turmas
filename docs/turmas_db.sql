CREATE DATABASE turmas_db;

USE turmas_db;

CREATE TABLE professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    professor_id INT,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

CREATE TABLE atividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT NOT NULL,
    turma_id INT,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
);

-- Inserção de dados exemplo
INSERT INTO professores (nome, email, senha) VALUES
('Professor 1', 'prof1@escola.com', 'senha123'),
('Professor 2', 'prof2@escola.com', 'senha123'),
('Professor 3', 'prof3@escola.com', 'senha123');

INSERT INTO turmas (nome, professor_id) VALUES
('Turma A', 1),
('Turma B', 2),
('Turma C', 3);

INSERT INTO atividades (descricao, turma_id) VALUES
('Atividade 1 - Aula sobre álgebra', 1),
('Atividade 2 - Aula sobre geometria', 2),
('Atividade 3 - Aula sobre física', 3);
