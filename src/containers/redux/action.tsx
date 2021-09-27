import { createActions } from "redux-actions";
const actions = createActions({
  ON_LOADING_ACTION: null,
  OFF_LOADING_ACTION: null,
  SET_STATUS_SIDEBAR_ACTION: null,
});
export const { onLoadingAction, offLoadingAction, setStatusSidebarAction } = actions;
