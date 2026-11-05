---
name: flaper-design
description: "Desenhar, construir ou melhorar qualquer tela, componente ou estado do Flaper, o diário social de lugares de lazer e experiências (web responsiva com prioridade ao celular, feita em Expo). Use para Início, Explorar, Perfil, a ação Registrar, mapa, fichas, visitas, notas, listas, conquistas, artes para Stories, convites, administração e qualquer UI nova que precise seguir a identidade do Flaper: trio pastel da marca, Instrument Serif itálico, cápsulas táteis e mapa escuro."
---

# Desenhar o Flaper

Trabalhe como designer e design engineer do Flaper. O Flaper é um diário social de lugares: a pessoa registra onde foi, guarda o que quer conhecer e descobre lugares pelo gosto de pessoas que ela conhece. Cada tela deve facilitar uma de três coisas: **registrar uma visita**, **lembrar** ou **decidir aonde ir**. Não desenhe uma vitrine genérica de estabelecimentos nem um app de avaliações anônimas.

O escopo aprovado do produto está em [`../FLAPER_SPEC.md`](../FLAPER_SPEC.md) e prevalece sobre o brief antigo em `../design.md`. Do brief antigo, só a direção visual (cores, logotipo e botões) continua valendo. Este documento traduz a especificação e a identidade atual em regras de interface. Quando os dois divergirem, a especificação vence.

## Contexto do produto e da marca

- **Nome.** Flaper é o nome provisório aprovado. Partes do código ainda dizem Plafer (logotipo, `app.json`, `package.json`). Telas novas usam Flaper.
- **Unidade principal.** A visita: um lugar, uma data, e opcionalmente nota, texto e até cinco fotos. Uma pessoa pode visitar o mesmo lugar muitas vezes, e todas as visitas ficam no diário.
- **Útil sozinho.** Diário, Quero ir e listas têm valor mesmo para quem não segue ninguém. Nenhuma tela pode ficar vazia ou sem sentido por falta de conexões.
- **Popularidade não é qualidade.** "Em alta" conta quantas pessoas diferentes visitaram nos últimos sete dias. A nota é outra informação e aparece separada.
- **Confiança sem promessa de verificação.** O app não exige foto nem localização e não declara visitas verificadas.
- **Contribuição.** Participantes sugerem lugares que faltam no catálogo. Uma aprovação gera crédito, uma conquista e uma arte compartilhável.
- **Fase.** Beta restrito a convidados maiores de 18 anos, com login só pelo Google. O catálogo começa pelo Rio, mas aceita visitas em qualquer cidade.
- **Plataforma.** Web responsiva com prioridade ao celular, construída com Expo e `react-native-web`. Publicação nas lojas fica para depois, então todo componente precisa funcionar bem no navegador do celular.

O caráter visual vem do protótipo atual. O trio pastel marca ação, seleção e conquista. O Instrument Serif itálico é a voz editorial dos nomes. O mapa é escuro e silencioso, para que as fotos carreguem a cor. O resto é Inter, branco e cápsulas.

## Ordem de prioridade

Quando requisitos competirem, proteja nesta ordem:

1. **Privacidade e verdade dos dados.** Um registro privado nunca aparece como público. Uma nota nunca é apresentada como popularidade, nem o contrário. Localização em tempo real nunca é publicada sozinha.
2. **A especificação e os donos existentes.** `FLAPER_SPEC.md`, Expo Router, `src/theme.ts`, os componentes compartilhados e o funcionamento no navegador.
3. **Registrar com pouco esforço.** Escolher o lugar e confirmar a data basta. Todo o resto é opcional e pode ser editado depois.
4. **Clareza do lugar e da pessoa.** Quem foi, onde, quando, e com que nota (se houver).
5. **Identidade.** Logotipo, trio pastel, Instrument Serif, cápsulas e navegação flutuante.
6. **Celebração, movimento e polimento.** Só depois de as anteriores estarem certas.

## Áreas ainda em aberto

A composição interna de **Início, Explorar e Perfil**, e a posição e apresentação da ação **Registrar**, ainda serão desenhadas pelo usuário. Até lá:

- Não invente layout, hierarquia ou componentes próprios para essas telas. Implemente só o que foi pedido e use os fundamentos deste documento.
- As responsabilidades de cada tela são as da especificação. Início mostra atividade de quem a pessoa segue, ou sugestões e convite para a primeira visita quando ela não segue ninguém. Explorar tem busca, mapa, fichas e lugares em alta. Perfil reúne identidade, diário, listas, Quero ir e contribuições.
- Quando uma decisão de layout for necessária e não estiver definida, pergunte antes de fixá-la.

## Integrar com o projeto

- **Tokens.** `src/theme.ts` é a única fonte de cores, fontes e medidas de layout. Importe `colors`, `fonts` e `layout` de `@/theme`. Para usar uma cor nova, adicione antes um token com nome de papel em `theme.ts`. Não escreva hex solto no componente.
- **Fontes.** `src/app/_layout.tsx` carrega exatamente duas faces: `InstrumentSerif_400Regular_Italic` e `Inter_500Medium`. Um peso ou estilo novo só pode ser usado depois de carregado ali. Se não for carregado, ele cai na fonte do sistema sem aviso.
- **Rotas.** Telas ficam em `src/app/`. Componentes, dados e utilitários ficam fora dessa pasta. A pilha não tem header (`headerShown: false`) e usa transição `fade`.
- **Web primeiro.** Teste toda mudança no navegador, em largura de celular. Quando uma API for só nativa, crie a variante `.web.tsx` ao lado, como já fazem `Logo.web.tsx` (`background-clip: text` no lugar de `MaskedView`) e `RioMap.web.tsx` (maplibre-gl no lugar de MapLibre React Native). O resultado precisa ser igual nas duas plataformas.
- **Mapa.** MapLibre com a base CARTO Dark Matter, configurada em `src/components/map/config.ts`. O fornecedor precisa continuar substituível, então nenhuma tela depende de algo exclusivo da CARTO. O catálogo de lugares é independente da base do mapa.
- **Ícones.** Os glifos de ações e conteúdo são do Lucide, desenhados à mão em `src/components/icons.tsx` sobre a grade 24×24, com traço 1,5 e pontas arredondadas. A navbar usa a família própria `NavHomeIcon`, `NavExploreIcon` e `NavProfileIcon`, exibida a 28 px: contorno cinza de 1,7 quando inativa e silhueta preenchida em dois tons neutros quando selecionada (`filled`). A aba selecionada tem fundo cinza claro (`paper`), sem roxo, conforme a referência aprovada pelo usuário. Novos ícones entram nesse arquivo. Não adicione biblioteca de ícones.
- **Gradientes e sombras internas.** Use `expo-linear-gradient`. Uma sombra `inset` fica atrás dos filhos, então ela vai numa camada própria por cima do gradiente, como em `PillButton`.
- **Animação.** Use `Animated` com `useNativeDriver` ligado fora da web (`Platform.OS !== 'web'`). Largura e altura não rodam no driver nativo. Nesse caso, desligue o driver só nessa animação, como na expansão do `PlaceCard`.
- **Dependências.** Instale com `npx expo install` (veja `AGENTS.md`). Antes de adicionar uma biblioteca, confira se um módulo Expo resolve e se ela funciona na web.

## Sistema visual

### Cor

| Token | Valor | Papel |
| --- | --- | --- |
| `lavender` | `#DAC9FD` | Marca. Centro do gradiente, curtidas |
| `sky` | `#B0D8FD` | Marca. Início do gradiente, botão claro |
| `butter` | `#FFEAA6` | Marca. Fim do gradiente, estrelas da nota |
| `ink` | `#303034` | Texto principal, tela escura de marca, ação primária escura |
| `graphite` | `#47474D` | Topo do gradiente do botão escuro, texto de leitura |
| `muted` | `#7A7A82` | Texto secundário: endereço, data, metadados, contagens |
| `paper` | `#F2F2F2` | Fundo claro, chips de informação |
| `white` | `#FFFFFF` | Superfícies sobre o mapa e cartões |
| `night` | `#0E0E10` | Fundo do mapa e da tela enquanto o mapa carrega |

- **O trio pastel é a cor da marca.** Ele marca ação, seleção, categoria e conquista. Não é cor de texto corrido nem de fundo de tela inteira.
- **O gradiente da marca corre da esquerda para a direita:** `sky` → `lavender` → `butter`. Ele pertence ao logotipo, à celebração de conquista, à arte para Stories e ao fallback de foto. Os botões de autenticação têm gradientes próprios: branco → `sky` no claro e `graphite` → `ink` no escuro. Um uso novo de gradiente precisa de motivo de marca equivalente.
- **A base do mapa é escura e discreta.** `night` acompanha a cor de terra da CARTO Dark Matter. Não use mapa colorido nem camadas que disputem com as fotos. Se o fornecedor mudar, mantenha uma base escura equivalente e ajuste `night`.
- **A nota usa estrela com preenchimento `butter` e contorno `ink`.** Meia estrela é uma estrela preenchida pela metade, nunca um número solto sem estrela. Sem nota, nada aparece. Não mostre zero estrelas.
- **Cor nunca indica estado sozinha.** Categoria leva o nome escrito. Registro privado leva ícone e texto. O item ativo da navegação muda de forma, não só de cor.
- **Texto sobre foto** fica branco, sobre um degradê de transparente a preto 72% na base da imagem.

### Tipografia

Há duas vozes e nenhuma terceira.

- **Instrument Serif itálico (`fonts.logo`)** é a voz editorial. Ela aparece no logotipo, nos nomes de lugar e em títulos curtos de momentos de marca, como a celebração e a arte. Use para nomear, nunca para frases longas, rótulos, botões ou números.
- **Inter Medium (`fonts.label`)** é usada em todo o resto: rótulos, botões, metadados, datas, notas, texto de visita e contagens. Os tamanhos em uso vão de 11 a 16 px. Antes de criar um tamanho novo, prefira um dos existentes.
- **A hierarquia vem de face, tamanho e cor (`ink` contra `muted`), não de peso.** Só o peso 500 está carregado.
- **O tracking é negativo em textos de marca:** −0,09 em no logotipo e −0,06 em nos rótulos dos botões de autenticação.
- **O logotipo** é a palavra da marca em Instrument Serif itálico, 100 px na tela de entrada, −0,09 em, preenchida pelo gradiente da marca. Ele precisa de folga lateral para o itálico não ser cortado. Ao trocar Plafer por Flaper, mude só a palavra.
- **Copy em português do Brasil, com só a primeira letra maiúscula:** "Registrar visita", "Quero ir", "Continuar com Google", "Compartilhar", "Continuar".
- **Datas** aparecem por extenso e curtas ("12 de out."), com o ano só quando não for o ano atual. A data da visita é a que a pessoa informou, não a data de publicação.

### Forma

- **Cápsula é a forma padrão de controle.** Botões, a barra de navegação, etiquetas e chips usam raio total (100). Botões só de ícone são círculos.
- **Cartões têm cantos grandes e concêntricos.** A ficha usa raio 28, e a foto interna fica a 6 px da borda, com raio 22. Ao aninhar superfícies, o raio interno é o externo menos o recuo. Miniaturas de foto usam 16.
- **O que fica sobre o mapa tem contorno branco.** O pino é a foto dentro de um anel branco de 3 px. A etiqueta de categoria tem borda branca de 2 px.
- **Superfícies presas a um lugar do mapa apontam para ele.** O pino termina numa ponta de 14 × 7 e a ficha numa ponta de 26 × 12, as duas brancas.
- **As etiquetas de categoria se inclinam como adesivos colados à mão**, entre −7° e 8°, de acordo com o id do lugar. A inclinação é exclusiva das etiquetas e dos momentos de conquista.

### Profundidade

- **Sobre o mapa escuro, a sombra é forte e preta:** 45% nos pinos, 50% com desfoque de 40 px na ficha. Ela tira o objeto do mapa.
- **Sobre fundo claro, a sombra é sutil e usa `ink`:** 6% com desfoque de 8 px.
- **Controles táteis ganham brilho interno** (sombra `inset` clara no canto superior esquerdo), como os botões de autenticação e a navegação. Não aplique o brilho em superfícies de leitura.

### Layout

- **Prioridade ao celular.** Desenhe primeiro para 375 px de largura. Em telas largas, o conteúdo de leitura fica numa coluna centralizada de largura de celular e não se estica. O mapa pode ocupar a área toda.
- **Margens do frame:** 13 px nas laterais (`layout.gutter`). Na base, o recuo é o maior valor entre a área segura e 32 px (`layout.homeIndicator`), somado a 20 px (`layout.bottomPadding`). Conteúdo encostado na base de qualquer tela usa essa conta.
- **Nada importante fica sob a navegação flutuante.** Listas e feeds rolam por baixo dela, mas o último item precisa de um recuo inferior que o mantenha visível acima da barra.
- **A atribuição do mapa fica sempre visível**, no canto superior direito, abaixo da área segura. Ela é exigida pela CARTO e não pode ser coberta por elementos flutuantes.
- **Foco no lugar a 70% da altura** (`PIN_FOCUS_RATIO`). Ao selecionar um pino, o mapa leva o pino até esse ponto, e a ficha se abre acima dele.

## Componentes

Reutilize os donos existentes antes de criar um componente novo.

### Navegação flutuante

- Exatamente **três destinos: Início, Explorar e Perfil**, nessa ordem.
- **Só ícones, sem texto visível.** Cada item tem `accessibilityRole="tab"`, um nome acessível ("Início", "Explorar", "Perfil") e o estado selecionado exposto ao leitor de tela.
- **O item ativo se diferencia pela forma**, por exemplo glifo preenchido ou fundo próprio, e não só pela cor.
- Ela flutua centralizada na base, com o recuo do frame, a forma de cápsula, o brilho interno e a sombra sutil da `BottomNav` atual.
- **Registrar não é um item da barra.** Ele é uma ação dentro das telas, ainda sem posição definida. O botão **+** com gradiente da `BottomNav` atual pertence ao protótipo e sai da barra.
- Cada alvo de toque tem no mínimo 44 × 44 px.

### Mapa e lugar

- **`PlacePin`** mostra a foto mais recente do lugar num anel branco. Abaixo do zoom de detalhe (`DETAIL_ZOOM`), ele vira um ponto pequeno. A partir desse zoom, cresce e mostra a etiqueta de categoria. O pino selecionado some enquanto a ficha está aberta, para a ficha parecer o próprio pino se abrindo. O nome acessível é "nome, bairro".
- **`PlaceCard`** abre do pino em dois estágios na mesma superfície: prévia e ficha completa. Ao reorganizar a ficha para o diário social, separe sempre a nota média de "Em alta" e mostre quantas pessoas contribuem para cada número. Tocar no mapa ou começar um gesto fecha a ficha de volta no pino.
- **`CategorySticker`** pinta a etiqueta com uma cor do trio e sempre escreve o nome da categoria. As categorias aprovadas são gastronomia, cultura, vida noturna e natureza. A divisão e as cores do protótipo (restaurante, bar, café, festa) serão substituídas. Eventos não são categoria.
- **`PlacePhoto`** cai no gradiente da marca quando a imagem falha ou não existe. O lugar e a visita continuam bonitos sem foto, e a UI nunca mostra imagem quebrada.

### Visita, nota e privacidade

- **Uma visita mostra quem, onde e quando antes de qualquer outra coisa.** Nota, texto e fotos aparecem só se existirem, sem espaço reservado vazio.
- **O seletor de nota tem cinco estrelas com meia estrela.** Tocar na metade esquerda de uma estrela marca meia, e há uma forma clara de limpar a nota. A nota é opcional, e o formulário nunca a exige.
- **A data começa preenchida com hoje** e aceita datas antigas. Mostre-a sempre, porque ela distingue visitas repetidas.
- **Um registro privado é identificado onde quer que apareça para o autor**, com ícone de cadeado e o texto "Privado". Ele nunca aparece para outras pessoas, nem em contagens, médias ou "Em alta".
- **Um lugar pendente de aprovação** aparece só para quem o sugeriu, identificado como "Em revisão". Ele não aparece na descoberta pública.

### Botões

- **`PillButton`** é a cápsula de 50 px com texto Inter 16. A variante `light` vai de branco a `sky` com texto `ink`. A variante `dark` vai de `graphite` a `ink` com texto branco. Ele estica na largura disponível e serve para ações de tela inteira.
- **A entrada tem um único botão: "Continuar com Google", na variante `light`.** O botão da Apple do protótipo sai. A tela de entrada mantém o logotipo centralizado sobre `ink` e o botão na região inferior.
- **Ações compactas** dentro de cartões, como abrir rota, são cápsulas de 40 px em `ink` com texto branco.

### Conquista e arte para Stories

- **A celebração aparece uma vez**, na próxima abertura após uma aprovação, e pode ser dispensada. Ela tem duas ações: **Compartilhar** e **Continuar**. Várias aprovações pendentes entram numa só celebração, com acesso à arte de cada lugar. O aviso continua disponível dentro do app depois.
- **A celebração é o momento mais expressivo do app.** Ela pode usar o gradiente completo, etiquetas inclinadas e Instrument Serif em tamanho grande, sem trocar as duas fontes ou o trio da marca.
- **A arte para Stories é vertical (9:16)** e leva: foto autorizada do lugar (ou o gradiente da marca), nome do lugar em Instrument Serif, bairro e cidade, o nome de usuário de quem indicou, a frase "Coloquei este lugar no mapa", o logotipo e o endereço do Flaper. Ela não leva notas, contagens nem posição em ranking.
- **Compartilhar usa os recursos reais do dispositivo** (folha de compartilhamento nativa) e sempre oferece baixar a arte e copiar o link de convite. Não prometa publicação direta no Instagram.

### Estados

Toda lista, busca, feed, ficha e formulário precisa de estado de carregando, pronto, vazio e erro. Cada vazio diz o que fazer em seguida, como "Registre sua primeira visita" ou "Convide amigos". Cada erro explica o que falhou e oferece uma ação. Quando o app atingir um limite de uso do plano gratuito, explique o limite e preserve o que a pessoa já fez.

## Movimento

O movimento existe para ligar uma seleção ao que ela abre, confirmar toques e celebrar contribuições. Não use para decorar.

- **O mapa se move primeiro.** O mapa leva 420 ms (`FOCUS_DURATION`) para trazer o pino ao ponto de foco. A ficha espera 160 ms e então salta do pino, partindo de 25% da escala.
- **Aparição e expansão usam mola, fechamento usa tempo.** A ficha aparece com mola rápida e bem amortecida, expande com mola um pouco mais lenta e fecha em 160 ms de volta ao pino.
- **Ao pressionar, o controle encolhe levemente:** 0,95 em controles pequenos e 0,98 em botões largos.
- **A celebração pode ter uma entrada animada mais longa.** Ela não bloqueia as ações por mais de um instante, e Continuar fica disponível desde o começo.
- **Respeite a preferência por movimento reduzido.** Com ela ativa, troque escala, deslocamento e a animação da celebração por um esmaecimento simples.

## Fotos e conteúdo

- **A foto é opcional** em visitas e lugares. Sem foto, o conteúdo principal são a tipografia e o texto da pessoa.
- **Até cinco fotos por visita.** Elas são comprimidas e sem metadados de localização antes do envio, e nada na interface sugere que a foto comprova a visita.
- **Toda imagem tem direito de uso.** Não importe nem mostre notas, avaliações ou fotos do Google ou de outros serviços.
- **Visitas e listas são públicas por padrão.** A escolha entre público e privado fica visível no momento de registrar e pode ser mudada depois.

## Acessibilidade

- **Todo lugar do mapa também é alcançável por busca ou lista**, sem depender do mapa.
- **Ícones sem texto sempre têm nome acessível.** Isso inclui toda a navegação e qualquer botão só de ícone.
- **Foco visível e alvos de toque de pelo menos 44 × 44 px.** Use `hitSlop` quando o desenho for menor que a área tocável.
- **A nota é lida por extenso**, por exemplo "Nota 3,5 de 5".
- **Imagens informativas têm texto alternativo.** O logotipo tem o nome acessível da marca.
- **Contraste:** texto `muted` só aparece sobre branco ou `paper`, nunca sobre o mapa ou sobre foto.

## Rejeitar

Não entregue nenhum destes:

- Selo ou linguagem de "visita verificada", ou foto e localização tratadas como prova.
- Nota e popularidade misturadas num único número, selo ou ordenação sem rótulo.
- Registro privado que vaze para outra pessoa, contagem, média ou "Em alta".
- Localização em tempo real publicada automaticamente.
- Ranking de pontos, placar entre amigos, anúncios ou destaque pago de lugares.
- Telas de evento, agenda ou eventos como categoria.
- Notas, avaliações ou fotos importadas do Google ou de terceiros.
- Rótulos de texto na barra de navegação, um quarto item na barra ou Registrar dentro dela.
- Layout inventado para Início, Explorar ou Perfil antes de o usuário definir essas telas.
- Hex solto fora de `src/theme.ts`, peso de fonte não carregado ou uma terceira família tipográfica.
- Base cartográfica colorida, ou a atribuição do mapa escondida.
- Gradiente novo fora dos usos de marca listados.
- Biblioteca de ícones, ícones com outro traço ou ícones em ladrilhos coloridos.
- Um componente que funciona no nativo e quebra no navegador do celular.
