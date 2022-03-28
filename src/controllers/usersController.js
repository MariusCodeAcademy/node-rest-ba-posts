const dbClient = require('../db');

async function usersIndex(req, res) {
  try {
    // 1 prisijungti prie db
    const connection = await dbClient.connect();
    // 2 atlikti veiksmus (gauti duomenis/ irasyt)
    const data = await connection
      .db('Test')
      .collection('Users')
      .find()
      .toArray();
    // 3 uzdaryti db prisijungima
    await connection.close();
    // 4 grazinam useriui duomenis
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong',
    });
  }
}

async function addUser(req, res) {
  const dataGotFromUser = req.body;
  console.log('dataGotFromUser ===', dataGotFromUser);

  try {
    // 1 prisijungti prie db
    const connection = await dbClient.connect();
    // 2 atlikti veiksmus (gauti duomenis/ irasyt)
    const insertOneResult = await connection
      .db('Test')
      .collection('Users')
      .insertOne(dataGotFromUser);
    // 3 uzdaryti db prisijungima
    await connection.close();
    res.json({
      success: true,
      data: 'user created',
      result: insertOneResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong',
    });
  }
}

module.exports = {
  usersIndex,
  addUser,
};
