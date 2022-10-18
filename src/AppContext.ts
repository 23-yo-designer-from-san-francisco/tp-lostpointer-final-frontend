import React from 'react';

export interface AppContextProps {
    updatePanel: (panel: string, data: any) => void;
    getPanelData: (panel: string) => any;
}

// @ts-ignore @TODO=Узнать, как сделать нормально контекст
export const AppContext = React.createContext<AppContextProps>({});
