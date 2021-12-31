import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Deta } = require('deta');

const deta = Deta('c0n3pup7_D4aKMCt5wDckurk9wJrk2RB5tgnwhww7'); // configure your Deta project
const db = deta.Base('testdb'); // access your DB

export const createDoc = async (req, res) => {
  const { data } = req.body;
  //console.log(req.body);
  console.log(data);
  const insertedDoc = await db.put(data);
  //console.log(insertedDoc);
};
