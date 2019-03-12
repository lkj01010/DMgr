/**
 * @flow
 */
/*----------- Patient -----------*/

export type PatientInfo = {
    key: string;

    id: string;
    name: string;
    age: number;
    firstDiagnose: string;
    lastDiagnose: string;
    cardId: string;
    phone: string;
    birthDate: string;
    diagnose: string;
    nation: string;
    occupation: string;
    smoking: string;
    firstMlAage: number;
    pregnantTimes: number;
    produceChildTimes: number;
    abortionTimes: number;
    familyHistory: string;
    mlBleeding: string;
    contraceptionWay: string;
    other: string;

    treatRecordList: Array<PatientTreatRecord>;
};

export type PatientBaseInfo = {
    id: string;
    name: string;
    age: number;
    firstDiagnose: string;
    lastDiagnose: string;
    cardId: string;
    phone: string;
    birthDate: string;
    diagnose: string;
    nation: string;
    occupation: string;
    smoking: string;
    firstMlAage: number;
    pregnantTimes: number;
    produceChildTimes: number;
    abortionTimes: number;
    familyHistory: string;
    mlBleeding: string;
    contraceptionWay: string;
    other: string;
};

export type PatientTreatRecord = {
    date: string;
    cytology_date: string;
    cytology_from: string;
    cytology_report: string;

    HPV_date: string;
    HPV_from: string;
    HPV_report: string;

    imaging_date: string;
    imaging_from: string;
    imaging_report: string;
    imaging_id: string;

    histology_date: string;
    histology_from: string;
    histology_report: string;
    histology_id: string;
}

export type PatientColposcopy = {
    date: string;
    cervixExpose: string;
    conversionAreaType: string;
    vinegarWhite: string;
    glandCleft: string;
    vessel: string;
    inlay: string;
    unusualVessel: string;
    iodine: string;
    vagina: string;
    vulva: string;
    microscopicImage: string;
}

export type PatientTreat = {
    date: string;
    laser_place: string;
    laser_area: string;
    laser_other: string;
    LEEP_1_length: number;
    LEEP_1_diameter: number;
    LEEP_1_thickness: number;
    LEEP_2: string;
    LEEP_other: string;
    other: string;

}