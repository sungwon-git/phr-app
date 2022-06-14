import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import accountReducer from "./accountReducer";
import notificationsReducer from "./notificationsReducer";
import chatReducer from "./chatReducer";
import mailReducer from "./mailReducer";
import kanbanReducer from "./kanbanReducer";
import organizationsReducer from "./organizationsReducer";
import organizationReducer from "./organizationReducer";
import documentsReducer from "./documentsReducer";
import documentReducer from "./documentReducer";

const rootReducer = combineReducers({
	account: accountReducer,
	notifications: notificationsReducer,
	chat: chatReducer,
	mail: mailReducer,
	kanban: kanbanReducer,
	form: formReducer,
	organizations: organizationsReducer,
	organization: organizationReducer,
	documents: documentsReducer,
	document: documentReducer,
});

export default rootReducer;
