import { Card } from './entities/card.entity';
import { Config } from './entities/config.entity';
import { CreateCardService } from './services/create-card.service';
import { GetCardsApi } from './services/get-cards-api.service';
import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForeignName } from './entities/foreign-name.entity';
import { Legality } from './entities/legality.entity';
import { Ruling } from './entities/ruling.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, Config, ForeignName, Legality, Ruling]),
  ],
  controllers: [CardsController],
  providers: [GetCardsApi, CreateCardService],
})
export class CardsModule {}
