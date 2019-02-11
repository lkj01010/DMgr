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

export const pa_savePatientInfo = createAction(at.PA_SAVE_PATIENT_INFO, () => {
	return {
	};
});

export const pa_newPatientInfo = createAction(at.PA_NEW_PATIENT_INFO, () => {
	return {
	};
});

export const pa_editSelPatientBase = createAction(at.PA_EDIT_SEL_PATIENT_BASE, (data) => {
	return data;
})