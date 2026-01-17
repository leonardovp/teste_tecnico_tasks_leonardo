import sqlite3 from 'sqlite3';
import path from 'path';

const caminhoDb = path.resolve(__dirname, '../../database.db');

const db = new sqlite3.Database(caminhoDb, (erro) => {
  if (erro) {
    console.error('Erro ao conectar ao banco de dados:', erro.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
    inicializarBancoDeDados();
  }
});

function inicializarBancoDeDados(): void {
  // Tabela de usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de tarefas
  db.run(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      prioridade TEXT NOT NULL CHECK(prioridade IN ('Alta', 'Média', 'Baixa')),
      status TEXT NOT NULL DEFAULT 'pendente' CHECK(status IN ('pendente', 'concluida')),
      usuario_id INTEGER NOT NULL,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    )
  `);
}

export default db;
