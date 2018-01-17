import { eventChannel, END, delay } from 'redux-saga'
import { call, put, fork, take, takeEvery } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import * as api from '../utils/api'
import * as actions from '../actions/vcode'

function countdownChannel(seconds) {
  return eventChannel((emitter) => {
    const interval = setInterval(() => {
      seconds -= 1

      if (seconds > 0) {
        emitter(seconds)
      } else {
        emitter(END)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })
}

function* countdown(action) {
  yield put(actions.updateCountDownSeconds(120))
  const chan = yield call(countdownChannel, 120)

  try {
    while (true) {
      const seconds = yield take(chan)
      yield put(actions.updateCountDownSeconds(seconds))
    }
  } finally {
    yield put(actions.updateCountDownSeconds(0))
    chan.close()
  }
}

// TODO
function* sendMsg(action) {
  try {
    const result = yield call(api.sendMsg, action.payload)
    console.warn('result---->', result);
    yield put(actions.sendMsgSucceed())
  } catch (e) {
    // yield put(actions.sendVCodeFailed({ ...e, ...action.payload }))
    console.log(e);
  }
}

function* sendMsgSucceed(action) {
  yield fork(countdown, action)
  // yield call(delay, 2000)
  // yield put(actions.hideError(action.payload))
}

// function* sendVCodeFailed(action) {
//   yield call(delay, 2000)
//   yield put(actions.hideError(action.payload))
// }

export default function* vcodeSaga() {
  yield takeEvery(String(actions.sendMsgRequested), sendMsg)
  yield takeEvery(String(actions.sendMsgSucceed), sendMsgSucceed)
  // yield takeEvery(String(actions.sendVCodeFailed), sendVCodeFailed)
}
