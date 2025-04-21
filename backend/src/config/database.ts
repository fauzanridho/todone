// backend/src/config/database.ts
import { Sequelize } from 'sequelize';
import { DATABASE_URL, NODE_ENV } from './env';

// Konfigurasi koneksi database
const sequelize = new Sequelize(DATABASE_URL!, {
  dialect: 'postgres',
  logging: NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // Opsi tambahan untuk koneksi yang aman
  dialectOptions: NODE_ENV === 'production' ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
});

export default sequelize;