import { fork } from "redux-saga/effects";
import { getInitializeData } from "./units";

export default function* rootSaga() {
    yield [
        fork(getInitializeData)
    ]
}
