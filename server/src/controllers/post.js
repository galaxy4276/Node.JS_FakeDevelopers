import sequelize from '../models';
const { Post } = sequelize;


export const acquisitionPost = async (req, res, next) => {
  const { title, image, content } = req.body;
  const { id } = req.user;

  try {
    await Post.create({
      title,
      image,
      content,
      UserId: id,
    });
  } catch(err) {
    console.log('acquisitionPost Error');
    console.error(err);
    next(err);
  }
};