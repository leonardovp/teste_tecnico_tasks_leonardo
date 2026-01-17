import { criptografarSenha, compararSenha, gerarToken, verificarToken } from '../utilitarios/autenticacao';

describe('Utilitários de Autenticação', () => {
  describe('criptografarSenha', () => {
    it('deve criar um hash da senha', async () => {
      const senha = 'senha123';
      const hash = await criptografarSenha(senha);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(senha);
      expect(hash.length).toBeGreaterThan(0);
    });

    it('deve criar hashes diferentes para mesma senha', async () => {
      const senha = 'senha123';
      const hash1 = await criptografarSenha(senha);
      const hash2 = await criptografarSenha(senha);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('compararSenha', () => {
    it('deve retornar true para senha correta', async () => {
      const senha = 'senha123';
      const hash = await criptografarSenha(senha);
      const ehValida = await compararSenha(senha, hash);

      expect(ehValida).toBe(true);
    });

    it('deve retornar false para senha incorreta', async () => {
      const senha = 'senha123';
      const senhaErrada = 'senhaErrada';
      const hash = await criptografarSenha(senha);
      const ehValida = await compararSenha(senhaErrada, hash);

      expect(ehValida).toBe(false);
    });
  });

  describe('gerarToken', () => {
    beforeAll(() => {
      process.env.JWT_SECRET = 'test-secret-key';
    });

    it('deve gerar um token JWT', () => {
      const usuarioId = 1;
      const token = gerarToken(usuarioId);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });
  });

  describe('verificarToken', () => {
    beforeAll(() => {
      process.env.JWT_SECRET = 'test-secret-key';
    });

    it('deve verificar e decodificar um token válido', () => {
      const usuarioId = 1;
      const token = gerarToken(usuarioId);
      const decodificado = verificarToken(token);

      expect(decodificado).toBeDefined();
      expect(decodificado?.usuarioId).toBe(usuarioId);
    });

    it('deve retornar null para token inválido', () => {
      const tokenInvalido = 'token.invalido.aqui';
      const decodificado = verificarToken(tokenInvalido);

      expect(decodificado).toBeNull();
    });

    it('deve retornar null para token vazio', () => {
      const decodificado = verificarToken('');

      expect(decodificado).toBeNull();
    });
  });
});
