import { Response } from 'express';
import { validationResult } from 'express-validator';
import ModeloTarefa from '../modelos/Tarefa';
import { RequisicaoAutenticada } from '../intermediarios/autenticacao.intermediario';

export const criarTarefa = async (req: RequisicaoAutenticada, res: Response): Promise<Response> => {
  try {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const { descricao, prioridade } = req.body;
    const usuarioId = req.usuarioId!;

    const tarefa = await ModeloTarefa.criar(descricao, prioridade, usuarioId);

    return res.status(201).json({
      mensagem: 'Tarefa criada com sucesso',
      tarefa
    });
  } catch (erro) {
    console.error('Erro ao criar tarefa:', erro);
    return res.status(500).json({ erro: 'Erro ao criar tarefa' });
  }
};

export const obterTarefasPendentes = async (req: RequisicaoAutenticada, res: Response): Promise<Response> => {
  try {
    const usuarioId = req.usuarioId!;
    const tarefas = await ModeloTarefa.buscarPorUsuarioId(usuarioId, 'pendente');

    return res.json({
      quantidade: tarefas.length,
      tarefas
    });
  } catch (erro) {
    console.error('Erro ao buscar tarefas:', erro);
    return res.status(500).json({ erro: 'Erro ao buscar tarefas' });
  }
};

export const atualizarStatusTarefa = async (req: RequisicaoAutenticada, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const usuarioId = req.usuarioId!;

    if (!['pendente', 'concluida'].includes(status)) {
      return res.status(400).json({ erro: 'Status inválido' });
    }

    const tarefa = await ModeloTarefa.buscarPorId(parseInt(id), usuarioId);
    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    await ModeloTarefa.atualizarStatus(parseInt(id), usuarioId, status);

    return res.json({
      mensagem: 'Status da tarefa atualizado com sucesso'
    });
  } catch (erro) {
    console.error('Erro ao atualizar tarefa:', erro);
    return res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
  }
};

export const excluirTarefa = async (req: RequisicaoAutenticada, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId!;

    const resultado = await ModeloTarefa.excluir(parseInt(id), usuarioId);

    if (resultado.alteracoes === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    return res.json({
      mensagem: 'Tarefa excluída com sucesso'
    });
  } catch (erro) {
    console.error('Erro ao excluir tarefa:', erro);
    return res.status(500).json({ erro: 'Erro ao excluir tarefa' });
  }
};
