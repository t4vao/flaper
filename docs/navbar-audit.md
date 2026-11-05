# Navbar — audit, clarify e polish

Escopo: `app/src/components/FloatingNav.tsx`, família `Nav*Icon` e seus tokens em `app/src/theme.ts`.

Auditoria de código. Não houve inspeção renderizada, navegação por teclado, teste de leitor de tela, toque sintetizado ou teste em aparelho nesta rodada. As notas abaixo são provisórias e não certificam WCAG nem desempenho em dispositivo.

## Resultado da auditoria

| Dimensão | Nota / 4 | Evidência atual |
| --- | --- | --- |
| Acessibilidade | 3 | Abas nomeadas, estado selecionado, ícones decorativos e foco explícito; interação e leitor de tela ainda precisam de teste. |
| Desempenho | 3 | SVGs pequenos, sem dependências novas ou animação contínua; blur limitado à barra, sem saturação extra. Falta medir em celular. |
| Responsividade | 3 | Conjunto de aproximadamente 216 px, alvos de 44 e 48 px, recuo inferior e folga de rolagem compartilhados. Layout e zoom ainda não inspecionados. |
| Tokens | 3 | Cores e sombras da navbar centralizadas em theme.ts. O produto tem tema claro com mapa escuro; não foi acrescentado modo escuro global. |
| Integridade | 3 | Três destinos, seleção por forma e fundo neutro, Registrar como ação separada. Registro de visitas ainda não implementado. |
| Total provisório | 15 / 20 | Boa base no código; validação visual e funcional permanece pendente. |

O sistema expressa a direção aprovada: cápsula de vidro, ícones próprios em contorno/preenchimento, seleção cinza clara e ação separada. O detector não encontrou problemas nos componentes analisados. Isso não prova qualidade visual nem conclusão funcional.

## Achados e tratamento

### P1 — Contraste dependente do conteúdo sob o vidro

- Local: FloatingNav, estilo bar; theme, navGlass e navIconPrimary.
- Categoria: acessibilidade. Referência: WCAG 1.4.11, contraste de componentes gráficos.
- O branco com opacidade 0,42 podia se aproximar do cinza dos ícones sobre o mapa escuro e fotos. O desfoque não assegura contraste.
- Tratamento em polish: opacidade 0,82, preservando translucidez e um fallback sem blur. Para o contorno #68686F sobre branco 82% composto em preto, a razão calculada é 3,62:1. O cálculo não inclui antialiasing e não substitui inspeção do resultado renderizado.

### P1 — Registrar visita aparentava funcionar sem ter ação

- Local: FloatingNav, Pressable de Registrar visita.
- Categoria: integridade e clareza. O controle não tinha onPress nem uma tela de registro existente.
- Mitigação em clarify/polish: estado disabled real, aparência atenuada e dica acessível: “O registro de visitas ainda não está disponível.” Não promete prazo nem simula salvamento.
- Pendência funcional: implementar o fluxo de registro e conectar onRegister. A opção de callback só torna o botão ativo quando um handler é fornecido. Esta rodada não implementa esse fluxo.

### P2 — Foco sem tratamento próprio da interface

- Local: FloatingNav, Pressables das abas.
- Categoria: acessibilidade. Referência: WCAG 2.4.7.
- O componente não definia indicador de foco; isso não demonstra, sozinho, ausência do foco padrão do navegador.
- Tratamento em polish: anel de 2 px independente da seleção, sem alterar medidas. Preservados nomes, tablist, selected e ordem dos controles. Falta validar a navegação por teclado no navegador.

### P2 — Traços da bússola podiam se sobrepor

- Local: icons, NavExploreIcon.
- Categoria: polimento. As duas formas preenchidas separadas tinham distância menor que a espessura combinada dos contornos.
- Tratamento: afastamento simétrico somente no estado em contorno. O desenho preenchido conserva a posição original.

### P2 — Tokens incompletos na navbar

- Local: FloatingNav, bar/highlight/register.
- Categoria: tokens. Cores de superfície e sombras estavam espalhadas pelo componente.
- Tratamento: valores promovidos a tokens navGlass, navGlassBorder, navShadow, navActionShadow, navHighlight e navInsetShadow, em theme.ts.

## Clareza preservada

- Início, Explorar e Perfil mantêm a terminologia aprovada, sem texto visível na barra.
- tabBarAccessibilityLabel tem prioridade sobre title quando houver uma descrição específica.
- Registrar visita permanece uma ação, fora da tablist.
- A tablist agora tem o nome “Navegação principal”.
- Eventos tabPress e tabLongPress são encaminhados ao navegador.

## Verificação e próximos passos

- Lint e typecheck executados; o resultado final é registrado na entrega da rodada.
- Detector mecânico sem achados; nenhuma exceção adicionada.
- Não há timers, animação de entrada ou transição de seleção. A redução instantânea de 3% ao pressionar não adiciona uma sequência animada.
- Pontos positivos preservados: uso de safe area, folga no fim das listas, SVG independente de resolução, seleção que não depende só de cor e alvos mínimos de 44 px.
- Próximo passo funcional: conectar o registro de visitas. Depois, validar contraste renderizado, foco, toque, zoom e leitor de tela em celular, concluindo com polish dos problemas comprovados.
