import * as at from '../constants/ActionTypes';

import {PatientInfo} from '../constants/DateTypes';
import { pa_newPatientInfo } from '../actions/patient';

import _ from 'lodash';

type State = {
	patientInfoList: Array<PatientInfo>,
	selPatientInfo: PatientInfo,
}

const initialState: State = {
	patientInfoList: [],
	selPatientInfo: null,
};

function newPatientInfo(): PatientInfo {
	return {
		key: _.uniqueId(),
		base: {
			id: '',
			name: '',
			age: 0,
			firstDiagnose: '无',
			lastDiagnose: '无',
			cardId: '',
			phone: '',
			birthDate: '',
			diagnose: '',
			nation: '',
			occupation: '',
			smoking: false,
			firstMlAage: 0,
			pregnantTimes: 0,
			produceChildTimes: 0,
			abortionTimes: 0,
			familyHistory: '',
			mlBleeding: false,
			contraceptionWay: '',
			other: '',
		}
	}
}

export default function (state :State = initialState, action: any) {
	const {payload ={}, error, meta={}, type} = action;

	switch (action.type) {

		case at.PA_NEW_PATIENT_INFO:
			return {
				...state,
				selPatientInfo: newPatientInfo(),
			}
		case at.PA_EDIT_SEL_PATIENT_BASE:
			const {selPatientInfo} = state;
			const {base} = selPatientInfo;
			return {
				...state,
				selPatientInfo: {
					// ...selPatientInfo,
					base: {
						...base,
						...payload,
					}
				}
			}
		default :
			return state;
	}
}
