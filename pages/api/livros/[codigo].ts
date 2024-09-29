import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.';

// Tratamento das requisições
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      // Capturar o código do livro via req.query e converter para número
      const codigo = Number(req.query.codigo);

      // Excluir o livro usando o método excluir do controleLivro
      controleLivro.excluir(codigo);

      // Responder com status 200 e mensagem de sucesso
      res.status(200).json({ mensagem: 'Livro excluído com sucesso!' });
    } else {
      // Tratar métodos não permitidos
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch (error) {
    // Tratar exceções internas do servidor
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};
