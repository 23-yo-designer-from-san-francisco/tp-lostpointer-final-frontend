export interface CardModel {
    id?: number;
    name?: string;
    done?: boolean;
    imgUrl?: string;
    scheduleId?: number;
}

export interface ApiRequestParams {
    data?: any;
}
