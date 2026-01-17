export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export interface DadosCadastro {
  nome: string;
  email: string;
  senha: string;
}

export interface DadosLogin {
  email: string;
  senha: string;
}

export interface RespostaAutenticacao {
  mensagem: string;
  usuario: Usuario;
  token: string;
}
