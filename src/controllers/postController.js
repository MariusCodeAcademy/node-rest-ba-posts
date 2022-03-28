const dbClient = require('../db');

async function postIndex(req, res) {
  try {
    // 1 prisijungti prie db
    const connection = await dbClient.connect();
    // 2 atlikti veiksmus (gauti duomenis/ irasyt)
    const data = await connection.db('rest').collection('posts').find().toArray();
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

async function addPost(req, res) {
  const dataGotFromUser = req.body;
  console.log('dataGotFromUser ===', dataGotFromUser);

  try {
    // 1 prisijungti prie db
    const connection = await dbClient.connect();
    // 2 atlikti veiksmus (gauti duomenis/ irasyt)
    const insertOneResult = await connection.db('rest').collection('posts').insertOne(dataGotFromUser);
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
  postIndex,
  addPost,
};
