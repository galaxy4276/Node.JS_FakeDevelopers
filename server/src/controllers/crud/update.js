const updatePost = (req, res, next) => {
  console.log(req.body);
  return async schema => {
    try {
      const {id} = req.params;
      const {title, content} = req.body;
      console.log(`title: ${title}`);

      const redirectUrl = req.originalUrl
        .match(/\/[a-z]+\/\w+\/\w+/g)
        .join('');

      console.log(`redirectUrl: ${redirectUrl}`);

      await schema.update({
        title,
        content,
      }, {
        where: { id }
      });

      // const post = await schema.findOne({
      //   where: {id},
      //   // need add Comments
      // });
      //
      // console.log(post);
      //
      // post.title = title;
      // post.content = content;
      // await post.save();

      res.redirect(redirectUrl);
    } catch (err) {
      console.log('updatePost Error');
      console.error(err);
      next(err);
    }
  };
}

export default updatePost;