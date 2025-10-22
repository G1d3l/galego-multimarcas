import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa"; // Importa ícone do Instagram
import "./App.css";

function App() {
  // State para armazenar produtos da Fake Store API
  const [produtos, setProdutos] = useState([]);
  // State para controlar carregamento
  const [carregando, setCarregando] = useState(true);

  // useEffect roda apenas uma vez ao carregar o componente
  useEffect(() => {
    // Busca produtos masculinos e femininos da Fake Store API
    Promise.all([
      fetch("https://fakestoreapi.com/products/category/men's clothing").then((r) => r.json()),
      fetch("https://fakestoreapi.com/products/category/women's clothing").then((r) => r.json()),
    ])
      .then(([men, women]) => {
        // Combina os produtos e renomeia como Dry Fit
        const dryfit = [...men, ...women].map((item) => ({
          ...item,
          title: `Dry Fit ${item.title}`, // Adiciona "Dry Fit" ao nome do produto
          category: "Roupas Dry Fit",     // Define categoria
        }));
        setProdutos(dryfit);   // Atualiza state com produtos
        setCarregando(false);  // Remove mensagem de carregamento
      })
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  return (
    <div className="App">
      {/* Navbar / Cabeçalho */}
      <header className="navbar">
        <h1>Galego Multimarcas</h1>
        <nav>
          <a href="#produtos">Produtos</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      {/* Hero / Banner principal */}
      <section className="hero">
        <h2>Roupas Dry Fit com Estilo e Conforto</h2>
        <p>Vista-se com qualidade e performance. Galego Multimarcas tem o melhor pra você.</p>
        <a href="#produtos" className="btn">Ver Produtos</a>
      </section>

      {/* Seção de produtos */}
      <section id="produtos" className="produtos">
        <h3>Nossos Produtos</h3>
        {carregando ? (
          // Mensagem enquanto os produtos estão sendo carregados
          <p>Carregando produtos...</p>
        ) : (
          // Grid de produtos
          <div className="grid">
            {produtos.map((item) => (
              <div key={item.id} className="card">
                {/* Imagem do produto */}
                <img src={item.image} alt={item.title} />
                {/* Nome do produto */}
                <h4>{item.title}</h4>
                {/* Preço convertido para reais */}
                <p className="preco">R$ {(item.price * 5.2).toFixed(2)}</p>
                {/* Botão de ação (ainda sem funcionalidade real) */}
                <button>Adicionar ao carrinho</button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Seção Sobre */}
      <section id="sobre" className="sobre">
        <h3>Sobre a Galego Multimarcas</h3>
        <p>
          Somos especializados em roupas Dry Fit que unem estilo, leveza e durabilidade.
          Nosso objetivo é oferecer conforto e performance para quem busca qualidade no treino e no dia a dia.
        </p>
      </section>

      {/* Seção Contato */}
      <section id="contato" className="contato">
        <h3>Entre em Contato</h3>
        <p>Quer saber mais ou fazer um pedido? Fale com a gente!</p>

        {/* Botão WhatsApp com mensagem automática */}
        <a
          href="https://wa.me/5579999470841?text=Oi,%20vim%20pelo%20site%20da%20Galego%20Multimarcas!"
          target="_blank"
          rel="noreferrer"
          className="btn-whats"
        >
          💬 Chamar no WhatsApp
        </a>

        {/* Botão Instagram com ícone */}
        <a
          href="https://www.instagram.com/_felipegaabriel/"
          target="_blank"
          rel="noreferrer"
          className="btn-insta"
        >
          <FaInstagram style={{ marginRight: "8px" }} />
          Ver no Instagram
        </a>
      </section>

      {/* Footer / Rodapé */}
      <footer className="footer">
        <p>© 2025 Galego Multimarcas — Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
