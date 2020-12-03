const getPageIdx = (res, next) => async schema => {
  try {
    const allPageIdx = await schema.findAll({
      attributes: ['id'],
    });

    res.status(200).send(allPageIdx.length);
  } catch (err) {
    console.log('allPageIdx ERROR');
    console.error(err);
    res.status(404).send('페이지 인덱스를 찾을 수 없습니다.');
    next(err);
  }
}
  