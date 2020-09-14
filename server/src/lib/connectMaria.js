import { sequelize } from '../models';
import fs from 'fs';


const connectMaria = () => {
  sequelize.sync()
    .then(() => console.log('Server has connected GCP MariaDB Server'))
    .catch((e) => console.log('DB Failed! ', e));
}


export default connectMaria;