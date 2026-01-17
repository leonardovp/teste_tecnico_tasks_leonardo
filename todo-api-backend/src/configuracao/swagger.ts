import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TODO API',
      version: '1.0.0',
      description: 'API REST para gerenciamento de tarefas (TO-DO)',
      contact: {
        name: 'API Support'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID do usuário'
            },
            name: {
              type: 'string',
              description: 'Nome do usuário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail do usuário'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Senha do usuário (mínimo 6 caracteres)'
            }
          }
        },
        Task: {
          type: 'object',
          required: ['description', 'priority'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID da tarefa'
            },
            description: {
              type: 'string',
              description: 'Descrição da tarefa'
            },
            priority: {
              type: 'string',
              enum: ['Alta', 'Média', 'Baixa'],
              description: 'Prioridade da tarefa'
            },
            status: {
              type: 'string',
              enum: ['pending', 'completed'],
              description: 'Status da tarefa'
            },
            user_id: {
              type: 'integer',
              description: 'ID do usuário dono da tarefa'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Auth',
        description: 'Endpoints de autenticação'
      },
      {
        name: 'Tasks',
        description: 'Endpoints de gerenciamento de tarefas'
      }
    ]
  },
  apis: ['./src/rotas/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
