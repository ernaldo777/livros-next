import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import styles from '../styles/Home.module.css';
import ControleEditora from '../classes/controle/ControleEditora';
import Livro from '../classes/modelo/Livro';

// Objeto ControleEditora
const controleEditora = new ControleEditora();

// Constante baseURL para as requisições
// const baseURL: string = "http://localhost:3000/api/livros";
const baseURL: string = "/api/livros";

// Função assíncrona para incluir um livro
const incluirLivro = async (livro: Livro) => {
  const resposta = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(livro),
  });
  return resposta.ok;
};

const LivroDados: React.FC = () => {
  const router = useRouter(); // Hook para navegação

  // Estado para as opções de editoras
  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  // Estado para os campos do livro
  const [titulo, setTitulo] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autores, setAutores] = useState<string>('');
  const [codEditora, setCodEditora] = useState<number>(opcoes[0].value);

  // Método para tratar a mudança na combo de editoras
  const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(evento.target.value));
  };

  // Método para incluir o livro
  const incluir = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault(); // Evitar comportamento padrão do form
    const livro = new Livro(0, codEditora, titulo, resumo, autores.split('\n'));

    const sucesso = await incluirLivro(livro);

    if (sucesso) {
      router.push('/LivroLista'); // Navegar para a página de listagem de livros
    } else {
      alert('Falha ao incluir o livro.');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Adicionar Livro</title>
        <meta name="description" content="Formulário para adicionar livro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Adicionar Novo Livro</h1>

        <form onSubmit={incluir}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Resumo</label>
            <textarea
              className="form-control"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Autores (um por linha)</label>
            <textarea
              className="form-control"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Editora</label>
            <select
              className="form-select"
              value={codEditora}
              onChange={tratarCombo}
            >
              {opcoes.map((editora) => (
                <option key={editora.value} value={editora.value}>
                  {editora.text}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Incluir
          </button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
