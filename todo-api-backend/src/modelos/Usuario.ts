import db from '../configuracao/banco-dados';
import { Usuario, RespostaUsuario } from '../tipos';

class ModeloUsuario {
  static criar(nome: string, email: string, senhaCriptografada: string): Promise<RespostaUsuario> {
    return new Promise((resolver, rejeitar) => {
      const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
      db.run(sql, [nome, email, senhaCriptografada], function(erro) {
        if (erro) {
          rejeitar(erro);
        } else {
          resolver({ id: this.lastID, nome, email });
        }
      });
    });
  }

  static buscarPorEmail(email: string): Promise<Usuario | undefined> {
    return new Promise((resolver, rejeitar) => {
      const sql = 'SELECT * FROM usuarios WHERE email = ?';
      db.get(sql, [email], (erro, linha: Usuario) => {
        if (erro) {
          rejeitar(erro);
        } else {
          resolver(linha);
        }
      });
    });
  }

  static buscarPorId(id: number): Promise<RespostaUsuario | undefined> {
    return new Promise((resolver, rejeitar) => {
      const sql = 'SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?';
      db.get(sql, [id], (erro, linha: RespostaUsuario) => {
        if (erro) {
          rejeitar(erro);
        } else {
          resolver(linha);
        }
      });
    });
  }
}

export default ModeloUsuario;
