import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // 🔹 Buscar produtos da Fake Store API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=8")
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data);
        setCarregando(false);
      })
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  return (
    <div className="App">
      {/* Navbar */}
      <header className="navbar">
        <h1>Galego Multimarcas</h1>
        <nav>
          <a href="#produtos">Produtos</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      {/* Hero */}
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

      {/* Produtos */}
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
                <p className="preco">
                  R$ {(item.price * 5.2).toFixed(2)} {/* converte USD → BRL */}
                </p>
                <button>Adicionar ao carrinho</button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sobre */}
      <section id="sobre" className="sobre">
        <h3>Sobre a Galego Multimarcas</h3>
        <p>
          Somos uma loja especializada em roupas Dry Fit que unem estilo,
          leveza e durabilidade. Nosso objetivo é oferecer conforto e
          performance para quem busca qualidade no treino e no dia a dia.
        </p>
      </section>

      {/* Contato */}
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

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Galego Multimarcas — Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
