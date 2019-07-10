import { delay } from './';
import { fakeUser } from './auth';

export const update = () => {
  return delay(2000).then(() => {
    if (Math.random() < 0.5) {
      throw new Error('Something went wrong!');
    }

    return {
      token: 'thisisatoken',
      user: fakeUser
    };
  });
};

export const updatePassword = (oldPassword, newPassword) => {
  return delay(300).then(() => {
    if (oldPassword !== 'password') {
      throw new Error('Password wrong!');
    }

    if (newPassword === 'teste') {
      throw new Error('Password too weak!');
    }

    return {
      status: 200,
    };
  });
};
