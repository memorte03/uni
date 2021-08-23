export type ActionType = 'ADD' | 'DELETE' | 'UPDATE';

export type ReducerActionType = {
  type: ActionType;
  id: string;
  code: string;
  description: string;
};

export type FileType = {
  id: string;
  initialName: string | null;
  name: string;
  code: string;
  isDeleted?: boolean;
};

export type ReducerStateType = Array<{
  id: string;
  name: string;
  code: string;
}>;

export type SubmitHandlerProps = {
  files?: Array<FileType>;
  description?: {};
  isPublic?: boolean;
};
