import { all, fork } from "redux-saga/effects";

import * as characters from "./characters";

const getValuesInObject = obj => Object.keys(obj).map(value => obj[value]);

export default function* rootSaga() {
    yield all([
		...getValuesInObject(characters),
    ].map(fork));
}