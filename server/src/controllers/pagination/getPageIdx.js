import { reqValidAndDefault } from '../index';

const getPageIdx = (req, res, next) => async schema => {
  try {
    const limit = reqValidAndDefault(req.query.limit, 15);

    if (!limit) {
      throw Error("페이지 총 인덱스를 불러올 수 없습니다.");
    }

    const allPageIdx = await schema.findAll({
      attributes: ['id'],
    });

    const idx = Math.ceil(allPageIdx.length / limit);

    return res.status(200).json({ idx });
  } catch (err) {
    console.log('allPageIdx ERROR');
    console.error(err);
    res.status(404).send('페이지 인덱스를 찾을 수 없습니다.');
    next(err);
  }
}

export default getPageIdx;