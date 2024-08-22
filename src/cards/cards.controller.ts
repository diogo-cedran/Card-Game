import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './card';
import { Response } from 'express';

@Controller('cards')
export class CardsController {
    constructor(
        private readonly cardsService: CardsService
    ) { }

    @Get()
    async getAllCards(): Promise<Card[]> {
        try {
            return await this.cardsService.getAllCards();
        } catch (err) {
            console.log("Error: " + err);
        }
    }

    @Post()
    async create(@Body() card: Card): Promise<Card> {
        try {
            return await this.cardsService.create(card);
        } catch (err) {
            console.log("Error: " + err);
        }
    }

    @Get(':id')
    async getCardById(@Param('id') id: string): Promise<Card> {
        try {
            return await this.cardsService.getCardById(id);
        } catch (err) {
            console.log("Error: " + err);
        }
    }

    @Get('/byName/:name')
    async getByName(@Param('name') name: string): Promise<Card[]> {
        try {
            return await this.cardsService.getByName(name);
        } catch (err) {
            console.log("Error: " + err);
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() card: Card): Promise<Card> {
        try {
            return await this.cardsService.update(id, card);
        } catch (err) {
            console.log("Error: " + err);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Card> {
        try {
            return await this.cardsService.delete(id)
        } catch (err) {
            console.log("Error: " + err);
        }
    }

    @Delete()
    async deleteAll(): Promise<void> {
        try {
            await this.cardsService.deleteAll()
        } catch (err) {
            console.log("Error: " + err);
        }
    }

    @Post('/seedingDeck/:id')
    async createDeckByLegendary(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        try {
            const result = await this.cardsService.createDeckByLegendary(id);
            return res.status(result.statusCode).send({ message: result.message });
        } catch (err) {
            console.log("Error: " + err);
        }
    }
}
