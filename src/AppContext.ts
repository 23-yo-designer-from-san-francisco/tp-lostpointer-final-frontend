import React from 'react';

export interface AppContextProps {
    updatePanel: (panel: string, data: any) => void;
}

// @ts-ignore @TODO=Узнать, как сделать нормально контекст
export const AppContext = React.createContext<AppContextProps>({});
