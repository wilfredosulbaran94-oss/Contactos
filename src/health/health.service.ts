import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async check() {
    const status = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'unknown',
    };

    try {
      // Check database connection
      await this.dataSource.query('SELECT 1');
      status.database = 'connected';
    } catch (error) {
      status.database = 'disconnected';
      status.status = 'error';
    }

    return status;
  }
}

