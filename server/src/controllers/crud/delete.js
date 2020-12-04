const deletePost = (req, res, next) => {
  return async schema => {
    try {
      const {id} = req.params;
      const post = await schema.findOne({
        where: {id},
      });

      await post.destroy();
    } catch (e) {
      console.log('Error of post remove.😥');
      console.log(e);
      next(e);
    }
  };
}

export default deletePost;
