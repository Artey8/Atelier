const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
const resetDB = require('./resetDB');
const populateDB = require('./populateDB');
const setAutoIncrementStart = require('./setAutoIncrementStart');
const buildIndexes = require('./buildIndexes');

const reseedDB = async () => {
  const startTime = Date.now();
  try {
    await resetDB();
    await populateDB();
    await setAutoIncrementStart();
    await buildIndexes();
  } catch (err) {
    console.error(err);
  }
  console.log(`Time elapsed: ${(Date.now() - startTime) / 1000} seconds`);
};

readline.question(`This is a destructive operation that will delete all data from the database.
Do you want to proceed?
(y/n): `, (response) => {
  if (response === 'y') {
    reseedDB();
  }
  readline.close();
});
