import * as at from '../constants/ActionTypes';

import {PatientInfo, PatientOutPatientInfo, PatientColposcopy, 
	PatientTreat} from '../constants/DateTypes';
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
		},
		outPatientInfoList: [],
	}
}

function newOutPatientInfo(): PatientOutPatientInfo {
	return {
		date: '',
		cytology_date: '',
		cytology_from: '',
		cytology_report: '',

		HPV_date: '',
		HPV_from: '',
		HPV_report: '',

		imaging_date: '',
		imaging_from: '',
		imaging_report: '',
		imaging_id: '',

		histology_date: '',
		histology_from: '',
		histology_report: '',
		histology_id: '',

		colposcopy: newColposcopy();
		treat: newTreat();
	};
}

function newColposcopy(): PatientColposcopy {
	return {
		date: '',
		cervixExpose: '',
		conversionAreaType: '',
		vinegarWhite: '',
		glandCleft: '',
		vessel: '',
		inlay: '',
		unusualVessel: '',
		iodine: '',
		vagina: '',
		vulva: '',
		microscopicImage: '',
	};
}

function newTreat(): PatientTreat {
	return {
		date: '',
		laser_place: '',
		laser_area: '',
		laser_other: '',
		LEEP_1_length: 0,
		LEEP_1_diameter: 0,
		LEEP_1_thickness: 0,
		LEEP_2: '',
		LEEP_other: '',
		other: '',
	};
}

export default function (state :State = initialState, action: any) {
	const {payload ={}, error, meta={}, type} = action;

	switch (action.type) {

		case at.PA_NEW_PATIENT_INFO:
			return {
				...state,
				selPatientInfo: newPatientInfo(),
			}
		case at.PA_SEL_PATIENT_EDIT_BASE:
			const {selPatientInfo} = state;
			const {base} = selPatientInfo;
			return {
				...state,
				selPatientInfo: {
					...selPatientInfo,
					base: {
						...base,
						...payload,
					}
				}
			}

		case at.PA_SEL_PATIENT_ADD_RECORD:
			const {selPatientInfo} = state;
			const {outPatientInfoList} = selPatientInfo;
			// const ol = [
			// 	...outPatientInfoList,
			// 	newOutPatientInfo(),
			// ];
			return {
				...state,
				outPatientInfoList: [
					...outPatientInfoList,
					newOutPatientInfo(),
				],
			};

		case at.PA_SEL_PATIENT_DEL_RECORD:
			const {index} = payload;
			const {selPatientInfo} = state;
			const {outPatientInfoList} = selPatientInfo;
			outPatientInfoList.splice(index, 1);
			// const ol = [
			// 	...outPatientInfoList,
			// 	newOutPatientInfo(),
			// ];
			return {
				...state,
				outPatientInfoList: [
					...outPatientInfoList,
				],
			};
		case at.PA_SEL_PATIENT_EDIT_OUT_PATIENT:
			const {modify, index} = payload;
			const {selPatientInfo} = state;
			const {outPatientInfoList} = selPatientInfo;
			let outPatientInfo = outPatientInfoList[index];
			const newOutPatientInfoList = [...outPatientInfoList];
			outPatientInfo = {
				...outPatientInfo,
				...modify,
			};
			newOutPatientInfoList[index] = outPatientInfo;
			return {
				...state,
				selPatientInfo: {
					...selPatientInfo,
					outPatientInfoList: newOutPatientInfoList,
				},
			}

		case at.PA_SEL_PATIENT_EDIT_COLPOSCOPY:
			const {modify, index} = payload;
			const {selPatientInfo} = state;
			const {outPatientInfoList} = selPatientInfo;
			let outPatientInfo = outPatientInfoList[index];
			const newOutPatientInfoList = [...outPatientInfoList];
			outPatientInfo = {
				...outPatientInfo,
			};
			outPatientInfo.colposcopy = {
				...outPatientInfo.colposcopy,
				modify,
			};
			newOutPatientInfoList[index] = outPatientInfo;
			return {
				...state,
				selPatientInfo: {
					...selPatientInfo,
					outPatientInfoList: newOutPatientInfoList,
				},
			}
		case at.PA_SEL_PATIENT_EDIT_TREAT:
			const {modify, index} = payload;
			const {selPatientInfo} = state;
			const {outPatientInfoList} = selPatientInfo;
			let outPatientInfo = outPatientInfoList[index];
			const newOutPatientInfoList = [...outPatientInfoList];
			outPatientInfo = {
				...outPatientInfo,
			};
			outPatientInfo.treat = {
				...outPatientInfo.treat,
				modify,
			};
			newOutPatientInfoList[index] = outPatientInfo;
			return {
				...state,
				selPatientInfo: {
					...selPatientInfo,
					outPatientInfoList: newOutPatientInfoList,
				},
			}




		default :
			return state;
	}
}
