import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro from '../../../classes/controle/ControleLivros';

// Definindo uma instância exportável de ControleLivro
export const controleLivro = new ControleLivro();

// Tratamento das requisições
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // Obter o vetor de livros via obterLivros
      const livros = controleLivro.obterLivros();
      res.status(200).json(livros); // Responde com o vetor de livros em formato JSON
    } else if (req.method === 'POST') {
      // Capturar os dados do livro via req.body
      const novoLivro = req.body;

      // Incluir o novo livro no vetor de livros
      controleLivro.incluir(novoLivro);

      // Responder com status 200 e mensagem de sucesso
      res.status(200).json({ mensagem: 'Livro incluído com sucesso!' });
    } else {
      // Tratar métodos não permitidos
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch (error) {
    // Tratar exceções internas do servidor
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};
