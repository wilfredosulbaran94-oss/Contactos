import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsModule } from './contacts/contacts.module';
import { Contact } from './contacts/entities/contact.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'contacts.db',
      entities: [Contact],
      synchronize: true, // Only for development - creates tables automatically
    }),
    ContactsModule,
  ],
})
export class AppModule {}

