import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './card';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Card.name,
                schema: CardSchema
            }
        ])
    ],
    exports: [],
    controllers: [CardsController],
    providers: [CardsService]
})
export class CardsModule {}
