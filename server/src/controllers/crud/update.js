const updatePost = (req, res, next) => {
  return async schema => {
    try {
      const {id} = req.params;
      const {title, content} = req.body;

      const redirectUrl = req.originalUrl
        .match(/[a-z]+\/[a-z]+/g)
        .join('');

      const post = await schema.findOne({
        where: {id},
        // need add Comments
      });

      post.title = title;
      post.content = content;
      await post.save();

      res.redirect(redirectUrl);
    } catch (err) {
      console.log('acquisitionPost Error');
      console.error(err);
      next(err);
    }
  };
}

export default updatePost;