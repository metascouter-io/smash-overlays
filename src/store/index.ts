import {
  createStore,
  Dispatch as IDispatch
} from 'redux';
import { useDispatch } from 'react-redux';
import rootReducer from './reducers';


export const useDispatcher = () => {
  const dispatch = useDispatch();
  return (dispatcher: (dispatch: IDispatch) => void) => {
    dispatcher(dispatch);
  }
}

export default createStore(rootReducer);
