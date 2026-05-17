# 🛒 Lista de Compras Inteligente

Este projeto é um sistema web leve e funcional para gerenciamento de listas de supermercado. Ele permite buscar produtos em um banco de dados local, gerenciar quantidades e medidas, e exportar a lista final em um PDF para levar no celular ou imprimir.

---

## 🎯 Objetivo do Sistema

O foco principal foi criar uma ferramenta **offline-first** (que funciona prioritariamente no lado do cliente) com as seguintes premissas:

1. **Agilidade:** Busca instantânea em uma base de +200 produtos.
2. **Persistência:** Os dados não somem ao fechar o navegador (uso de LocalStorage).
3. **Portabilidade:** Exportação de documentos claros e legíveis (PDF).

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Função |
| --- | --- |
| **HTML5 / CSS3** | Estruturação e interface responsiva (UI/UX). |
| **JavaScript** | Lógica de negócios, manipulação de DOM e eventos. |
| **jsPDF / AutoTable** | Bibliotecas para geração dinâmica de documentos PDF. |
| **GitHub Pages** | Hospedagem estática e deploy contínuo. |

---

## 🧠 Conceitos Aprendidos

Durante o desenvolvimento deste projeto, mergulhei em conceitos fundamentais do desenvolvimento web moderno:

* **Manipulação de DOM (Document Object Model):** Criação e remoção de elementos dinamicamente sem o uso de frameworks (como React ou Vue).
* **Data Persistence (LocalStorage):** Entendimento de como salvar estados no navegador do usuário, garantindo que a lista sobreviva a recarregamentos de página.
* **Fetch API & JSON:** Manipulação de arquivos de dados externos e requisições assíncronas para carregar o banco de produtos.
* **Algoritmos de Busca:** Implementação de filtros em tempo real com normalização de strings (ignore case).
* **Arquitetura Serverless vs Servidor:** Transição de uma aplicação que dependia de um backend Node.js para uma aplicação estática hospedada no GitHub Pages.

---

## 🏗️ Estrutura do Projeto

```text
├── index.html       # Estrutura principal da página
├── style.css       # Estilização e layout (Flexbox)
├── app.js          # O coração do sistema (lógica e eventos)
├── products.json    # Banco de dados de produtos em formato JSON
└── README.md        # Documentação do projeto

```

---

## 🚀 Como rodar o projeto

Como o sistema foi otimizado para ser estático, você tem duas opções:

1. **Online:** Acesse diretamente pelo link do GitHub Pages: [https://rafaelabiaze.github.io/Lista-Supermercado/](https://rafaelabiaze.github.io/Lista-Supermercado/)
2. **Localmente:** * Clone o repositório.
* Abra o arquivo `index.html` em um navegador (recomenda-se usar a extensão *Live Server* do VS Code para suporte ao carregamento do JSON).



---

## 👨‍💻 Autor

Desenvolvido com foco em aprender mais do JavaScript puro, 2026.