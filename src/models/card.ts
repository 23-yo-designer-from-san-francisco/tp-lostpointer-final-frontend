import { Model } from './model';
import request from '../services/request';

export interface ICard {
    id?: number;
    name?: string;
    done?: boolean;
    imgUrl?: string;
}

export class CardModel extends Model<ICard>{
  constructor(props: ICard) {
    super(props);
  }

  static async getCards() {
    const response = await request.get('cards');
    let cards: Array<CardModel> = [];
    if (response?.status === 200) {
      cards = response || [];
    }
    return cards;
  }
}
