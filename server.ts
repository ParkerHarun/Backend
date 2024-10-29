import express, { Request, Response } from 'express';
import config from './config/config';
import path from 'path';
import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {  // use `isMaster` if Node.js version is below 16.x
  console.log(`Primary process ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker exit events
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Forking a new worker...');
    cluster.fork();  // Restart a new worker
  });

} else {
  // Worker processes
  const app = express();
  const PORT = config.PORT || 3000;

  // Middleware
  app.use(express.json());

  // Handle 404 errors by sending a custom 404.html file
  app.get('*', (req: Request, res: Response) => {
    res.status(404).sendFile(path.join(__dirname, 'view', '404.html'));
  });

  // Start the server on the specified port
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} running on port ${PORT}`);
  });
}
