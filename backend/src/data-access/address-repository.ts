import { getData } from './data-access';

export async function getAddress() {
  const collectionsRef = 'addresses';
  return new Promise((resolve, reject) => {
    getData(collectionsRef)
      .ref
      .get()
      .then((data: any) => {
        resolve(data.toJSON());
      })
      .catch((error: any) => {
        console.error(error);
        reject(error);
      });
  });
}
