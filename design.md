# ilov.la — direção de produto e MVP

> Decisões confirmadas na entrevista · 14 de outubro de 2026 · Primeiro recorte: Rio de Janeiro

## Proposta

**ilov.la ajuda moradores do Rio a decidir onde ir hoje ou no fim de semana.** O produto reúne em um mapa lugares indicados explicitamente por pessoas com um olhar interessante sobre a cidade. Cada indicação mostra quem recomendou, um motivo conferido na fonte e um caminho para chegar ao lugar.

A unidade de valor é **lugar + pessoa + motivo + fonte**. No MVP, essas pessoas são **citadas a partir de vídeos públicos**; não são apresentadas como parceiras ou curadoras verificadas do ilov.la. Perfis próprios e selo de verificação dependem de aceite posterior.

### Público inicial e tarefa principal

O primeiro público são moradores do Rio que já guardam indicações dispersas em redes sociais e mensagens. A tarefa principal é transformar uma indicação em uma decisão de saída. A ação mais importante da ficha é **Abrir rota**.

### Princípios de produto

1. **Valor antes do cadastro.** O mapa abre imediatamente e pode ser explorado sem conta. O login aparece ao salvar um lugar.
2. **Confiança antes de volume.** Só uma recomendação explícita, revisada na fonte, vira indicação do mapa.
3. **Autoria precisa.** Fonte pública citada e curador participante são estados diferentes.
4. **Densidade antes de cobertura.** Poucos bairros bem representados tornam o mapa útil antes de expandi-lo.
5. **Seleção independente.** Pagar não dá acesso ao mapa nem garante entrada ou destaque de um lugar.

## Recorte do MVP

- **Plataforma:** experiência web pensada primeiro para celular, aberta por link e passível de adição à tela inicial. O desktop também deve funcionar.
- **Geografia:** cerca de **40 lugares em 3 bairros** do município do Rio de Janeiro. Os bairros serão escolhidos após levantar as fontes e confirmar a densidade de indicações.
- **Categorias:** restaurantes, bares, cafés e lugares fixos de cultura e música, como galerias, centros culturais e casas de show. Uma agenda de eventos não faz parte do MVP.
- **Acesso:** mapa e todas as recomendações gratuitos. A pessoa entra direto no mapa; só precisa de conta ao salvar lugares.
- **Conteúdo:** revisão e publicação manuais de cada indicação. Foto do lugar é opcional; quando existir, deve ser própria ou ter uso autorizado.
- **Distribuição inicial:** convite direto a 30–50 moradores para observar o uso, junto de conteúdo próprio do ilov.la nas redes sociais.

Reservas, alertas de disponibilidade, perfis de pessoas citadas, outras cidades e planos pagos ficam fora do MVP.

## Regra editorial de publicação

Um lugar entra no mapa quando um vídeo público contém **uma indicação explícita**: a pessoa afirma que gosta, recomenda ou voltaria ao lugar. Aparição incidental e menção sem endosso não bastam. Antes de publicar, a revisão manual confirma a pessoa citada, o que foi dito, o lugar correto, o endereço e o link para o vídeo específico.

A ficha usa **uma frase factual escrita pelo ilov.la** para explicar o motivo, sem apresentá-la como fala literal do autor. A linha de atribuição pode seguir o modelo “Recomendado por @nome em vídeo público · Ver fonte”. Se a fonte não sustentar essa afirmação, a indicação não é publicada. A ficha não usa selo “verificado”, retrato da pessoa nem linguagem que sugira parceria sem seu aceite.

O MVP não copia nem hospeda vídeo, áudio, legendas, trechos ou capturas de tela de terceiros. Caso se opte por mostrar um vídeo no futuro, o [embed oficial do TikTok](https://developers.tiktok.com/docs/en/embed-videos) é uma alternativa a avaliar para cada fonte; o link direto já atende ao MVP. A curadoria registra a origem e o direito de uso de cada imagem. Fonte removida, lugar fechado ou endereço duvidoso exigem revisão da ficha.

## Jornada principal

1. **Abrir.** O link leva direto ao mapa, enquadrado nos bairros selecionados e com lugares publicados. Não há tela de login ou tutorial antes do conteúdo.
2. **Encontrar.** A pessoa explora pinos e uma lista equivalente, pesquisa por nome ou bairro e filtra por bairro e categoria.
3. **Decidir.** Ao selecionar um lugar, vê uma prévia com nome, categoria, bairro e motivo. A ficha completa mostra o endereço, a atribuição e o link para o vídeo original.
4. **Ir.** “Abrir rota” é a ação principal e abre um serviço externo de mapas. “Salvar” e “Compartilhar” são ações secundárias.
5. **Voltar.** Ao tentar salvar, a pessoa encontra a tela de autenticação com a identidade visual enviada. Após entrar, retorna ao mesmo lugar e conclui o salvamento.

Links compartilhados devem abrir diretamente a ficha do lugar. O título compartilhado precisa identificar o lugar e a origem da indicação sem sugerir uma parceria inexistente.

## Telas e componentes

| Tela ou componente | Função no MVP | Estados essenciais |
| --- | --- | --- |
| **Mapa do Rio** | Mostrar os lugares dos bairros lançados e manter a seleção sincronizada com a lista | carregando, pronto, vazio, erro |
| **Busca e filtros** | Buscar lugar ou bairro e filtrar bairro e categoria | aberto, ativo, nenhum resultado, limpar |
| **Pino de lugar** | Indicar a posição e abrir a prévia sem esconder o entorno | padrão, foco, selecionado, agrupado |
| **Lista de lugares** | Oferecer alternativa completa ao mapa, inclusive para teclado e leitor de tela | carregando, resultados, vazio |
| **Prévia do lugar** | Ajudar a comparar lugares com nome, bairro e motivo curto | aberta, fechada, com/sem foto |
| **Ficha do lugar** | Mostrar contexto, endereço, fonte e ação principal “Abrir rota” | com/sem foto, uma/várias indicações, fonte indisponível |
| **Atribuição da indicação** | Separar a frase editorial, a pessoa citada e o link do vídeo | fonte válida, em revisão |
| **Salvar lugar** | Registrar uma escolha e iniciar login apenas quando necessário | não salvo, autenticação necessária, salvo, erro |
| **Autenticação** | Permitir continuar com Google e devolver a pessoa ao lugar que tentou salvar | pronta, processando, erro, retorno |
| **Avisos** | Explicar falha de carregamento, ausência de resultados ou dados em revisão | mensagem específica com ação útil |

### Adaptação de tela

No celular, o mapa ocupa a área útil e a lista ou ficha aparece em uma folha inferior que pode ser recolhida e expandida. Busca, filtros e ação principal permanecem alcançáveis. No desktop, o mapa domina a tela e a lista fica em um painel lateral. Selecionar um item da lista destaca seu pino; selecionar um pino destaca o item correspondente.

## Direção visual confirmada e referências

As cores enviadas para a identidade são **lavanda `#DAC9FD`**, **azul claro `#B0D8FD`** e **amarelo `#FFEAA6`**. A tela escura de marca usa **`#303034`**. O logotipo de referência compõe um **“i” em Instrument Serif itálico**, com gradiente nas três cores, e o restante do nome em Instrument Serif branco. A grafia final do logotipo ainda precisa ser consolidada com o nome ilov.la.

Os botões “Continuar com Google” enviados têm formato de cápsula, altura de referência de **50 px**, texto de **16 px em Inter** e duas variantes visuais: clara com gradiente de branco para `#B0D8FD`, e escura com gradiente de `#47474D` para `#303034`. A referência da tela coloca o logotipo em destaque e os botões na região inferior. Como a entrada do MVP é direto no mapa, essa composição passa a orientar a **tela de autenticação acionada por Salvar**. O uso simultâneo das duas variantes do mesmo botão ainda será definido no desenho da tela.

A segunda imagem enviada é uma **referência de navegação mobile**, com controles arredondados e flutuantes na base. A estrutura final de navegação do ilov.la permanece aberta até a orientação prometida pelo fundador; não se deve copiar a hierarquia “Home / Explore / +” da imagem sem essa decisão.

Para a interface de exploração, o mapa deve manter os pinos, nomes e bairros legíveis. As cores de marca podem destacar seleção e ações, mas a base cartográfica precisa permanecer discreta. Foto não é requisito para uma ficha atraente: a versão sem imagem usa tipografia e motivo editorial como conteúdo principal. Movimento curto pode ligar a seleção do pino à ficha; a interface respeita preferência por movimento reduzido.

## Acessibilidade e confiança

Todos os lugares do mapa também aparecem em lista navegável por teclado e leitor de tela. Pinos têm nome acessível, foco visível e área de toque confortável; a cor sozinha não indica estado ou categoria. Imagens informativas recebem texto alternativo. A base cartográfica mantém a atribuição exigida pelo provedor. Informações que mudam, como horário de funcionamento, só aparecem com fonte e data de atualização.

## Crescimento e receita

O projeto busca se tornar um produto independente financeiramente sustentável. O mapa e as recomendações permanecem gratuitos. Um possível **ilov.la Club** deverá vender um serviço adicional que as pessoas valorizem repetidamente, sem esconder indicações públicas. Roteiros prontos são uma hipótese de teste, não uma funcionalidade decidida para o MVP. Comissão por reserva ou ingresso só será considerada quando houver volume e integração viável; pagamento por inclusão ou destaque editorial contradiz a regra de seleção independente.

No piloto, os sinais principais são: pessoas encontrando um lugar, abrindo rota e voltando para planejar outra saída. Cadastros, visualizações e seguidores ajudam a entender distribuição, mas não substituem esses sinais de valor.

## Critérios para o MVP estar pronto

1. É possível abrir o mapa por link, encontrar um lugar e abrir sua rota no celular sem criar conta.
2. Cerca de 40 lugares em 3 bairros passam pela revisão editorial; cada indicação publicada tem afirmação explícita, motivo factual e link para o vídeo específico.
3. Mapa e lista oferecem os mesmos lugares; busca, filtros e fichas têm estados de carregamento, vazio e erro compreensíveis.
4. Salvar um lugar pede autenticação no momento da ação e retorna à ficha após o login.
5. Nenhum lugar depende de foto para ser publicado, e nenhum material de terceiros é reproduzido sem direito de uso registrado.

## Decisões ainda abertas

- Os três bairros de lançamento, escolhidos após auditar fontes e densidade.
- A navegação mobile definitiva, conforme a orientação visual que ainda será enviada.
- A grafia final do logotipo e o uso das duas variantes do botão Google.
- Provedor de mapas, origem das fotos e rotina de revisão de fontes e lugares.
- O primeiro benefício pago do Club e o preço, após observar uso real.

## Referências

O [Aplace](https://www.producthunt.com/products/aplace?launch=aplace) motivou a ideia de descobrir lugares por recomendações de pessoas. A [Places](https://www.placestheapp.com/about-membership) é uma referência distinta para pensar curadoria e modelo de associação; seu funcionamento e preço não definem o MVP do ilov.la.
