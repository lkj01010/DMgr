import * as at from '../constants/ActionTypes';

import {PatientInfo, PatientTreatRecord, PatientColposcopy, 
	PatientTreat} from '../constants/DateTypes';
import { pa_newPatientInfo } from '../actions/patient';

import _ from 'lodash';
import { stat } from 'fs-extra-p';

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
		key: 99999,

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
		smoking: '否',
		firstMlAge: 0,
		pregnantTimes: 0,
		produceChildTimes: 0,
		abortionTimes: 0,
		familyHistory: '',
		mlBleeding: '否',
		contraceptionWay: '',
		other: '',

		treatRecordList: [],
	}
}

function newTreatRecord(): PatientTreatRecord {
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

		colposcopy: newColposcopy(),
		treat: newTreat(),
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
		case at.PA_GET_PATIENT_LIST: {
			const {patientInfoList} = payload;
			return {
				...state,
				patientInfoList, 
			};
		}
		case at.PA_SEARCH_PATIENT: 
		case at.PA_SEL_PATIENT_SAVE: {
			const {success, patientInfoList} = payload;
			if (success) {
				return {
					...state,
					patientInfoList, 
				};
			} else {
				return state;
			}
		}
		case at.PA_NEW_PATIENT_INFO:
			return {
				...state,
				selPatientInfo: newPatientInfo(),
			}
		case at.PA_SEL_PATIENT_INFO: {
			return {
				...state,
				selPatientInfo: payload,
			}
		}
		case at.PA_DELETE_PATIENT_INFO: {
			const {selPatientInfo} = payload;
			const nextPatientInfoList = [...state.patientInfoList];
			const index = nextPatientInfoList.findIndex(p => {
				return selPatientInfo.id === p.id;
			})
			nextPatientInfoList.splice(index, 1);
			return {
				...state,
				patientInfoList: nextPatientInfoList,
			}
		}
		case at.PA_SEL_PATIENT_EDIT_BASE: {
			const {selPatientInfo} = state;
			// const {base} = selPatientInfo;
			return {
				...state,
				selPatientInfo: {
					...selPatientInfo,
					// base: {
						// ...base,
						...payload,
					// }
				}
			}
		}
		case at.PA_SEL_PATIENT_ADD_RECORD: {
			const {selPatientInfo} = state;
			const {treatRecordList} = selPatientInfo;
			// const ol = [
			// 	...treatRecordList,
			// 	newtreatRecord(),
			// ];
			return {
				...state,
				selPatientInfo: {
					...selPatientInfo,
					treatRecordList: [
						...treatRecordList,
						newTreatRecord(),
					]
				}
			};
		}
		case at.PA_SEL_PATIENT_DEL_RECORD: {
			const {index} = payload;
			const {selPatientInfo} = state;
			const {treatRecordList} = selPatientInfo;
			treatRecordList.splice(index, 1);
			// const ol = [
			// 	...treatRecordList,
			// 	newtreatRecord(),
			// ];
			return {
				...state,
				selPatientInfo: {
					...selPatientInfo,
					treatRecordList: [
						...treatRecordList,
					]
				}
			};
		}
		case at.PA_SEL_PATIENT_EDIT_TREAT_RECORD: {
			const {modify, index} = payload;
			const {selPatientInfo} = state;
			const {treatRecordList} = selPatientInfo;
			let treatRecord = treatRecordList[index];
			const newTreatRecordList = [...treatRecordList];
			treatRecord = {
				...treatRecord,
				...modify,
			};
			newTreatRecordList[index] = treatRecord;
			return {
				...state,
				selPatientInfo: {
					...selPatientInfo,
					treatRecordList: newTreatRecordList,
				},
			};
		}
		case at.PA_SEL_PATIENT_EDIT_COLPOSCOPY: {
			const {modify, index} = payload;
			const {selPatientInfo} = state;
			const {treatRecordList} = selPatientInfo;
			let treatRecord = treatRecordList[index];
			const newTreatRecordList = [...treatRecordList];
			treatRecord = {
				...treatRecord,
			};
			treatRecord.colposcopy = {
				...treatRecord.colposcopy,
				...modify,
			};
			newTreatRecordList[index] = treatRecord;
			return {
				...state,
				selPatientInfo: {
					...selPatientInfo,
					treatRecordList: newTreatRecordList,
				},
			};
		}
		case at.PA_SEL_PATIENT_EDIT_TREAT: {
			const {modify, index} = payload;
			const {selPatientInfo} = state;
			const {treatRecordList} = selPatientInfo;
			let treatRecord = treatRecordList[index];
			const newTreatRecordList = [...treatRecordList];
			treatRecord = {
				...treatRecord,
			};
			treatRecord.treat = {
				...treatRecord.treat,
				...modify,
			};
			newTreatRecordList[index] = treatRecord;
			return {
				...state,
				selPatientInfo: {
					...selPatientInfo,
					treatRecordList: newTreatRecordList,
				},
			};
		}

		default :
			return state;
	}
}
