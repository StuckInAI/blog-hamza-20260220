import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from '@/entities/Post';

const databasePath = process.env.DATABASE_PATH || './database.sqlite';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: databasePath,
  synchronize: true, // Automatically sync schema with database (use migrations in production)
  logging: false,
  entities: [Post],
  migrations: [],
  subscribers: [],
});

let connection: DataSource | null = null;

export async function getDatabaseConnection(): Promise<DataSource> {
  if (!connection || !connection.isInitialized) {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    connection = AppDataSource;
  }
  return connection;
}
