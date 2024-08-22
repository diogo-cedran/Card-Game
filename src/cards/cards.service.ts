import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './card';
import { Model } from 'mongoose';
import { CardInterface } from './card.interface';
import * as fs from 'fs';
import * as path from 'path';

const cardsCreated: CardInterface[] = [];

@Injectable()
export class CardsService {
    constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}

    async getAllCards(): Promise<Card[]> {
        try {
            return await this.cardModel.find().exec();
        } catch (err) {
            throw new err;
        }
    }

    async create(card: Card | CardInterface): Promise<Card> {
        try {
            const cardCreated = new this.cardModel(card);
            return await cardCreated.save();
        } catch (err) {
            throw new err;
        }
    }

    async getCardById(id: string): Promise<Card> {
        try {
            return await this.cardModel.findById(id).exec();
        } catch (err) {
            throw new err;
        }
    }

    async getByName(name: string): Promise<Card[]> {
        try {
            return await this.cardModel.find({
                name: { $regex: name, $options: 'i'},
            }).exec();
        } catch (err) {
            throw new err;
        }
    }

    async update(id: string, card: Card): Promise<Card> {
        try {
            return await this.cardModel.findByIdAndUpdate(id, card).exec();
        } catch (err) {
            throw new err;
        }
    }

    async delete(id: string) {
        try {
            const cardDeleted = this.cardModel.findOneAndDelete({ _id: id }).exec();
            return await cardDeleted;
        } catch (err) {
            throw new err;
        }
    }
    
    async deleteAll(){
        try {
            await this.cardModel.deleteMany();
        } catch (err) {
            throw new err;
        }
    }

    async allCards(color: string) {
        try {
            const response = await fetch(`https://api.scryfall.com/cards/search?q=c%3A${color}&unique%3Dcards`);
            const responseData = await response.json()
            const data = await responseData.data.slice(0, 99);
            for (const card of data) {
                let colors = card.color_identity.map((color) => color);
                let cardsAll: CardInterface = {
                    name: card.name,
                    description: card.oracle_text,
                    colors: colors,
                    type: card.type_line,
                    mana: card.mana_cost,
                    power: card.power,
                    toughness: card.toughness
                }
                const cardCreated = await this.create(cardsAll);
                cardsCreated.push(cardCreated);
            }
            return cardsCreated;
        } catch (err) {
            throw new err;
        }
    }

    async createDeckByLegendary(legend: string) {
        try {
            await this.cardModel.deleteMany()
            const response = await fetch(`https://api.scryfall.com/cards/search?q=name%3A${legend}`);
            if (!response) {
                throw new Error(`HTTP error! status: ${(await response).status}`)
            }

            const responseData: any = await response.json();
            const obj: any = responseData.data[0];
            const colors = obj.color_identity.map((color) => color)

            const card: CardInterface = {
                name: obj.name,
                description: obj.oracle_text,
                colors: colors,
                type: obj.type_line,
                mana: obj.mana_cost,
                power: obj.power,
                toughness: obj.toughness
            }

            const cardLegendary = await this.create(card);
            cardsCreated.push(cardLegendary);
            const cards = await this.allCards(colors);

            fs.writeFile(path.resolve(__dirname, '..', '..', 'src', 'cards', 'deck.json'), JSON.stringify(cards, null, 2), (err) => {
                if (err) {
                    console.log('Deu erro: ' + err);
                }
            });

            return { message: "Ready Deck", statusCode: 201 }

        } catch (error) {
            console.error("Erro ao buscar carta lendária:", error);
        }
    }
}
