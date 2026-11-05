# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pessoas que já recomendam lugares aos amigos e saem com frequência no Rio de Janeiro. Elas querem guardar onde foram, lembrar o que querem conhecer e decidir aonde ir a partir do gosto de pessoas que conhecem. No beta, os usuários são o fundador e os amigos dele, entrando por convite e com mais de 18 anos. Não há número fixo de participantes.

## Product Purpose

Flaper (nome provisório) é um diário social de lugares de lazer e experiências: gastronomia, cultura, vida noturna e natureza. A pessoa registra visitas com data e, se quiser, nota, texto e fotos. Ela também guarda lugares em Quero ir e monta listas. Por fim, descobre lugares pelas visitas de quem segue. O produto precisa ser útil para quem ainda não segue ninguém.

Sinais de sucesso: as pessoas voltam por conta própria para registrar outra visita, e outras pessoas salvam lugares a partir desses registros.

## Positioning

Descobrir lugares pelo gosto de quem você conhece, em vez de notas anônimas ou do que está viralizando. "Em alta" mede atividade recente e fica sempre separado da nota: popularidade não equivale a qualidade.

## Operating Context

- Uso no celular, pelo navegador, antes ou depois de sair: registrar uma visita, consultar o próprio diário, ver o que os amigos registraram.
- O catálogo começa com lugares reais e revisados do Rio. Ele cresce com sugestões dos participantes, aprovadas pelo fundador com ajuda de assistentes de IA fora do app.
- Uma sugestão aprovada gera crédito, uma conquista e uma arte vertical para Stories ("Coloquei este lugar no mapa"), ligada ao convite pessoal de quem a compartilha.

## Capabilities and Constraints

O escopo aprovado e completo está em `FLAPER_SPEC.md`, que é a fonte de verdade do produto.

- Web responsiva com prioridade ao celular, construída com Expo (React Native + react-native-web). Lojas de aplicativos ficam para depois.
- Login só com Google, via Better Auth. Backend em Cloudflare Workers, D1 e R2. Mapa com MapLibre e base CARTO no plano gratuito, com atribuição visível.
- Custo zero é uma restrição: avisar e limitar antes de gerar cobrança.
- A navegação é uma barra flutuante com três ícones, sem texto: Início, Explorar e Perfil. Registrar é uma ação dentro das telas.
- A visita é a unidade principal. A nota vai de cinco estrelas com meias, e é opcional. Cada visita aceita até cinco fotos opcionais. Visitas são públicas por padrão, com opção privada. Registros privados nunca afetam contagens, médias ou "Em alta".
- O app não pede foto nem localização como prova e não promete "visita verificada".
- Fora da primeira entrega: comentários, mensagens, push, eventos, anúncios, destaques pagos, ranking de pontos e automação de IA integrada.
- Em aberto: a composição interna de Início, Explorar e Perfil, a posição da ação Registrar e o nome definitivo.

## Brand Commitments

- Obrigatórios: o trio pastel (lavanda `#DAC9FD`, azul `#B0D8FD`, amarelo `#FFEAA6`) e o gradiente entre eles, o símbolo smiley lavanda (`app/assets/brand/flaper-mark.png`, provisório) e o mapa escuro com pinos de foto.
- A tipografia atual (Instrument Serif itálico e Inter) é a do protótipo e não foi declarada obrigatória.
- Copy em português do Brasil.

## Evidence on Hand

- Escopo aprovado: `FLAPER_SPEC.md`. Guia de interface: `app/DESIGN.md`.
- Protótipo funcional com mapa, pinos e ficha de lugar em `app/src`.
- Os dados de lugares em `app/src/data/places.ts` são fictícios e as fotos vêm do Unsplash. Não são o catálogo de produção.
- Ainda não existem usuários reais, depoimentos, métricas ou conteúdo publicado. Nenhuma tela deve inventar esses dados como se fossem reais.

## Product Principles

1. Útil sozinho: diário, Quero ir e listas têm valor sem nenhuma conexão.
2. Registrar custa pouco: escolher o lugar e confirmar a data basta.
3. Popularidade e qualidade são informações separadas.
4. Privacidade é verdade de dados, não só esconder elementos na interface.
5. Contribuir é reconhecido: quem coloca um lugar no mapa recebe crédito e celebração.

## Accessibility & Inclusion

WCAG 2.2 AA: contraste, nomes acessíveis (inclusive nos ícones da navegação), foco visível, alvos de toque de 44 px e respeito à preferência por movimento reduzido.
