import sequelize from '../../models';
const { Comment, User, Community } = sequelize;

const addComment = (req, res, next) => {
  const { data } = req.body;
  const currentUser = req.user.id;
  const postId = req.originalUrl.match(/[0-9]+/).join('');
  console.log(`originalUrl: ${req.originalUrl}`);
  return async schema => {
    const comment = await Comment.create({
      comment: data
    });

    const user = await User.findOne({
      where: { id: currentUser }
    });

    const post = await schema.findOne({
      where: { id: postId }
    });

    await user.addComments(comment);
    await post.addComments(comment);

    const sendData = await Comment.findOne({
      where: { id: comment.id }
    });

    return res.status(201).json(sendData);
  }
}

export default addComment;