const Joi = require('joi');
const { failResponce } = require('./dbHelpers');

async function validatePost(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    author: Joi.string().min(5).max(50).required(),
    body: Joi.string().min(5).max(500).required(),
  });

  try {
    // tikrinimas ar req.body atitinka schema reikalavimus
    await schema.validateAsync(req.body, { abortEarly: false });
    next(); // keliaujam i kita middleware ar controller
  } catch (error) {
    console.log('validateUser error ===', error);
    // map
    const formatedError = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));
    failResponce(res, formatedError, 400);
  }
}

module.exports = {
  validatePost,
};
