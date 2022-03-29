const { ObjectId } = require('mongodb');
const dbClient = require('../db');
const { successResponce, failResponce } = require('../helper/dbHelpers');

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
      data: 'post created',
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

async function deletePost(req, res) {
  try {
    const { authorId } = req.params;
    await dbClient.connect();
    const deleteResult = await dbClient
      .db('library')
      .collection('authors')
      .deleteOne({ _id: ObjectId(authorId) });
    await dbClient.close();
    successResponce(res, deleteResult);
    // return deleteResult;
  } catch (error) {
    failResponce(res);
    console.warn('error in deleteSingleAuthorFromDb', error);
    return false;
  }
}

module.exports = {
  postIndex,
  addPost,
  deletePost,
};
