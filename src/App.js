import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://fakestoreapi.com/products/category/men's clothing").then((r) => r.json()),
      fetch("https://fakestoreapi.com/products/category/women's clothing").then((r) => r.json()),
    ])
      .then(([men, women]) => {
        const dryfit = [...men, ...women].map((item) => ({
          ...item,
          title: `Dry Fit ${item.title}`,
          category: "Roupas Dry Fit",
        }));
        setProdutos(dryfit);
        setCarregando(false);
      })
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  return (
    <div className="App">
      <header className="navbar">
        <h1>Galego Multimarcas</h1>
        <nav>
          <a href="#produtos">Produtos</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <section className="hero">
        <h2>Roupas Dry Fit com Estilo e Conforto</h2>
        <p>
          Vista-se com qualidade e performance. Galego Multimarcas tem o melhor
          pra você.
        </p>
        <a href="#produtos" className="btn">
          Ver Produtos
        </a>
      </section>

      <section id="produtos" className="produtos">
        <h3>Nossos Produtos</h3>
        {carregando ? (
          <p>Carregando produtos...</p>
        ) : (
          <div className="grid">
            {produtos.map((item) => (
              <div key={item.id} className="card">
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p className="preco">R$ {(item.price * 5.2).toFixed(2)}</p>
                <button>Adicionar ao carrinho</button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section id="sobre" className="sobre">
        <h3>Sobre a Galego Multimarcas</h3>
        <p>
          Somos especializados em roupas Dry Fit que unem estilo, leveza e
          durabilidade. Nosso objetivo é oferecer conforto e performance para
          quem busca qualidade no treino e no dia a dia.
        </p>
      </section>

      <section id="contato" className="contato">
        <h3>Entre em Contato</h3>
        <p>Quer saber mais ou fazer um pedido? Fale com a gente!</p>
        <a
          href="https://wa.me/5599999999999"
          target="_blank"
          rel="noreferrer"
          className="btn-whats"
        >
          Chamar no WhatsApp
        </a>
      </section>

      <footer className="footer">
        <p>© 2025 Galego Multimarcas — Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
