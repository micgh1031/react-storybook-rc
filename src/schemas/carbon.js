import { schema } from 'normalizr';

export const carbonSource = new schema.Entity(
  'carbonSources',
  {},
  { idAttribute: 'id' }
);

export const carbonSourcesArray = [ carbonSource ];
