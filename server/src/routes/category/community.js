import sequelize from '../../models';
import { Op } from 'sequelize';
const { Community, Inquiry } = sequelize;

const community = require('express').Router();


// Custom Functions
const isEmpty = params => {
  return Object.keys(params).length === 0;
}

// Router & Controllers ( 차 후 분리 필요 )


community.get('/board/api', async (req, res, next) => {
  try {
    if (!isEmpty(req.query)) {
      const limit = parseInt(req.query?.limit);
      const page = parseInt(req.query?.page);
      console.log(`limit: ${limit}\npage: ${page}`);

      if ( !limit || !page ) {
        return res.status(302).send('limit 과 page를 url query로 주어야 합니다.');
      }
    
      if (limit && page) {
        const offset = limit * (page - 1);
        console.log(`offset: ${offset}`);

        const posts = await Community.findAll({
          include: [{
            model: Inquiry,
            attributes: ['count'],
          }],
          offset,
          limit,
        });

        console.log('get board posts debug');
        console.log(posts);
        return res.json(posts);
      }
    }
  } catch (err) {
    console.log('/board GET Error');
    console.error(err);
    next(err);
  };
});

community.get('/board', (req, res) => {
  res.render('import/community/board', {});
});

community.get('/donation', (req, res) => {
  res.render('import/community/donation', {});
});

community.get('/suggestion', (req, res) => {
  res.render('import/community/suggestion', {});
});


export default community;
