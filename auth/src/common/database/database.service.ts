import { Injectable, Logger } from '@nestjs/common';
import path from 'path';
import * as fs from 'fs';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  public readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'wastematch',
    });

    this.pool.on('connect', () => {
      this.logger.log('Connected to PostgreSQL database');
    });

    this.pool.on('error', (err) => {
      this.logger.error('Unexpected error on idle PostgreSQL client', err);
    });
  }

  async query(text: string, params?: any[]) {
    return this.pool.query(text, params);
  }

  async onModuleInit() {
    try {
      this.logger.log('Initializing PostgreSQL connection and schema...');

      await this.pool.query('SELECT NOW()');
      this.logger.log('Connected to PostgreSQL database successfully');

      const schemaPath = path.join(
        process.cwd(),
        'src',
        'common',
        'database',
        'schema.sql',
      );

      if (fs.existsSync(schemaPath)) {
        const sql = fs.readFileSync(schemaPath, 'utf8');
        await this.pool.query(sql);
        this.logger.log(
          'Database tables verified/created successfully from schema.sql',
        );
      } else {
        this.logger.warn(`Schema file not found at: ${schemaPath}`);
      }
    } catch (err) {
      this.logger.error(
        'Failed to connect to database or initialize schema',
        err,
      );
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
