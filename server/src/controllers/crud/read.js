import sequelize from '../../models';
const { Inquiry } = sequelize;

const readPost = (req, res, next) => {
  return async schema => {
    try {
      console.log('readPost');
      const { id } = req.params;

      const redirectUrl = req.originalUrl
        .match(/\/[a-z]+\/[a-z]+/g)
        .join('');

      const post = await schema.findOne({
        where: { id },
      });

      // req.originalUrl 로 대체가 가능해 보임
      res.render(`import${redirectUrl}`, {post});
    } catch (err) {
      console.log('acquisitionPost Error');
      console.error(err);
      next(err);
    }
  };
}

export default readPost;