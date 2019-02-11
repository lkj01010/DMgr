/**
 * @flow
 */
/*----------- Patient -----------*/

export type PatientInfo = {
    id: string;
    name: string;
    age: number;
    firstDiagnose: string;
    lastDiagnose: string;
    cardId: string;
    phone: string;

    base: PatientBaseInfo;
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
    smoking: boolean;
    firstMlAage: number;
    pregnantTimes: number;
    produceChildTimes: number;
    abortionTimes: number;
    familyHistory: string;
    mlBleeding: boolean;
    contraceptionWay: string;
    other: string;
};