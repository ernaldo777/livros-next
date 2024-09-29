import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import { LinhaLivro } from '../componentes/LinhaLivro';
import Livro from '../classes/modelo/Livro';

// URL base da API
const baseURL: string = "http://localhost:3000/api/livros";

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  // Função assíncrona para obter livros
  const obter = async () => {
    const resposta = await fetch(baseURL);
    const dados = await resposta.json();
    return dados;
  };

  // Função assíncrona para excluir um livro
  const excluirLivro = async (codigo: number) => {
    const resposta = await fetch(`${baseURL}/${codigo}`, {
      method: 'DELETE',
    });
    return resposta.ok;
  };

  useEffect(() => {
    if (!carregado) {
      obter().then((dados) => {
        setLivros(dados);
        setCarregado(true);
      });
    }
  }, [carregado]);

  const excluir = (codigo: number) => {
    excluirLivro(codigo).then((sucesso) => {
      if (sucesso) {
        setCarregado(false); // Força o redesenho da página
      }
    });
  };

  return (
    <div className="styles.container">
      <Head>
        <title>Catálogo de Livros</title>
      </Head>

      <Menu />

      <main className="mt-4">
        <h1 className="text-center">Catálogo de Livros</h1>

        <table className="table table-striped table-hover mt-4">
          <thead>
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                excluir={() => excluir(livro.codigo)}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
