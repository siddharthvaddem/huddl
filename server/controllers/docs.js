import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Deta } = require('deta');

const deta = Deta('c0n3pup7_D4aKMCt5wDckurk9wJrk2RB5tgnwhww7'); // configure your Deta project
const db = deta.Base('testdb'); // access your DB

export const createDoc = async (req, res) => {
  const { data } = req.body;
  //console.log(req.body);
  //console.log(data);
  const insertedDoc = await db.put(data);
  res.status(201).json(insertedDoc);
};

export const updateDoc = async (req, res) => {
  //console.log(req.body);
  const { docID, json, roomcode } = req.body;
  const toPut = { key: docID, json, roomcode };
  const newItem = await db.put(toPut);
  return res.json(toPut);
};

export const getDoc = async (req, res) => {
  // const id = '0em4ht29wvh3';
  const id = req.params.id;
  //console.log(id);

  //const { id } = req.params;
  const doc = await db.get(id);
  //const doc = data.json;
  // console.log(doc);
  if (doc) {
    res.json(doc);
  } else {
    res.status(404).json({ message: 'user not found' });
  }
};

export const deleteDoc = async (req, res) => {
  const id = req.params.id;
  await db.delete(id);
  res.json({ message: 'deleted' });
};
