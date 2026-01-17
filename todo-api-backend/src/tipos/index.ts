export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  criado_em: string;
}

export interface DadosCriacaoUsuario {
  nome: string;
  email: string;
  senha: string;
}

export interface RespostaUsuario {
  id: number;
  nome: string;
  email: string;
}

export interface Tarefa {
  id: number;
  descricao: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  status: 'pendente' | 'concluida';
  usuario_id: number;
  criado_em: string;
}

export interface DadosCriacaoTarefa {
  descricao: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
}

export interface PayloadAutenticacao {
  usuarioId: number;
}
