import React from 'react';
import ControleEditora from '../classes/controle/ControleEditora';
import Livro from '../classes/modelo/Livro';

// Definindo a instância de ControleEditora
const controleEditora = new ControleEditora();

// Definindo a interface LinhaLivroProps
interface LinhaLivroProps {
  livro: Livro;
  excluir: () => void;
}

// Definindo o componente LinhaLivro
export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
  const { livro, excluir } = props;

  // Obtendo o nome da editora via controleEditora
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td className="align-middle">
        {livro.titulo}
        <br />
        <button className="btn btn-danger btn-sm mt-2" onClick={excluir}>
          Excluir
        </button>
      </td>
      <td className="align-middle">{livro.resumo}</td>
      <td className="align-middle">{nomeEditora}</td>
      <td className="align-middle">
        <ul className="list-unstyled">
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};
