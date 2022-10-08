import React from 'react';

export interface AppContextProps {
    updatePanel?: (panel: string, data: any) => void;
}

export const AppContext = React.createContext<AppContextProps>({});
