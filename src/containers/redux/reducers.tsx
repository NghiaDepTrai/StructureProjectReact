import { handleActions } from "redux-actions";
import { offLoadingAction, onLoadingAction, setStatusSidebarAction } from "./action";

export default handleActions<any>(
  {
    [onLoadingAction.toString()]: (state) => ({ ...state, isLoading: true }),
    [offLoadingAction.toString()]: (state) => ({ ...state, isLoading: false }),
    [setStatusSidebarAction.toString()]: (state, action) => ({ ...state, isOpenSidebar: action.payload }),
  },
  {
    isLoading: false,
    isOpenSidebar: true,
  }
);
