// @ts-ignore
// eslint-disable-next-line import/extensions
import tailwindConfig from '../../tailwind.config.js';

type Route = {
  path: string;
  name: string;
  target: string;
  children?: Route[];
};

const routes: Route[] = [
  {
    name: 'Home',
    path: '/',
    target: '_self',
  },
  {
    name: 'Pastes',
    path: '',
    target: '',
    children: [
      {
        name: 'User Paste',
        path: '/pastes/public',
        target: '_self',
      },
      {
        name: 'VGC Paste',
        path: '/pastes/vgc',
        target: '_self',
      },
      {
        name: 'Create',
        path: '/pastes/create',
        target: '_self',
      },
    ],
  },
  {
    name: 'About',
    path: '/about',
    target: '_self',
  },
  {
    name: 'GitHub',
    path: 'https://github.com/txfs19260817/falinks-teambuilder',
    target: '_blank',
  },
];

const dialogProps = [
  {
    id: 'notes-modal',
    emoji: '📝',
    text: 'Notes',
    title: 'Add notes to your team with a rich-text editor',
  },
  {
    id: 'import-ps-modal',
    emoji: '📥',
    text: 'Import',
    title: 'Import a team from Showdown paste or PokePaste link',
  },
  {
    id: 'export-ps-modal',
    emoji: '📤',
    text: 'Export',
    title: 'Export this team to Showdown paste',
  },
  {
    id: 'post-pokepaste-modal',
    emoji: '✈️',
    text: 'Post',
    title: 'Post your team to PokePaste or this site',
  },
];

const usefulLinks = [
  {
    name: '🕹️ Showdown',
    url: 'https://play.pokemonshowdown.com/',
  },
  {
    name: '📟 DamageCalc',
    url: 'https://www.pikalytics.com/calc',
  },
  {
    name: '📈 Pikalytics',
    url: 'https://www.pikalytics.com/',
  },
];

const popularItems = [
  'Aguav Berry',
  'Assault Vest',
  'Choice Band',
  'Choice Scarf',
  'Choice Specs',
  'Eviolite',
  'Expert Belt',
  'Figy Berry',
  'Focus Sash',
  'Iapapa Berry',
  'Leftovers',
  'Life Orb',
  'Mago Berry',
  'Mental Herb',
  'Power Herb',
  'Rocky Helmet',
  'Shuca Berry',
  'Sitrus Berry',
  'Weakness Policy',
  'Wiki Berry',
];

export const AppConfig = {
  site_name: 'Falinks Teambuilder',
  title: 'Falinks Teambuilder',
  description: 'Falinks Teambuilder is a collaborative Pokémon team building platform.',
  locale: 'en',
  maxPokemonPerTeam: 6,
  defaultGen: 8,
  usageAPI: `https://www.pikalytics.com/api/l/2022-${`${new Date().getMonth()}`.padStart(2, '0')}/ss-1500`,
  themes: tailwindConfig.daisyui.themes as string[],
  dbName: 'falinks',
  collectionName: {
    vgcPastes: 'vgc_pastes',
    publicPastes: 'public_pastes',
  },
  popularItems,
  dialogProps,
  usefulLinks,
  routes,
};

export const trainerNames = [
  'Acerola',
  'Agatha',
  'Alder',
  'Allister',
  'Archie',
  'Ash',
  'Barry',
  'Bea',
  'Bede',
  'Bertha',
  'Bianca',
  'Blaine',
  'Blue',
  'Brawly',
  'Brendan',
  'Brock',
  'Bruno',
  'Brycen',
  'Bugsy',
  'Burgh',
  'Caitlin',
  'Calem',
  'Candice',
  'Cheren',
  'Cheryl',
  'Clair',
  'Clay',
  'Clemont',
  'Courtney',
  'Crasher Wake',
  'Cynthia',
  'Cyrus',
  'Darach',
  'Dawn',
  'Diantha',
  'Drake',
  'Elesa',
  'Elio',
  'Emmet',
  'Erika',
  'Ethan',
  'Evelyn',
  'Falkner',
  'Fantina',
  'Flannery',
  'Flint',
  'Gardenia',
  'Ghetsis',
  'Giovanni',
  'Glacia',
  'Gladion',
  'Gloria',
  'Grant',
  'Grimsley',
  'Guzma',
  'Hala',
  'Hapu',
  'Hau',
  'Hilbert',
  'Hilda',
  'Hop',
  'Ingo',
  'Iris',
  'James',
  'Janine',
  'Jasmine',
  'Jessie',
  'Kahili',
  'Karen',
  'Kiawe',
  'Koga',
  'Korrina',
  'Kris',
  'Lana',
  'Lance',
  'Leaf',
  'Lear',
  'Leon',
  'Lillie',
  'Lisia',
  'Liza',
  'Looker',
  'Lorelei',
  'Lt. Surge',
  'Lucas',
  'Lucian',
  'Lucy',
  'Lusamine',
  'Lyra',
  'Lysandre',
  'Mallow',
  'Marley',
  'Marlon',
  'Marnie',
  'Marshal',
  'Maxie',
  'May',
  'Maylene',
  'Mina',
  'Misty',
  'Molayne',
  'Morty',
  'N',
  'Nanu',
  'Naomi',
  'Nate',
  'Nessa',
  'Nita',
  'Noland',
  'Norman',
  'Olivia',
  'Phoebe',
  'Piers',
  'Plumeria',
  'Professor Kukui',
  'Professor Oak',
  'Professor Sycamore',
  'Pryce',
  'Rachel',
  'Raihan',
  'Ramos',
  'Red',
  'Roark',
  'Rosa',
  'Roxanne',
  'Roxie',
  'Sabrina',
  'Sawyer',
  'Selene',
  'Serena',
  'Shauntal',
  'Sidney',
  'Siebold',
  'Silver',
  'Skyla',
  'Sonia',
  'Sophocles',
  'Steven',
  'Tate',
  'The Masked Royal',
  'Thorton',
  'Valerie',
  'Viola',
  'Volkner',
  'Wallace',
  'Wally',
  'Whitney',
  'Wikstrom',
  'Will',
  'Winona',
  'Wulfric',
  'Zinnia',
];
