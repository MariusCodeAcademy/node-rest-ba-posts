const { ObjectId } = require('mongodb');
const dbClient = require('../db');
const { successResponce, failResponce } = require('../helper/dbHelpers');

async function postSingle(req, res) {
  try {
    const userObjectId = new ObjectId(req.params.postId);
    // 1 prisijungti prie db
    const connection = await dbClient.connect();
    // 2 atlikti veiksmus (gauti duomenis/ irasyt)
    const data = await connection.db('rest').collection('posts').findOne({ _id: userObjectId });
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
      .db('rest')
      .collection('posts')
      .deleteOne({ _id: ObjectId(authorId) });
    await dbClient.close();
    successResponce(res, deleteResult);
    // return deleteResult;
  } catch (error) {
    failResponce(res);
    console.warn('error in deletePost', error);
  }
}

async function updatePost(req, res) {
  try {
    const { postId } = req.params;
    const { body } = req;
    // if (!postId || !authorId) throw new Error('bookId, authorId nepaduoti');
    await dbClient.connect();
    const filter = { _id: ObjectId(postId) };
    const updateDoc = { $set: { ...body } };
    // jei nera tokios property jis sukuria
    const options = { upsert: false };
    const updateResult = await dbClient.db('rest').collection('posts').updateOne(filter, updateDoc, options);

    await dbClient.close();
    successResponce(res, updateResult);
    // return updateResult;
  } catch (error) {
    console.warn('getAllBooksBb function error', error);
    failResponce(res);
  }
}

module.exports = {
  postIndex,
  addPost,
  deletePost,
  updatePost,
  postSingle,
};
