import { Router } from 'express';
import { body } from 'express-validator';
import middlewareAutenticacao from '../intermediarios/autenticacao.intermediario';
import {
  criarTarefa,
  obterTarefasPendentes,
  atualizarStatusTarefa,
  excluirTarefa
} from '../controladores/tarefa.controlador';

const roteador = Router();

// Todas as rotas de tarefas requerem autenticação
roteador.use(middlewareAutenticacao);

/**
 * @swagger
 * /api/tarefas:
 *   post:
 *     summary: Criar nova tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descricao
 *               - prioridade
 *             properties:
 *               descricao:
 *                 type: string
 *               prioridade:
 *                 type: string
 *                 enum: [Alta, Média, Baixa]
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       401:
 *         description: Não autenticado
 */

/**
 * @swagger
 * /api/tarefas/pendentes:
 *   get:
 *     summary: Listar tarefas pendentes
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas pendentes
 *       401:
 *         description: Não autenticado
 */

/**
 * @swagger
 * /api/tarefas/{id}/status:
 *   patch:
 *     summary: Atualizar status da tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pendente, concluida]
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */

// Validações
const validacaoCriarTarefa = [
  body('descricao').trim().notEmpty().withMessage('Descrição é obrigatória'),
  body('prioridade').isIn(['Alta', 'Média', 'Baixa']).withMessage('Prioridade inválida')
];

// Rotas
roteador.post('/', validacaoCriarTarefa, criarTarefa);
roteador.get('/pendentes', obterTarefasPendentes);
roteador.patch('/:id/status', atualizarStatusTarefa);
roteador.delete('/:id', excluirTarefa);

export default roteador;
