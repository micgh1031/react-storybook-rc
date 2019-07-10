import { delay } from './';

export const fakeUser = {
  email: 'pedro@significa.pt',
  name: 'Pedro',
  surname: 'Brandão',
  address_line: 'Some address St. 46, 1st',
  city: 'Porto',
  zip: '4000-252',
  state: 'Porto',
  country: 'Portugal',
  avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
};

export const auth = (email, password) => {
  return delay(500).then(() => {
    if (email !== 'pedro@significa.pt' || password !== 'password')
      throw new Error('Wrong email/password combination');

    return {
      token: 'thisisatoken',
      user: fakeUser
    };
  });
};

export const recover = email => {
  return delay(500).then(() => {
    if (email !== 'pedro@significa.pt')
      throw new Error('Email not found');

    return {
      status: 200
    };
  });
};

export const reset = (token, password) => {
  return delay(500).then(() => {
    if (token !== 'thisisatoken')
      throw new Error('Token is invalid. Please request a new one.');

    return {
      password
    };
  });
};

export const register = form => {
  return delay(2000).then(() => {
    if (form.email === 'pedro@significa.pt') {
      throw new Error('Email already in use.');
    }

    return {
      token: 'thisisatoken',
      user: fakeUser
    };
  });
};
