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

export const pa_savePatientInfo = createAction(at.PA_SEL_PATIENT_SAVE, () => {
	return {
	};
});

export const pa_newPatientInfo = createAction(at.PA_NEW_PATIENT_INFO, () => {
	return {
	};
});

export const pa_editSelPatientBase = createAction(at.PA_SEL_PATIENT_EDIT_BASE, (data) => {
	return data;
});

export const pa_addSelPatientRecord = createAction(at.PA_SEL_PATIENT_ADD_RECORD, () => {
	return {
	};
});

export const pa_delSelPatientRecord = createAction(at.PA_SEL_PATIENT_DEL_RECORD, () => {
	return {
	};
});


export const pa_editSelPatientOutPatient = createAction(at.PA_SEL_PATIENT_EDIT_OUT_PATIENT, (data) => {
	return data;
});

export const pa_editSelPatientColposcopy = createAction(at.PA_SEL_PATIENT_EDIT_COLPOSCOPY, (data) => {
	return data;
});

export const pa_editSelPatientTreat = createAction(at.PA_SEL_PATIENT_EDIT_TREAT, (data) => {
	return data;
});

