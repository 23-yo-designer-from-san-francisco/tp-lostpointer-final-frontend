export interface CardModel {
    id?: number;
    name?: string;
    done?: boolean;
    imgUrl?: string;
    schedule_id?: number;
}

export interface ApiRequestParams {
    data?: any;
}
