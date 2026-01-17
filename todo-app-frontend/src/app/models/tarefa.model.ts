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

export interface RespostaTarefas {
  quantidade: number;
  tarefas: Tarefa[];
}
