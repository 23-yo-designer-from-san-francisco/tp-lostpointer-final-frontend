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

export interface ScheduleModel {
    cards: number;
    child_id: number;
    duration?: number;
    favourite: boolean;
    id: number;
    name: string;
}
