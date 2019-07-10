import { delay } from './';

export const calc02 = (parentId, params) => {
  return delay(300).then(() => {
    if (!parentId) {
      return firstStep;
    }

    if (parentId === 101) {
      return step101;
    }

    if (parentId === 102) {
      return step102;
    }

    if (parentId === 1021) {
      return step1021;
    }

    if (parentId === 10211) {
      if (Number(params.value) === 100) {
        throw new Error('There was a problem calculating the values.');
      }

      if (isNaN(params.value)) {
        throw new Error('Please type a number.');
      }

      return {
        carbon: params.value / 9.5
      };
    }

    throw new Error('Invalid option. Please choose another one.');
  });
};

const firstStep = {
  id: 1,
  final: false,
  type: 'list',
  pretext: 'I want to add my',
  postext: '.',
  breakAfter: true,
  options: [
    {
      next_step_id: 101,
      type: 'list_element',
      name: 'Electric bill',
      image: 'url(""/reforestum...electric_bill.png"")',
      value: 'Electric bill'
    },
    {
      next_step_id: 102,
      type: 'list_element',
      name: 'Taxi ride',
      image: 'url(""/reforestu..../taxi_ride.png"")',
      value: 'Taxi ride'
    },
    {
      next_step_id : 12345,
      type: 'list_element',
      name: 'Plane trip',
      image: 'url(""/reforestu..../taxi_ride.png"")',
      value: 'Plane trip'
    },
  ]
};

const step101 = {
  id: 101,
  final: false,
  type: 'list',
  pretext: 'My bill was',
  breakAfter: false,
  options: [
    {
      next_step_id: 2345,
      type: 'list_element',
      name: 'Something',
      image: 'url(""/reforestum...fuel_powered.png"")',
      value: 'Something'
    },
    {
      next_step_id: 5758,
      type: 'list_element',
      name: 'Something else',
      image: 'url(""/reforestum...electric_powered.png"")',
      value: 'Something else'
    }
  ]
};

const step102 = {
  id: 102,
  final: false,
  type: 'list',
  pretext: 'The car was',
  breakAfter: false,
  options: [
    {
      next_step_id: 1021,
      type: 'list_element',
      name: 'Gas or Diesel',
      image: 'url(""/reforestum...fuel_powered.png"")',
      value: 'Gas or Diesel'
    },
    {
      next_step_id: 1022,
      type: 'list_element',
      name: 'Electric',
      image: 'url(""/reforestum...electric_powered.png"")',
      value: 'Electric'
    },
    {
      next_step_id: 1023,
      type: 'list_element',
      name: 'Hybrid',
      image: 'url(""/reforestum...hybrid_powered.png"")',
      value: 'Hybrid'
    },
    {
      next_step_id: 1024,
      type: 'list_element',
      name: 'I don’t know',
      image: 'url(""/reforestum...unknown.png"")',
      value: 'I don’t know'
    },
  ]
};

const step1021 = {
  id: 1021,
  final: true,
  type: 'input',
  pretext: 'and the trip was',
  postext: 'Kms long.',
  breakAfter: true,
  options: [
    {
      next_step_id: 10211,
      type: 'integer',
      placeholder: '10',
      name: 'kilometres',
    }
  ]
};
