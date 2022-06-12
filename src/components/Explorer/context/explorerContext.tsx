import { createContext, useReducer } from "react";
import { DataSource } from "./datasource";

/*
    CONTEXT TYPE DEFINITIONS
*/
export type Route =
  | "ASSET"
  | "CERTIFICATES"
  | "TRACEABILITY"
  | "STATISTICS"
  | "ISSUER"
  | "QRCODE"
  | "CERTIFICATE"
  | "MOVEMENT";

type ActionType = "NAVIGATE" | "BACK";

type Page = { route: Route; id: number };

interface Context {
  dataSource: DataSource;
  routes: { history: Page[]; current: Page };
}

/*
    ACTIONS
*/
interface Action {
  type: ActionType;
}

interface Payload<T> extends Action {
  payload: T;
}

export const navigate = (id: number, route: Route): Payload<Page> => ({
  type: "NAVIGATE",
  payload: { route, id },
});

export const back = (): Action => ({ type: "BACK" });

/*
    REDUCER
*/
function reducer(state: Context, action: Action): Context {
  switch (action.type) {
    case "NAVIGATE":
      const { payload: page } = action as Payload<Page>;
      return {
        ...state,
        routes: {
          history: [...state.routes.history, state.routes.current],
          current: page,
        },
      };
    case "BACK":
      const current = state.routes.history.pop();
      if (current) return { ...state, routes: { ...state.routes, current } };
  }
  return state;
}

/*
    CONTEXT DEFINITION
*/
interface ContextReducer {
  state: Context;
  dispatch: React.Dispatch<Action>;
}

export const ExplorerContext = createContext<ContextReducer>({} as ContextReducer);

export interface ExplorerProviderProps {
  children?: React.ReactNode;
  dataSource: DataSource;
  id: number;
  route: Route;
}

/*
    CONTEXT PROVIDER
*/
export const ExplorerProvider: React.FC<ExplorerProviderProps> = ({ children, ...props }) => {
  const initialState: Context = {
    dataSource: props.dataSource,
    routes: {
      current: { id: props.id, route: props.route },
      history: [],
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ExplorerContext.Provider value={{ state, dispatch }}>{children}</ExplorerContext.Provider>
  );
};
