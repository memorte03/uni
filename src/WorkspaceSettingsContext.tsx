import React, { createContext, useState, useContext } from 'react';

const WorkspaceSettingsContext = createContext<WorkspaceSettingsTypes | null>(null);
const SetWorkspaceSettingsContext = createContext<React.Dispatch<
    React.SetStateAction<WorkspaceSettingsTypes>
> | null>(null);

const defaultWorkspaceSettings: WorkspaceSettingsTypes = {
    SCALE_BREAKPOINTS: [25,50,75,90,100,110,125,150,175,200,250,300],
    scale: 100,
};

export type WorkspaceSettingsTypes = {
    SCALE_BREAKPOINTS: Array<number>;
    scale: number;
};

export const useWorkspaceSettings = (): [
    WorkspaceSettingsTypes,
    React.Dispatch<React.SetStateAction<WorkspaceSettingsTypes>>
] => {
    return [
        useContext(WorkspaceSettingsContext) as WorkspaceSettingsTypes,
        useContext(SetWorkspaceSettingsContext) as React.Dispatch<
            React.SetStateAction<WorkspaceSettingsTypes>
        >,
    ];
};

const WorkspaceSettingsProvider: React.FunctionComponent = (props) => {
    const [workspaceSettings, setWorkspaceSettings] = useState<WorkspaceSettingsTypes>(
        defaultWorkspaceSettings
    );

    return (
        <WorkspaceSettingsContext.Provider value={workspaceSettings}>
            <SetWorkspaceSettingsContext.Provider value={setWorkspaceSettings}>
                {props.children}
            </SetWorkspaceSettingsContext.Provider>
        </WorkspaceSettingsContext.Provider>
    );
};

export default WorkspaceSettingsProvider;
