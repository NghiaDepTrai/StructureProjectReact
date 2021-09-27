import { connectRouter, routerMiddleware } from "connected-react-router";
import commonReducer from "containers/redux/reducers";
import { createBrowserHistory, History } from "history";
import { applyMiddleware, CombinedState, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger, LogEntryObject } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const allReducers = {
  common: commonReducer,
};
class ConfigureStore {
  public history: History = createBrowserHistory();

  public setup = () => {
    /** add middlewares */
    const middlewares: any = [];
    middlewares.push(routerMiddleware(this.history));
    if (process.env.NODE_ENV === "development") {
      const logger = createLogger({
        diff: true,
        collapsed: (_getState: any, _action: any, logEntry: LogEntryObject | undefined) => !logEntry?.error,
      });
      middlewares.push(logger);
    }
    const appMiddleware = composeWithDevTools(applyMiddleware(...middlewares));

    /** config root reducer */
    const allCombineReducers = combineReducers({
      ...allReducers,
      router: connectRouter(this.history),
    });
    const resettableAppReducer = (state: CombinedState<any>, action: any) => allCombineReducers(state, action);

    /** config redux-persist */
    const persistConfig = {
      key: "root",
      storage,
      whitelist: ["sidebar"],
      blacklist: ["router"],
    };
    const persistedReducer = persistReducer(persistConfig, resettableAppReducer);
    const store = createStore(persistedReducer, appMiddleware);
    const persistor = persistStore(store);
    return { store, persistor };
  };
}

export default new ConfigureStore();
