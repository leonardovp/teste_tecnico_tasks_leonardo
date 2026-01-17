import db from '../configuracao/banco-dados';
import { Tarefa } from '../tipos';

class ModeloTarefa {
  static criar(descricao: string, prioridade: 'Alta' | 'Média' | 'Baixa', usuarioId: number): Promise<Tarefa> {
    return new Promise((resolver, rejeitar) => {
      const sql = 'INSERT INTO tarefas (descricao, prioridade, usuario_id) VALUES (?, ?, ?)';
      db.run(sql, [descricao, prioridade, usuarioId], function(erro) {
        if (erro) {
          rejeitar(erro);
        } else {
          resolver({
            id: this.lastID,
            descricao,
            prioridade,
            status: 'pendente',
            usuario_id: usuarioId,
            criado_em: new Date().toISOString()
          });
        }
      });
    });
  }

  static buscarPorUsuarioId(usuarioId: number, status: 'pendente' | 'concluida' = 'pendente'): Promise<Tarefa[]> {
    return new Promise((resolver, rejeitar) => {
      const sql = 'SELECT * FROM tarefas WHERE usuario_id = ? AND status = ? ORDER BY criado_em DESC';
      db.all(sql, [usuarioId, status], (erro, linhas: Tarefa[]) => {
        if (erro) {
          rejeitar(erro);
        } else {
          resolver(linhas || []);
        }
      });
    });
  }

  static buscarPorId(id: number, usuarioId: number): Promise<Tarefa | undefined> {
    return new Promise((resolver, rejeitar) => {
      const sql = 'SELECT * FROM tarefas WHERE id = ? AND usuario_id = ?';
      db.get(sql, [id, usuarioId], (erro, linha: Tarefa) => {
        if (erro) {
          rejeitar(erro);
        } else {
          resolver(linha);
        }
      });
    });
  }

  static atualizarStatus(id: number, usuarioId: number, status: 'pendente' | 'concluida'): Promise<{ alteracoes: number }> {
    return new Promise((resolver, rejeitar) => {
      const sql = 'UPDATE tarefas SET status = ? WHERE id = ? AND usuario_id = ?';
      db.run(sql, [status, id, usuarioId], function(erro) {
        if (erro) {
          rejeitar(erro);
        } else {
          resolver({ alteracoes: this.changes });
        }
      });
    });
  }

  static excluir(id: number, usuarioId: number): Promise<{ alteracoes: number }> {
    return new Promise((resolver, rejeitar) => {
      const sql = 'DELETE FROM tarefas WHERE id = ? AND usuario_id = ?';
      db.run(sql, [id, usuarioId], function(erro) {
        if (erro) {
          rejeitar(erro);
        } else {
          resolver({ alteracoes: this.changes });
        }
      });
    });
  }
}

export default ModeloTarefa;
