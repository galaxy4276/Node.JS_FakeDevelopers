import faker from 'faker';
import { reqValidAndDefault } from '../controllers/index';
import sequelize from '../models';
const { Inquiry } = sequelize;

export const createBulkBoard = (req, next) => async schema => {
  const count = reqValidAndDefault(req.query.count, 15);

  if (count > 900) {
    throw Error("생성 데이터 요청이 너무 많습니다.");
  }

  try {
    await schema.destroy({
      where: {},
    });

    for (let i = 0; i < count; i++) {
      const post= await schema.create({
        title: faker.lorem.sentence().slice(0, 20),
        content: faker.lorem.paragraph(),
      }); 

      const inquire = await Inquiry.create();
      await post.addInquiry(inquire);
    }
  } catch (err) {
    console.error('createBulkBoard Error', err);
    next(err);
  }
};
