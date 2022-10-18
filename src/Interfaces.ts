export interface CardModel {
    id?: number;
    name?: string;
    done?: boolean;
    imgUrl?: string;
    scheduleId?: string;
}

export interface ApiRequestParams {
    data?: any;
}
