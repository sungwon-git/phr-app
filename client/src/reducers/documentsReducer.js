import produce from "immer";

const initialState = {
	documents: null,
};

const documentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_DOCUMENTS": {
			// console.log("doc Reducer", action.payload);
			const { documents } = action.payload;

			return produce(state, (draft) => {
				draft.documents = documents;
			});
		}

		default: {
			return state;
		}
	}
};

export default documentsReducer;
