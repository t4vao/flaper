# Flaper — escopo aprovado do MVP

Confirmado pelo usuário em 4 de novembro de 2026 após entrevista batch-grill-me.
Este documento registra a nova proposta e prevalece sobre a proposta antiga de produto em design.md. Flaper é o nome provisório aprovado; o código existente ainda usa Plafer em alguns pontos.

## Proposta e público

Diário social de lugares de lazer e experiências: registrar a própria vida, compartilhar visitas e descobrir lugares por meio de pessoas cujo gosto se conhece. O público inicial são pessoas que já recomendam lugares aos amigos.

O produto deve ser útil individualmente com diário, Quero ir e listas. Gastronomia, cultura, vida noturna e natureza fazem parte do escopo. Serviços cotidianos e cadastro próprio de eventos ficam para uma expansão posterior. Um evento pode ser mencionado no texto da visita ao local.

Primeira entrega: produto real, web responsiva com prioridade ao celular, contas reais, backend e dados persistidos. Rio de Janeiro concentra o catálogo inicial e a validação; registros de outras cidades são permitidos. Publicação em lojas fica para depois.

## Navegação e descoberta

A barra de navegação deve ser flutuante, com exatamente três destinos: Início, Explorar e Perfil. Usar somente ícones, sem rótulos de texto visíveis, mantendo nomes acessíveis para leitores de tela. Registrar é uma ação dentro das telas, sem item próprio na barra. Sua posição e apresentação serão definidas junto às interfaces internas.

As interfaces internas dessas telas ainda serão definidas pelo usuário. Os itens abaixo descrevem suas responsabilidades funcionais, sem fixar composição visual, componentes ou layout.

- Início: atividade de pessoas seguidas; sem conexões, sugestões locais e convite para registrar a primeira visita.
- Explorar: busca no catálogo próprio, mapa, fichas e lugares em alta por cidade.
- Perfil: identidade pública, diário, listas, Quero ir e contribuições.
- Preservar a identidade visual atual onde fizer sentido, adaptando a hierarquia ao diário social.

A ação Registrar permite escolher lugar, confirmar data e adicionar conteúdo opcional.

Seguir pessoas não exige reciprocidade. Permitir curtir registros e salvar lugares. Listas personalizadas e Quero ir estão incluídos; listas podem ser públicas ou privadas.

## Visitas, notas e privacidade

- A unidade principal é uma visita com data, permitindo repetições e datas antigas.
- A data começa preenchida com hoje. Nota, texto e fotos são opcionais.
- Nota de cinco estrelas com incrementos de meia estrela.
- Até cinco fotos por visita, comprimidas e com metadados de localização removidos antes do armazenamento. Fotos privadas exigem acesso restrito.
- Permitir editar e excluir visitas.
- Registros públicos por padrão, com opção privada. Não publicar localização em tempo real automaticamente.
- Não exigir foto ou localização como comprovação nem prometer visita verificada.
- Cada pessoa contribui para a média do lugar com sua nota pública mais recente; todas as visitas permanecem no diário.
- Registros privados não influenciam notas, contadores públicos ou tendências.

Em alta significa número de pessoas diferentes com visitas públicas datadas dos últimos sete dias na cidade selecionada. Registros retroativos de visitas fora da janela não entram. A avaliação é exibida separadamente: popularidade não equivale a qualidade.

## Catálogo e contribuições

Começar com um catálogo pequeno, revisado, de lugares reais. Os dados fictícios atuais não são o catálogo de produção. Usar dados com origem e direito de uso verificados; não importar notas, avaliações ou fotos do Google. Fotos do produto devem ter direito de uso, incluindo as fornecidas pelos participantes.

Sem dependência inicial de API paga de busca global: buscar no catálogo próprio e permitir sugerir nome, categoria e ponto no mapa para locais ausentes. Procurar possíveis duplicatas antes de criar a sugestão.

O autor pode usar o local pendente no próprio diário. Sua inclusão na descoberta pública depende de aprovação. Área administrativa para aprovar, recusar com motivo, corrigir e unir duplicatas. Sugestões recusadas podem ser corrigidas e reenviadas.

A primeira sugestão válida recebe o crédito. Uma sugestão duplicada direciona ao local existente, sem criar outro cadastro.

## Conquistas e compartilhamento

- Conquista especial na primeira indicação aprovada e contador de contribuições aprovadas.
- Cada nova aprovação gera uma celebração breve na próxima abertura, exibida uma vez e dispensável.
- Várias aprovações pendentes são reunidas na mesma celebração, com acesso às artes individuais.
- Ações Compartilhar e Continuar; manter também aviso dentro do app.
- Arte vertical para Stories com foto autorizada do lugar, nome, bairro/cidade, nome de usuário, marca e endereço do Flaper. Conceito aprovado: “Coloquei este lugar no mapa”.
- Associar a divulgação ao convite pessoal, oferecendo cópia do link para acompanhar a publicação. Compartilhamento sempre opcional.
- Não presumir publicação automática no Instagram; a entrega deve respeitar os recursos reais de compartilhamento do dispositivo e permitir exportar a arte.
- Sem ranking de pontos inicialmente.

## Acesso, convites e administração

Login inicial somente com Google, via Better Auth. Beta para maiores de 18 anos, começando com o usuário e seus amigos, sem quantidade fixa de participantes. Acesso restrito a convidados durante o beta; a visibilidade pública vale entre participantes. Abertura a visitantes fica para depois.

Cada participante tem link pessoal reutilizável; novos participantes também podem convidar. Administração pode desativar links e pausar entradas.

Administrador humano: o usuário, auxiliado por seus funcionários IAs. Inicialmente, seus assistentes trabalham com ele fora do app para revisar sugestões, duplicatas e justificativas; a decisão final é confirmada na área administrativa. Não há dependência inicial de inferência paga ou automação autônoma integrada.

Incluir denúncia de conteúdo/perfil, bloqueio e fila administrativa. Bloquear impede novas interações e remove relações de seguir entre as duas contas.

E-mail e registros privados são acessíveis somente ao titular e aos serviços estritamente necessários para operar o produto. Testar as permissões no backend e no acesso direto aos arquivos, sem depender apenas de esconder elementos na interface.

Permitir excluir visitas, listas, fotos e a própria conta. Exclusão da conta remove seu conteúdo associado e recalcula os agregados públicos.

## Infraestrutura e custo

- Cloudflare Workers: hospedagem e backend.
- Cloudflare D1: dados relacionais, incluindo contas, sessões e relações sociais.
- Cloudflare R2: fotos.
- Better Auth: autenticação e sessões, começando com Google.
- MapLibre: exibição do mapa.
- CARTO: base visual, na modalidade gratuita e com chave própria e atribuição.

Custo zero é restrição do início, não promessa de capacidade ilimitada. Conferir condições vigentes na implementação. Acompanhar cotas, controlar uploads e crescimento por convites; avisar e limitar operações antes de gerar custos, preservando os dados existentes. Contratações e upgrades exigem decisão explícita do usuário. Verificar mecanismos concretos de cobrança de cada serviço; um aviso de orçamento isolado não é garantia de bloqueio de gastos.

Manter o fornecedor do mapa substituível. O catálogo próprio de lugares é independente da base visual. A modalidade gratuita CARTO verificada na entrevista exige chave própria e atribuição e está sujeita a limites e mudanças.

Fontes verificadas na entrevista:

- https://developers.cloudflare.com/workers/platform/pricing/
- https://developers.cloudflare.com/d1/platform/pricing/
- https://developers.cloudflare.com/r2/pricing/
- https://better-auth.com/blog/1-5
- https://carto.com/legal/basemap-terms/index.html
- https://www.carto.com/basemaps/apikey/index.html

## Validação e sequência de entrega

Sinais de valor: pessoas voltam espontaneamente para registrar outra visita; outras pessoas salvam lugares a partir desses registros. Não confundir esses sinais com metas numéricas já acordadas.

Sequência sugerida para implementação, preservando todo o escopo aprovado:

1. Base de dados, autenticação, convites, permissões e estrutura administrativa.
2. Catálogo real, busca, mapa, sugestões e aprovação.
3. Visitas, fotos, diário, listas e exclusão.
4. Perfis, seguidores, feed, curtidas e tendências.
5. Conquistas, artes compartilháveis, denúncias e bloqueio.
6. Verificação de fluxos completos entre contas distintas, privacidade e controles de custo antes do beta.

Fora da primeira entrega: comentários, mensagens, push, e-mails de atividade, agenda/cadastro de eventos, anúncios, destaques pagos, ranking de pontos, aplicativos nas lojas e automação integrada de IA.

Configuração de contas de fornecedores, segredos e publicação são etapas posteriores; a confirmação do escopo não significa que esses recursos já estejam provisionados ou publicados.
