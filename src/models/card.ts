import { Model } from './model';

export interface ICard {
    executed?: boolean;
    imageUrl?: string;
}

export class CardModel extends Model<ICard>{
  constructor(props: ICard) {
    super(props);
  }
}
