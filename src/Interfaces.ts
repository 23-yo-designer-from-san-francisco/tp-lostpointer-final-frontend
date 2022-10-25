export interface CardModel {
    id?: string;
    name?: string;
    startTime?: string;
    endTime?: string;
    done?: boolean;
    imgUrl?: string;
    orderPlace?: number;
    schedule_id?: number;
}

export interface ApiRequestParams {
    data?: any;
}
