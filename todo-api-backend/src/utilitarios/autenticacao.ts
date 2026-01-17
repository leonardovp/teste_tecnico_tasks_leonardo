import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PayloadAutenticacao } from '../types';

export const criptografarSenha = async (senha: string): Promise<string> => {
  const sal = await bcrypt.genSalt(10);
  return await bcrypt.hash(senha, sal);
};

export const compararSenha = async (senha: string, senhaCriptografada: string): Promise<boolean> => {
  return await bcrypt.compare(senha, senhaCriptografada);
};

export const gerarToken = (usuarioId: number): string => {
  return jwt.sign(
    { usuarioId } as PayloadAutenticacao,
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const verificarToken = (token: string): PayloadAutenticacao | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as PayloadAutenticacao;
  } catch (erro) {
    return null;
  }
};
