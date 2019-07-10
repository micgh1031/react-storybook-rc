import { schema } from 'normalizr';

const options = new schema.Entity(
  'options',
  {},
  { idAttribute: `name` }
);

export const steps = new schema.Entity(
  'steps',
  { children: [ options ] },
  { idAttribute: 'id' }
);
