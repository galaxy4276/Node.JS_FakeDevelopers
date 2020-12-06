import sequelize from '../../models';
const { Inquiry, Image } = sequelize;

const readPost = (req, res, next) => {
  return async schema => {
    try {
      console.log('readPost');
      const { id } = req.params;

      const redirectUrl = req.originalUrl
        .match(/\/[a-z]+/)
        .join('');

      const post = await schema.findOne({
        where: { id },
        include: [{
          model: Image,
          attributes: ['src'],
        }, {
          model: Inquiry,
          attributes: ['count'],
        }],
      });

      console.log(JSON.stringify(post));

      // req.originalUrl 로 대체가 가능해 보임
      res.render(`import${redirectUrl}/postView`, { post, referrer: req.originalUrl });
    } catch (err) {
      console.log('acquisitionPost Error');
      console.error(err);
      next(err);
    }
  };
}

export default readPost;