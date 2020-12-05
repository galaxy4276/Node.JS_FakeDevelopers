const deletePost = (req, res, next) => {
  const redirectUrl = '/' + req.originalUrl
    .match(/[a-z]+\/[a-z]+/g)
    .join('');

  return async schema => {
    try {
      const { id } = req.params;
      const post = await schema.findOne({
        where: { id },
      });

      await post.destroy();

      res.redirect(redirectUrl);
    } catch (e) {
      console.log('Error of post remove.😥');
      console.log(e);
      next(e);
    }
  };
}

export default deletePost;
