import {
  Dispatch as IDispatch,
  Action as IAction
} from 'redux';

import rootReducer from './reducers';

export type RootState = ReturnType<typeof rootReducer>;

export interface ActionType extends IAction {
  type: string;
  payload: any;
}

export type ActionCreator<T> = (payload: T) => (dispatch: IDispatch) => void;
