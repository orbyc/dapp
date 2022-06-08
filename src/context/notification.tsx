import { createContext, useReducer } from "react";

/*
DEFINITIONS
*/
type NotificationType = "ERROR" | "WARNING" | "SUCCESS";

type NotificationAction = "PUSH_NOTIFICATION" | "POP_NOTIFICATION" | "REMOVE_NOTIFICATION";

interface Notification {
  type: NotificationType;
  message: string;
}

type State = Notification[];

interface IAction {
  type: NotificationAction;
}

/*
    ACTIONS
*/
interface INotificationAction extends IAction {
  payload: Notification;
}

interface IPositionAction extends IAction {
  payload: number;
}

type Action = IAction | INotificationAction | IPositionAction;

export const pushNotification = (payload: Notification): INotificationAction => ({
  type: "PUSH_NOTIFICATION",
  payload,
});

export const popNotification = (): IAction => ({
  type: "POP_NOTIFICATION",
});

export const removeNotification = (payload: number): IPositionAction => ({
  type: "REMOVE_NOTIFICATION",
  payload,
});

/*
    REDUCER
*/
const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case "PUSH_NOTIFICATION":
      const { payload: newNotification } = action as INotificationAction;
      return [...prevState, newNotification];
    case "POP_NOTIFICATION":
      prevState.pop();
      return [...prevState];
    case "REMOVE_NOTIFICATION":
      const { payload: index } = action as IPositionAction;
      prevState.splice(index, 1);
      return [...prevState];
    default:
      return prevState;
  }
};

/*
    CONTEXT
*/
interface NotificationContextDomain {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const NotificationContext = createContext({} as NotificationContextDomain);
/*
    PROVIDER
*/
interface NotificationProviderProps {
  children?: React.ReactNode;
}

export function NotificationProvider(props: NotificationProviderProps) {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  );
}
