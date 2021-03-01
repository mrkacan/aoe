import { takeEvery } from "redux-saga";
import { put } from "redux-saga/effects";
import { APP_LOADING } from "../actions/units/unitsConstants";
import * as DATA from '../common/age-of-empires-units.json'

import { initialFilterData, initialUnitData, unitsLoading } from "../actions/units/units";
import { getFilteredData } from "../common/helpers/common";

function* callInitializeData(){
    try {
        yield put(unitsLoading(true));
        const data = DATA.units;
        yield put(initialUnitData(data));
        yield put(initialFilterData(getFilteredData({data: [...data]})));
        yield put(unitsLoading(false));
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
}

function* getInitializeData(){
   // @ts-ignore
    yield* takeEvery(APP_LOADING, callInitializeData)
}

export {
    getInitializeData,
}