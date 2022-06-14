import produce from "immer";

const initialState = {
	organization: null,
};

const organizationReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_ORGANIZATION": {
			console.log("ORG Reducer", action.payload);
			const { organization } = action.payload;

			return produce(state, (draft) => {
				draft.organization = organization;
			});
		}

		default: {
			return state;
		}
	}
};

export default organizationReducer;
