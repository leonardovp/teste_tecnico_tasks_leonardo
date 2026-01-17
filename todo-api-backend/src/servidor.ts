import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import './configuracao/banco-dados';
import rotasAutenticacao from './rotas/autenticacao.rotas';
import rotasTarefas from './rotas/tarefa.rotas';
import especificacaoSwagger from './configuracao/swagger';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(especificacaoSwagger));

// Rota de teste
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', mensagem: 'API está funcionando' });
});

// Rotas
app.use('/api/autenticacao', rotasAutenticacao);
app.use('/api/tarefas', rotasTarefas);

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});

export default app;
