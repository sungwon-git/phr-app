import produce from "immer";

const initialState = {
	document: null,
};

const documentReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_DOCUMENT": {
			// console.log("doc Reducer", action.payload);
			const { document } = action.payload;

			return produce(state, (draft) => {
				draft.document = document;
			});
		}

		default: {
			return state;
		}
	}
};

export default documentReducer;
