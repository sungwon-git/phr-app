import produce from "immer";

const initialState = {
	organizations: null,
};

const organizationsReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_ORGANIZATIONS": {
			// console.log("ORG Reducer", action.payload);
			const { organizations } = action.payload;

			return produce(state, (draft) => {
				draft.organizations = organizations;
			});
		}

		default: {
			return state;
		}
	}
};

export default organizationsReducer;
