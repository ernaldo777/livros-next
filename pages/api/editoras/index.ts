import { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora from '../../../classes/controle/ControleEditora';

// Definindo uma instância exportável de ControleEditora
export const controleEditora = new ControleEditora();

// Tratamento das requisições
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // Obter o vetor de editoras e responder com status 200
      const editoras = controleEditora.getEditoras();
      res.status(200).json(editoras);
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
