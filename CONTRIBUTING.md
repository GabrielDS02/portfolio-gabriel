# Contribuindo

Obrigado por considerar uma contribuição. Este projeto prioriza mudanças pequenas, revisáveis e verificáveis.

## Fluxo

1. crie uma issue quando a mudança alterar comportamento ou arquitetura;
2. crie uma branch a partir de `main` (`feat/`, `fix/`, `docs/` ou `chore/`);
3. instale dependências com `npm ci`;
4. implemente a mudança preservando acessibilidade e responsividade;
5. execute `npm run check`;
6. abra um Pull Request usando o template do repositório.

## Padrões

- TypeScript estrito e sem `any` desnecessário;
- componentes com responsabilidade clara;
- conteúdo público centralizado em `portfolio.data.ts`;
- animações devem respeitar `prefers-reduced-motion`;
- imagens precisam de texto alternativo e dimensões explícitas;
- não adicione segredos, chaves, tokens ou dados pessoais;
- comentários devem explicar decisões não óbvias, não repetir o código.

## Commits

```text
feat: add installable portfolio experience
fix: preserve keyboard focus in mobile navigation
docs: document Netlify deployment flow
```

O PR deve explicar problema, solução, validação e impacto visual. O merge só ocorre após os checks obrigatórios passarem.
