import sequelize from './';

const { User } = sequelize;

async function createBulkUsers() {
  let id = 1;
  const password = 'thisUserisTest';

  for (let i = 0; i < 100; i++) {
    await User.create({ id, password });
    id++;
  }
}

export default createBulkUsers; 