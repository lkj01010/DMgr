import * as at from '../constants/ActionTypes';

type State = {
    orzTaskPending: boolean;
    orzTaskMorePending: boolean,

    detailPending: boolean,
}

const initialState = {
	orzTaskPending: false,
	orzTaskMorePending: false,

    detailPending: false,
};


export default function (state :State = initialState, action: any) {
	const { payload ={}, error, meta={}, type} = action;

	switch (action.type) {

		case at.PA_GET_PATIENT_LIST:
			return {
				...state,
				orzTaskPending: true,
			}

		default :
			return state;
	}
}
