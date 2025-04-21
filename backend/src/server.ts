import app from './app';
import sequelize from './config/database';
import { PORT, NODE_ENV } from './config/env';

// Sinkronisasi database dan jalankan server
const startServer = async () => {
  try {
    // Sinkronisasi model dengan database
    await sequelize.sync();
    console.log('Database tersinkronisasi.');

    // Jalankan server
    app.listen(PORT, () => {
      console.log(`Server berjalan di port ${PORT} (${NODE_ENV})`);
    });
  } catch (error) {
    console.error('Gagal memulai server:', error);
    process.exit(1);
  }
};

startServer();