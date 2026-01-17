import { Request, Response, NextFunction } from 'express';
import { verificarToken } from '../utilitarios/autenticacao';

export interface RequisicaoAutenticada extends Request {
  usuarioId?: number;
}

const middlewareAutenticacao = (req: RequisicaoAutenticada, res: Response, next: NextFunction): Response | void => {
  try {
    const cabecalhoAuth = req.headers.authorization;

    if (!cabecalhoAuth) {
      return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const partes = cabecalhoAuth.split(' ');

    if (partes.length !== 2) {
      return res.status(401).json({ erro: 'Formato de token inválido' });
    }

    const [esquema, token] = partes;

    if (!/^Bearer$/i.test(esquema)) {
      return res.status(401).json({ erro: 'Token mal formatado' });
    }

    const decodificado = verificarToken(token);

    if (!decodificado) {
      return res.status(401).json({ erro: 'Token inválido ou expirado' });
    }

    req.usuarioId = decodificado.usuarioId;
    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Falha na autenticação' });
  }
};

export default middlewareAutenticacao;
