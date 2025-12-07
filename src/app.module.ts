import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsModule } from './contacts/contacts.module';
import { HealthModule } from './health/health.module';
import { Contact } from './contacts/entities/contact.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || 'contacts.db',
      entities: [Contact],
      synchronize: true, // Only for development - creates tables automatically
    }),
    ContactsModule,
    HealthModule,
  ],
})
export class AppModule {}

