import {createAction} from 'redux-actions';
import * as at from '../constants/ActionTypes';

export const pa_getPatientList = createAction(at.PA_GET_PATIENT_LIST, () => {
	return {
		// id: new Date().getTime(),
		type: 'Loading',
        loading: {
        },
	};
});