// backend/src/app.ts
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';

const app = express();

// Konfigurasi CORS yang lebih komprehensif
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    // Izinkan request dari localhost atau tanpa origin (seperti postman)
    const allowedOrigins = [
      'http://localhost:3000', 
      'https://localhost:3000', 
      'http://127.0.0.1:3000', 
      'http://[::1]:3000'
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Access-Control-Allow-Methods', 
    'Access-Control-Allow-Origin', 
    'Access-Control-Allow-Headers'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Terapkan middleware CORS
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware logging untuk debugging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/todos', todoRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    message: 'Rute tidak ditemukan',
    path: req.path
  });
});

// Error handler
app.use((
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Terjadi kesalahan server',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;