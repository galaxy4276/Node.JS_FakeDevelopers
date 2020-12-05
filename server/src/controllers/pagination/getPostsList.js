import { reqValidAndDefault } from '../index';
import sequelize from '../../models';
const { Inquiry } = sequelize;


const getPostsList = (req, res, next) => {
  console.log('getPostList');

  return async (schema) => { // 스키마를 인자로 받아 limit&page 에 해당하는 json 데이터를 반환
    try {
      const limit = reqValidAndDefault(req.query.limit, 15);
      const page = reqValidAndDefault(req.query.page, 1);
      const offset = limit * (page - 1);

      const posts = await schema.findAll({
        include: [{
          model: Inquiry,
          attributes: ['count'],
        }],
        offset,
        limit,
        order: [['id', 'DESC']],
      });

      return res.status(200).json({
        postsList: posts 
      });
    } catch (err) {
      console.log('/board GET Error');
      console.error(err);
      res.status(404).send('데이터를 찾을 수 없습니다.');
      next(err);
    }
  };
}

export default getPostsList;