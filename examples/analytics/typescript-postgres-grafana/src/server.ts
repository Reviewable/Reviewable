import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { Event, User } from './entities';
import { storeReviewableEvent, type ReviewableEvent } from './events';
import ormconfig from './ormconfig';

const dataSourceConfig = {
  ...ormconfig,
  // This can cause data loss if you change the entities in the ormconfig. Set
  // based on process.env.NODE_ENV if you're doing development to avoid data
  // loss.
  synchronize: true,
  entities: [Event, User],
};
const dataSource = new DataSource(dataSourceConfig);
const dataSourceReady = dataSource.initialize();
dataSourceReady.catch((err) => {
  console.error('Error during data source init:', err)
})

const app = express();
const port = 9000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Handler for the '/' route
app.post('/', async (req, res) => {
  try {
    await dataSourceReady;
    const entity = await storeReviewableEvent(dataSource, req.body as ReviewableEvent);
    console.log(`Handling event: ${entity.event}`);
    res.json(entity);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server and establish the database connection
app.listen(port, async () => {
  console.log('Server starting up');
  await dataSourceReady;
  console.log(`Server is running on port ${port}`);
});

