// Sample data for the map prototype: fictional places on real Zona Sul streets.
// Every review carries a photo; the newest one becomes the pin.

export type Category = 'restaurante' | 'bar' | 'cafe' | 'festa';

export type Review = {
  author: string;
  rating: number;
  text: string;
  photo: string;
};

export type Place = {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  neighborhood: string;
  address: string;
  // Festas are recurring; this says when the next edition happens.
  when?: string;
  lngLat: [number, number];
  rating: number;
  reviewCount: number;
  likes: number;
  description: string;
  reviews: Review[];
};

export const CATEGORY_LABEL: Record<Category, string> = {
  restaurante: 'Restaurante',
  bar: 'Bar',
  cafe: 'Café',
  festa: 'Festa',
};

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=640&q=70&auto=format&fit=crop`;

const PHOTOS = {
  restaurante: [
    '1517248135467-4c7edcad34c4',
    '1414235077428-338989a2e8c0',
    '1559339352-11d035aa65de',
    '1504674900247-0877df9cc836',
    '1555396273-367ea4eb4db5',
    '1544148103-0773bf10d330',
  ],
  bar: [
    '1514933651103-005eec06c04b',
    '1572116469696-31de0f17cc34',
    '1543007630-9710e4a00a20',
    '1551024709-8f23befc6f87',
    '1470337458703-46ad1756a187',
    '1525268323446-0505b6fe7778',
  ],
  cafe: [
    '1495474472287-4d71bcdd2085',
    '1501339847302-ac426a4a7cbb',
    '1554118811-1e0d58224f24',
    '1509042239860-f550ce710b93',
    '1442512595331-e89e73853f31',
    '1453614512568-c4024d13c247',
  ],
  festa: [
    '1470229722913-7c0e2dbbafd3',
    '1492684223066-81342ee5ff30',
    '1533174072545-7a4b6ad7a6c3',
    '1516450360452-9312f5e86fc7',
    '1540039155733-5bb30b53aa14',
    '1514525253161-7a46d19cd819',
  ],
} satisfies Record<Category, string[]>;

// Three reviews per place, rotating through the category's photos so neighbours differ.
function reviews(category: Category, offset: number, items: [string, number, string][]): Review[] {
  const pool = PHOTOS[category];
  return items.map(([author, rating, text], i) => ({
    author,
    rating,
    text,
    photo: photo(pool[(offset + i) % pool.length]),
  }));
}

export const PLACES: readonly Place[] = [
  {
    id: 'quintal-voluntarios',
    name: 'Quintal Voluntários',
    category: 'restaurante',
    tagline: 'Cozinha de quintal com forno a lenha',
    neighborhood: 'Botafogo',
    address: 'R. Voluntários da Pátria, 210',
    lngLat: [-43.1885, -22.9532],
    rating: 4.7,
    reviewCount: 38,
    likes: 112,
    description:
      'Mesas no quintal, cardápio curto que muda toda semana e quase tudo sai do forno a lenha. Vale chegar cedo no sábado, a fila cresce depois das 13h.',
    reviews: reviews('restaurante', 0, [
      ['@ana.ribeiro', 5, 'O arroz de pato do forno é o motivo de voltar.'],
      ['@caiopm', 4, 'Quintal lindo, serviço um pouco lento no almoço.'],
      ['@lu.mesa', 5, 'Sobremesa de goiabada com queijo derretido. Só isso.'],
    ]),
  },
  {
    id: 'bar-do-largo',
    name: 'Bar do Largo',
    category: 'bar',
    tagline: 'Chope gelado e mesa na calçada',
    neighborhood: 'Botafogo',
    address: 'Largo dos Leões, 18',
    lngLat: [-43.1962, -22.9552],
    rating: 4.5,
    reviewCount: 61,
    likes: 204,
    description:
      'Boteco de esquina com mesas que tomam a calçada no fim da tarde. Petiscos clássicos, chope bem tirado e música baixa o suficiente para conversar.',
    reviews: reviews('bar', 0, [
      ['@rafa.b', 5, 'Bolinho de bacalhau sequinho e chope no ponto.'],
      ['@mari.noite', 4, 'Lota rápido na sexta, mas a calçada compensa.'],
      ['@joaovitor', 4, 'Bom para começar a noite antes de ir para outro lugar.'],
    ]),
  },
  {
    id: 'cafe-humaita',
    name: 'Café Humaitá',
    category: 'cafe',
    tagline: 'Torra própria e mesa para trabalhar',
    neighborhood: 'Humaitá',
    address: 'R. Humaitá, 95',
    lngLat: [-43.2012, -22.9567],
    rating: 4.8,
    reviewCount: 27,
    likes: 89,
    description:
      'Café de bairro com torra feita na casa, tomadas em todas as mesas e um pão de queijo que acaba antes das 11h.',
    reviews: reviews('cafe', 0, [
      ['@beatriz.c', 5, 'Melhor coado da região, e o barista explica cada grão.'],
      ['@thiago.dev', 5, 'Wi-fi bom e ninguém te apressa.'],
      ['@nanda', 4, 'Pão de queijo divino, chega cedo.'],
    ]),
  },
  {
    id: 'domingo-na-garagem',
    name: 'Domingo na Garagem',
    category: 'festa',
    tagline: 'Discotecagem de vinil ao fim da tarde',
    neighborhood: 'Botafogo',
    address: 'R. São Clemente, 330',
    when: 'Todo domingo · 17h',
    lngLat: [-43.1915, -22.9500],
    rating: 4.6,
    reviewCount: 44,
    likes: 310,
    description:
      'Festa recorrente numa garagem antiga, com DJs de vinil, pista pequena e drinks de caju. Começa cedo e termina às 23h.',
    reviews: reviews('festa', 0, [
      ['@duda.som', 5, 'Domingo perfeito, só música brasileira em vinil.'],
      ['@pedroh', 4, 'Pista enche às 20h, chega antes.'],
      ['@clara.l', 5, 'O drink de caju vale a ida sozinho.'],
    ]),
  },
  {
    id: 'casa-bolivar',
    name: 'Casa Bolívar',
    category: 'restaurante',
    tagline: 'Peixe do dia e vinho em taça',
    neighborhood: 'Copacabana',
    address: 'R. Bolívar, 64',
    lngLat: [-43.1874, -22.9714],
    rating: 4.6,
    reviewCount: 52,
    likes: 140,
    description:
      'Salão pequeno com cozinha aberta. O peixe chega todo dia de manhã e o garçom recomenda o vinho em taça certo para ele.',
    reviews: reviews('restaurante', 2, [
      ['@helena.m', 5, 'Peixe na brasa com farofa de banana, impecável.'],
      ['@gui.santos', 4, 'Pequeno, reserve antes.'],
      ['@tati', 5, 'Atendimento que lembra seu nome na segunda visita.'],
    ]),
  },
  {
    id: 'boteco-posto-6',
    name: 'Boteco do Posto 6',
    category: 'bar',
    tagline: 'Caipirinha olhando o Forte',
    neighborhood: 'Copacabana',
    address: 'R. Francisco Sá, 12',
    lngLat: [-43.1898, -22.9846],
    rating: 4.3,
    reviewCount: 73,
    likes: 186,
    description:
      'Bar de praia que vira ponto de encontro depois do pôr do sol. Caipirinha forte, camarão no alho e vista para o Forte de Copacabana.',
    reviews: reviews('bar', 2, [
      ['@marcelo.r', 4, 'Caipirinha de limão-cravo é a pedida.'],
      ['@ju.praia', 5, 'Pôr do sol daqui é outro nível.'],
      ['@vini', 4, 'Barulhento, mas é o clima.'],
    ]),
  },
  {
    id: 'cafe-farme',
    name: 'Café Farme',
    category: 'cafe',
    tagline: 'Brunch o dia inteiro',
    neighborhood: 'Ipanema',
    address: 'R. Farme de Amoedo, 41',
    lngLat: [-43.2032, -22.9838],
    rating: 4.4,
    reviewCount: 35,
    likes: 97,
    description:
      'Brunch servido até as 17h, ovos de quintal e um bolo de cenoura com calda que esgota no fim de semana.',
    reviews: reviews('cafe', 2, [
      ['@isa.f', 5, 'Ovos mexidos cremosos e café bem tirado.'],
      ['@lucas.ip', 4, 'Fim de semana tem espera de 20 min.'],
      ['@mila', 4, 'Bolo de cenoura merece a fama.'],
    ]),
  },
  {
    id: 'mesa-garcia',
    name: 'Mesa Garcia',
    category: 'restaurante',
    tagline: 'Menu degustação de ingredientes do Rio',
    neighborhood: 'Ipanema',
    address: 'R. Garcia d’Ávila, 120',
    lngLat: [-43.2081, -22.9832],
    rating: 4.9,
    reviewCount: 21,
    likes: 254,
    description:
      'Balcão de doze lugares em volta da cozinha. O menu degustação muda por estação e usa produtores do estado do Rio.',
    reviews: reviews('restaurante', 4, [
      ['@chef.amador', 5, 'Experiência completa, cada prato tem uma história.'],
      ['@bia.g', 5, 'Vale cada centavo para uma data especial.'],
      ['@rodrigo', 5, 'O pão de fermentação natural já valeria a noite.'],
    ]),
  },
  {
    id: 'por-do-sol-arpoador',
    name: 'Pôr do Sol no Arpoador',
    category: 'festa',
    tagline: 'Roda de samba na pedra',
    neighborhood: 'Arpoador',
    address: 'Pedra do Arpoador',
    when: 'Todo sábado · 16h',
    lngLat: [-43.1915, -22.9890],
    rating: 4.8,
    reviewCount: 96,
    likes: 512,
    description:
      'Roda de samba aberta que começa quando o sol baixa. Leve canga, água e chegue antes das 17h para pegar lugar na pedra.',
    reviews: reviews('festa', 2, [
      ['@samba.rio', 5, 'Aplauso pro sol e depois samba até a noite.'],
      ['@karol', 5, 'O momento mais carioca da semana.'],
      ['@fe.lima', 4, 'Lota muito, mas é de graça.'],
    ]),
  },
  {
    id: 'balcao-dias-ferreira',
    name: 'Balcão Dias Ferreira',
    category: 'bar',
    tagline: 'Drinks autorais em balcão de mármore',
    neighborhood: 'Leblon',
    address: 'R. Dias Ferreira, 233',
    lngLat: [-43.2241, -22.9839],
    rating: 4.7,
    reviewCount: 48,
    likes: 230,
    description:
      'Coquetelaria com balcão de mármore e carta que muda todo mês. Peça ao bartender um drink fora do cardápio.',
    reviews: reviews('bar', 4, [
      ['@negroni.lover', 5, 'Negroni de cacau inesquecível.'],
      ['@paula.r', 4, 'Caro, mas o drink é arte.'],
      ['@andre', 5, 'Bartender incrível, conversa sobre cada dose.'],
    ]),
  },
  {
    id: 'padaria-leblon',
    name: 'Padaria Ataulfo',
    category: 'cafe',
    tagline: 'Pão na chapa desde cedo',
    neighborhood: 'Leblon',
    address: 'Av. Ataulfo de Paiva, 900',
    lngLat: [-43.2198, -22.9852],
    rating: 4.2,
    reviewCount: 64,
    likes: 75,
    description:
      'Padaria de bairro aberta desde as 6h, com pão na chapa, média no copo americano e mesas na calçada.',
    reviews: reviews('cafe', 4, [
      ['@seu.jorge', 4, 'Pão na chapa clássico, sem invenção.'],
      ['@leticia', 4, 'Ótima para café antes da praia.'],
      ['@tomas', 5, 'Média com pão na chapa às 7h, perfeito.'],
    ]),
  },
  {
    id: 'cozinha-pacheco',
    name: 'Cozinha Pacheco',
    category: 'restaurante',
    tagline: 'Comida mineira com vista pro Cristo',
    neighborhood: 'Jardim Botânico',
    address: 'R. Pacheco Leão, 180',
    lngLat: [-43.2205, -22.9655],
    rating: 4.5,
    reviewCount: 30,
    likes: 102,
    description:
      'Casa antiga com varanda virada para o Cristo. Feijão tropeiro, frango com quiabo e doce de leite feito na casa.',
    reviews: reviews('restaurante', 1, [
      ['@mineiro.no.rio', 5, 'Tropeiro igualzinho ao de BH.'],
      ['@carla.jb', 4, 'Varanda linda no fim de tarde.'],
      ['@diego', 4, 'Porções generosas, dá para dividir.'],
    ]),
  },
  {
    id: 'baixo-gavea',
    name: 'Esquina da Gávea',
    category: 'bar',
    tagline: 'O encontro de quinta à noite',
    neighborhood: 'Gávea',
    address: 'Praça Santos Dumont, 31',
    lngLat: [-43.2288, -22.9765],
    rating: 4.1,
    reviewCount: 88,
    likes: 165,
    description:
      'O bar que vira praça às quintas. Chope, empada e muita gente em pé na calçada até tarde.',
    reviews: reviews('bar', 1, [
      ['@quinta.feira', 4, 'Quinta aqui é tradição.'],
      ['@bruno.g', 4, 'Empada de camarão excelente.'],
      ['@ale', 4, 'Cheio, mas sempre encontra conhecido.'],
    ]),
  },
  {
    id: 'baile-da-lapa',
    name: 'Baile da Lapa',
    category: 'festa',
    tagline: 'Forró e samba debaixo dos Arcos',
    neighborhood: 'Lapa',
    address: 'R. Joaquim Silva, 50',
    when: 'Toda sexta · 22h',
    lngLat: [-43.1802, -22.9137],
    rating: 4.4,
    reviewCount: 120,
    likes: 640,
    description:
      'Baile que alterna forró e samba a noite inteira. Aula de dança grátis às 22h para quem chega cedo.',
    reviews: reviews('festa', 4, [
      ['@forrozeira', 5, 'A aula das 22h salvou minha noite.'],
      ['@henrique', 4, 'Vai de tênis, a pista é de pedra.'],
      ['@nina', 5, 'Banda ao vivo maravilhosa.'],
    ]),
  },
  {
    id: 'bar-santa',
    name: 'Bar dos Trilhos',
    category: 'bar',
    tagline: 'Petisco e vista ao lado do bondinho',
    neighborhood: 'Santa Teresa',
    address: 'Largo dos Guimarães, 8',
    lngLat: [-43.1883, -22.9206],
    rating: 4.6,
    reviewCount: 41,
    likes: 133,
    description:
      'Bar de esquina ao lado do trilho do bonde, com varanda, petiscos de feijoada e cachaças de alambique.',
    reviews: reviews('bar', 3, [
      ['@santa.tere', 5, 'Bolinho de feijoada e cachaça de Paraty.'],
      ['@gabi', 4, 'Ver o bonde passar é parte do programa.'],
      ['@igor', 5, 'Varanda com a melhor brisa da cidade.'],
    ]),
  },
  {
    id: 'cafe-ladeira',
    name: 'Café da Ladeira',
    category: 'cafe',
    tagline: 'Bolo caseiro no alto do morro',
    neighborhood: 'Santa Teresa',
    address: 'R. Almirante Alexandrino, 410',
    lngLat: [-43.1932, -22.9248],
    rating: 4.7,
    reviewCount: 19,
    likes: 64,
    description:
      'Casinha com quintal no alto da ladeira, bolos que mudam todo dia e chá gelado de hibisco.',
    reviews: reviews('cafe', 1, [
      ['@livia', 5, 'Bolo de laranja ainda quente.'],
      ['@marcos', 4, 'Subida puxada, recompensa garantida.'],
      ['@sofi', 5, 'Quintal silencioso, ótimo para ler.'],
    ]),
  },
  {
    id: 'aterro-sonoro',
    name: 'Aterro Sonoro',
    category: 'festa',
    tagline: 'Festa ao ar livre no Aterro',
    neighborhood: 'Flamengo',
    address: 'Parque do Flamengo',
    when: '1º sábado do mês · 15h',
    lngLat: [-43.1728, -22.9335],
    rating: 4.5,
    reviewCount: 57,
    likes: 388,
    description:
      'Festa gratuita no gramado do Aterro com DJs locais e vista para o Pão de Açúcar. Acontece no primeiro sábado de cada mês.',
    reviews: reviews('festa', 1, [
      ['@aterro.fan', 5, 'Dançar com o Pão de Açúcar de fundo.'],
      ['@bel', 4, 'Leve canga e protetor.'],
      ['@ricardo', 5, 'Melhor festa grátis da cidade.'],
    ]),
  },
  {
    id: 'cantina-laranjeiras',
    name: 'Cantina Laranjeiras',
    category: 'restaurante',
    tagline: 'Massa fresca e toalha xadrez',
    neighborhood: 'Laranjeiras',
    address: 'R. das Laranjeiras, 300',
    lngLat: [-43.1878, -22.9352],
    rating: 4.4,
    reviewCount: 46,
    likes: 91,
    description:
      'Cantina de família com massa feita na casa, toalha xadrez e porções para dois.',
    reviews: reviews('restaurante', 3, [
      ['@nonna.rj', 5, 'Lasanha igual à da avó.'],
      ['@felipe', 4, 'Porção enorme, peça uma para dois.'],
      ['@aline', 4, 'Ambiente acolhedor e barato.'],
    ]),
  },
];
