import { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from '.';

// Tratamento das requisições
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // Recuperar codEditora via req.query (deve ser o mesmo nome que o arquivo)
      const codEditora = Number(req.query.codEditora);

      // Obter o nome da editora via getNomeEditora
      const nomeEditora = controleEditora.getNomeEditora(codEditora);

      // Verificar se o nome da editora foi encontrado
      if (nomeEditora) {
        // Retornar o nome da editora como JSON
        res.status(200).json({ nome: nomeEditora });
      } else {
        // Caso o codEditora não seja válido, retornar 404
        res.status(404).json({ mensagem: 'Editora não encontrada' });
      }
    } else {
      // Tratar métodos não permitidos
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch (error) {
    // Tratar exceções internas do servidor
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};
