import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ModeloUsuario from '../modelos/Usuario';
import { criptografarSenha, compararSenha, gerarToken } from '../utilitarios/autenticacao';

export const cadastrar = async (req: Request, res: Response): Promise<Response> => {
  try {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const { nome, email, senha } = req.body;

    // Verificar se o usuário já existe
    const usuarioExistente = await ModeloUsuario.buscarPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'E-mail já cadastrado' });
    }

    // Hash da senha
    const senhaCriptografada = await criptografarSenha(senha);

    // Criar usuário
    const usuario = await ModeloUsuario.criar(nome, email, senhaCriptografada);

    // Gerar token
    const token = gerarToken(usuario.id);

    return res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      },
      token
    });
  } catch (erro) {
    console.error('Erro no cadastro:', erro);
    return res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
};

export const autenticar = async (req: Request, res: Response): Promise<Response> => {
  try {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const { email, senha } = req.body;

    // Buscar usuário
    const usuario = await ModeloUsuario.buscarPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Verificar senha
    const senhaValida = await compararSenha(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Gerar token
    const token = gerarToken(usuario.id);

    return res.json({
      mensagem: 'Login realizado com sucesso',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      },
      token
    });
  } catch (erro) {
    console.error('Erro no login:', erro);
    return res.status(500).json({ erro: 'Erro ao realizar login' });
  }
};
