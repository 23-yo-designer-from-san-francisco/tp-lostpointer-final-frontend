import React from 'react';
import { Panel } from './pages';

export interface AppContextProps {
    updatePanel: (panel: string, data: any) => void;
    getPanelData: (panel: Panel) => any;
}

// @ts-ignore @TODO=Узнать, как сделать нормально контекст
export const AppContext = React.createContext<AppContextProps>({});
