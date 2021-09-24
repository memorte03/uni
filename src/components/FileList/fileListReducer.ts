import { ReducerStateType } from './types';
import { v4 as uuidv4 } from 'uuid';

export const fileListReducer = (state: ReducerStateType, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE':
      return state.map((file: any) => {
        if (file.id == payload.id) {
          return {
            id: payload.id,
            name: payload.name,
            code: payload.code,
            initialName: file.initialName,
          };
        }
        return file;
      });
    case 'DELETE':
      return state
        .filter((file: any) => {
          return file.id !== payload.id || file.initialName;
        })
        .map((file: any) => {
          if (file.id == payload.id) {
            return {...file, isDeleted: true} 
          }
          return file;
        });
    case 'ADD':
      return [
        ...state,
        {
          id: uuidv4(),
          name: '',
          code: '',
          initialName: null,
        },
      ];

    default:
      return state;
  }
};
