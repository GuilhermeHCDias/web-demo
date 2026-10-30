# Botão roxo gigante na página

status: todo
created: 2026-10-30
type: feat
depends-on: none

## Goal
Adicionar à página inicial um botão grande, de cor roxa, visível logo na tela, que incrementa o contador de cliques já existente. Feito significa que o botão aparece em destaque na seção "Try It Out", é roxo nos modos claro e escuro, e cada clique atualiza o contador.

## Context
- `index.html`: a seção "Try It Out" tem o `div.button-row` com `#actionButton` ("Click me") e `#resetButton` (secundário), seguido de `#counter`.
- `styles.css`: a cor de destaque é `--accent: #2f80ed` (azul), usada pelo `button` padrão. O seletor `button` define o estilo base; `button.secondary` é a variante de contorno. As cores de destaque não mudam no modo escuro.
- `script.js`: o `#actionButton` incrementa `clicks` e chama `render()`, que atualiza o contador e o título da aba.
- Não há testes automatizados. O CI (`.github/workflows/ci.yml`) roda `htmlhint`, `stylelint` e `node --check script.js`.

## Acceptance criteria
- [ ] C1. When the page loads, the system shall show a purple button with a font size of at least 2.5rem in the "Try It Out" section, larger than the current buttons.
- [ ] C2. When the user clicks the purple button, the system shall increment the click counter and update `#counter` as the existing button does.
- [ ] C3. The purple button shall use the same purple (`#7c3aed`) in light and dark mode, defined as a CSS custom property.
- [ ] C4. When the user hovers or focuses the purple button, the system shall show the existing hover lift and the focus outline in the same purple.
- [ ] C5. The existing "Click me" and "Reset" buttons shall keep their current behavior and styling.
- [ ] C6. The purple button shall span the full width of the container on screens narrower than 640px.

## Out of scope
- Mudar o comportamento do contador, do botão Reset ou da mensagem a cada 10 cliques.
- Qualquer tipo de deploy ou alteração no CI.
- Animações além do efeito de hover já existente.
- Atualizar o README.

## Decisions & assumptions
- Botão novo ao lado dos existentes, em vez de substituir "Click me" → C5. Why: preserva a funcionalidade atual e o pedido não pede remoção.
- Ação: incrementa o contador existente → C2. Why: é o único comportamento interativo da página; evita inventar nova lógica.
- Roxo `#7c3aed`, fixo nos dois modos → C3. Why: o roxo tem contraste suficiente com texto branco em ambos os fundos; o `--accent` atual não muda para não afetar o restante.
- Texto do botão: "Click me" → C1. Why: a página é em inglês, e o usuário manteve a opção recomendada.

## Verification
- Abrir `index.html` no navegador, ver o botão roxo grande na seção "Try It Out", clicar algumas vezes e confirmar que o contador sobe, nos modos claro e escuro.