import { schema } from 'normalizr';

const species = new schema.Entity('species');
const team = new schema.Entity('team');

export const forests = new schema.Entity(
  'forests',
  {
    species: [ species ],
    team: [ team ]
  }
);
export const forestsArray = [ forests ];

export const trees = new schema.Entity('trees');
export const treesArray = [ trees ];

const patrons = new schema.Entity('patrons', {}, {idAttribute: 'rank'});
export const patronsResponse = new schema.Entity(
  'patronsResponse',
  {
    patrons: [ patrons ]
  },
  {
    idAttribute: 'forest'
  }
);
