import React from 'react';
import { ApiRequestParams } from './Interfaces';

export interface AppContextProps {
    updatePanel: (panel: string, data: any) => void;
    apiRequest: (method: string, params?: ApiRequestParams) => Promise<any>;
}

// @ts-ignore @TODO=Узнать, как сделать нормально контекст
export const AppContext = React.createContext<AppContextProps>({});
