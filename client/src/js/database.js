import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


// Put content into the database
export const putDb = async (content) => {
  console.log('PUT to the database')
// connect to the database
  const db = await openDB('jate', 1);
// create a transaction and specify permissions 
const tx = db.transaction('jate', 'readwrite');
// access the object store
const store = tx.objectStore('jate');
// add the content to the store
const request = store.put({ id: 1, value: content})
// confirm the data was added successfully
const result = await request;
console.log('data added to the database', result);
}

// Get all the content from the database
export const getDb = async () => {
  console.log('GET from the database')
  // connect to the database
  const db = await openDB('jate', 1);
  // create a transaction and specify permissions 
  const tx = db.transaction('jate', 'readonly');
  // access the object store
  const store = tx.objectStore('jate');
  // get the content from the store
  const request = store.get(1);
  // confirm the data was retrieved successfully
  const result = await request;
  console.log('data retrieved from the database', result?.value);
  return result?.value;
}


initdb();
