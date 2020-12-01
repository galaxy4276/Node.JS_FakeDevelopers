import faker from 'faker';

export const createBulkBoard = async schema => {
  const count = Math.floor(Math.random() * 60 + 90);
  console.log(faker.lorem.sentence().slice(0, 20));
  console.log(faker.lorem.paragraph());

  try {
    for (let i = 0; i < count; i++) {
      await schema.create({
        title: faker.lorem.sentence().slice(0, 20),
        content: faker.lorem.paragraph(),
      }); 
    }
  } catch (err) {
    console.error('createBulkBoard Error', err);
  };
};
