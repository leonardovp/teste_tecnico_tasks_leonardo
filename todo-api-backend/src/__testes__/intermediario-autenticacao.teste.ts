import { Request, Response, NextFunction } from 'express';
import middlewareAutenticacao, { RequisicaoAutenticada } from '../intermediarios/autenticacao.intermediario';
import { gerarToken } from '../utilitarios/autenticacao';

describe('Middleware de Autenticação', () => {
  let requisicaoMock: Partial<RequisicaoAutenticada>;
  let respostaMock: Partial<Response>;
  let funcaoProxima: NextFunction;

  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret-key';
  });

  beforeEach(() => {
    requisicaoMock = {
      headers: {}
    };
    respostaMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    funcaoProxima = jest.fn();
  });

  it('deve retornar erro 401 quando token não é fornecido', () => {
    middlewareAutenticacao(requisicaoMock as RequisicaoAutenticada, respostaMock as Response, funcaoProxima);

    expect(respostaMock.status).toHaveBeenCalledWith(401);
    expect(respostaMock.json).toHaveBeenCalledWith({ erro: 'Token não fornecido' });
    expect(funcaoProxima).not.toHaveBeenCalled();
  });

  it('deve retornar erro 401 para formato de token inválido', () => {
    requisicaoMock.headers = { authorization: 'InvalidFormat' };

    middlewareAutenticacao(requisicaoMock as RequisicaoAutenticada, respostaMock as Response, funcaoProxima);

    expect(respostaMock.status).toHaveBeenCalledWith(401);
    expect(respostaMock.json).toHaveBeenCalledWith({ erro: 'Formato de token inválido' });
    expect(funcaoProxima).not.toHaveBeenCalled();
  });

  it('deve retornar erro 401 para scheme inválido', () => {
    requisicaoMock.headers = { authorization: 'Basic token123' };

    middlewareAutenticacao(requisicaoMock as RequisicaoAutenticada, respostaMock as Response, funcaoProxima);

    expect(respostaMock.status).toHaveBeenCalledWith(401);
    expect(respostaMock.json).toHaveBeenCalledWith({ erro: 'Token mal formatado' });
    expect(funcaoProxima).not.toHaveBeenCalled();
  });

  it('deve retornar erro 401 para token inválido', () => {
    requisicaoMock.headers = { authorization: 'Bearer token.invalido.aqui' };

    middlewareAutenticacao(requisicaoMock as RequisicaoAutenticada, respostaMock as Response, funcaoProxima);

    expect(respostaMock.status).toHaveBeenCalledWith(401);
    expect(respostaMock.json).toHaveBeenCalledWith({ erro: 'Token inválido ou expirado' });
    expect(funcaoProxima).not.toHaveBeenCalled();
  });

  it('deve chamar next() para token válido', () => {
    const usuarioId = 1;
    const token = gerarToken(usuarioId);
    requisicaoMock.headers = { authorization: `Bearer ${token}` };

    middlewareAutenticacao(requisicaoMock as RequisicaoAutenticada, respostaMock as Response, funcaoProxima);

    expect(requisicaoMock.usuarioId).toBe(usuarioId);
    expect(funcaoProxima).toHaveBeenCalled();
    expect(respostaMock.status).not.toHaveBeenCalled();
  });
});
