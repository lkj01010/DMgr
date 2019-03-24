import {createAction} from 'redux-actions';
import * as at from '../constants/ActionTypes';

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ patients: [] })
  .write()
const dbpatients = db.get('patients');

let ret = {};

const refreshKeys = (array) => {
	for(let i = 0; i < array.length; i++) {
		array[i].key = i;
	}
}

export const pa_getPatientList = createAction(at.PA_GET_PATIENT_LIST, () => {
	var patientInfoList = dbpatients.sortBy('id').take(100).value();
	refreshKeys(patientInfoList);
	return {
		patientInfoList,
	};
});

// export const pa_savePatientInfo = ({selPatientInfo, isNew}) => {
// 	const {id} = selPatientInfo;
// 	if (isNew) {
// 		if (dbpatients.find({id}) != null) {
// 			ret = {
// 				success: false,
// 			}
// 			return {
// 				success: false,
// 			};
// 		}
// 	}
// 	dbpatients.push(selPatientInfo).write();
// 	var patientInfoList = dbpatients.take(100).value();
// 	return {
// 		success: true,
// 		patientInfoList,
// 	};
// }

export const pa_savePatientInfo = createAction(at.PA_SEL_PATIENT_SAVE, ({selPatientInfo, isNew}) => {
	const {id} = selPatientInfo;
	if (id == '') {
		ret = {success: false, msg: 'id为空'};
		return {success: false};
	}
	if (isNew) {
		if (dbpatients.find({id}).value() != null) {
			ret = {success: false, msg: 'id已存在'};
			return {success: false};
		}
		else {
			dbpatients.push(selPatientInfo).write();
		}
	} else {
		dbpatients.remove({id}).write();
		dbpatients.push(selPatientInfo).write();
	}
	var patientInfoList = dbpatients.sortBy('id').take(100).value();
	refreshKeys(patientInfoList);
	ret = {success: true, msg: '成功'};
	return {
		success: true,
		patientInfoList,
	};
}, ({retFn}) => {
	retFn(ret);
});

export const pa_searchPatient = createAction(at.PA_SEARCH_PATIENT, ({syntax}) => {
	if (syntax == undefined) {
		ret = {success: false, msg: '搜索语法错误'};
		return {
			success: false,
		};
	}
	let findRet = dbpatients.filter(syntax);
	if (findRet != null) {
		let patientInfoList = findRet.sortBy('id').take(100).value();
		if (patientInfoList.length == 0) {
			ret = {success: false, msg: '找到任何符合的结果'};
			return {
				success: false,
			}
		} else {
			refreshKeys(patientInfoList);
			ret = {success: true, msg: '成功'};
			return {
				success: true,
				patientInfoList,
			};
		}
	} else {
		ret = {success: false, msg: '搜索语法错误'};
		return {
			success: false,
		};
	};
}, ({retFn}) => {
	retFn(ret);
})

export const pa_newPatientInfo = createAction(at.PA_NEW_PATIENT_INFO, () => {
	return {
	};
});

export const pa_selPatientInfo = createAction(at.PA_SEL_PATIENT_INFO, (record) => {
	return record;
});

export const pa_delSelPatientInfo = createAction(at.PA_DELETE_PATIENT_INFO, (data) => {
	return data;
})

export const pa_editSelPatientBase = createAction(at.PA_SEL_PATIENT_EDIT_BASE, (data) => {
	return data;
});

export const pa_addSelPatientRecord = createAction(at.PA_SEL_PATIENT_ADD_RECORD, () => {
	return {
	};
});

export const pa_delSelPatientRecord = createAction(at.PA_SEL_PATIENT_DEL_RECORD, (data) => {
	return data;
});


export const pa_editSelPatientTreatRecord = createAction(at.PA_SEL_PATIENT_EDIT_TREAT_RECORD, (data) => {
	return data;
});

export const pa_editSelPatientColposcopy = createAction(at.PA_SEL_PATIENT_EDIT_COLPOSCOPY, (data) => {
	return data;
});

export const pa_editSelPatientTreat = createAction(at.PA_SEL_PATIENT_EDIT_TREAT, (data) => {
	return data;
});

