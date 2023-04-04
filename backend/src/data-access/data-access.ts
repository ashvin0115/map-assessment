import * as admin from 'firebase-admin';

export const getData = (url: string) => {
  return admin.database().ref(url);
};
