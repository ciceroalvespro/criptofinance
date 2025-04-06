# CriptoFinance

Projeto web desenvolvido com React e TypeScript para exibir informações sobre o mercado de criptomoedas.

## Tecnologias Utilizadas

- React
- TypeScript
- Styled Components
- React Router
- CoinGecko API
- Fear & Greed Index API

## Funcionalidades

- Visualização de dados do mercado de criptomoedas
- Tabela dinâmica com ordenação por colunas
- Barra de pesquisa para filtrar criptomoedas
- Cards informativos com estatísticas do mercado
- Índice de Medo e Ganância
- Design responsivo

## Como Executar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/ciceroalvespro/criptofinance.git
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Acesse o projeto em:
```
http://localhost:3000
```

## Estrutura do Projeto

```
src/
├── components/     # Componentes React
│   ├── market/    # Componentes específicos do mercado
│   └── common/    # Componentes compartilhados
├── hooks/         # Custom hooks
├── pages/         # Páginas da aplicação
└── styles/        # Estilos globais
```

## APIs Utilizadas

- [CoinGecko API](https://www.coingecko.com/api/documentation) - Dados de criptomoedas
- [Fear & Greed Index](https://api.alternative.me/fng/) - Índice de Medo e Ganância

## Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
