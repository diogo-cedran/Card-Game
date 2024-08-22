import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './cards/cards.module';
import * as dotenv from 'dotenv'
dotenv.config();
const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

@Module({
  imports: [MongooseModule.forRoot(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`), 
  CardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
