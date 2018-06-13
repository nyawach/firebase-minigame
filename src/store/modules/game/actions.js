import _ from 'lodash'

import db from '../../../plugins/firebase'

import { getStatusRef, getPlayersRef, getCurrentPlayerRef } from '../../../utils/refs';

export const createPlayer = ({commit}) => {
  const playerId = `player${(Math.random() * 100000) | 0}`
  commit('setPlayerId', playerId)
}

export const createRoom = async ({state, commit}) => {
  // roomIdはpushしたルートrefのキーにする
  const roomRef = await db.ref('game').push()

  const status = 'matching'

  await roomRef.set({
    players: {
      [state.playerId]: 0,
    },
    status,
  })
  const roomId = roomRef.key

  commit('setRoomId', roomId)
}

export const joinRoom = async ({state, commit}) => {
  const statusRef = await getStatusRef(state.roomId)
  const status = 'matched'
  const playerRef = await getPlayersRef(state.roomId)

  await statusRef.set(status)
  await playerRef.update({
    [state.playerId]: 0,
  })
}

export const changeTurn = async ({state, commit}) => {
  const playersRef = await getPlayersRef(state.roomId)
  // 子要素をkeyのなかから違うプレイヤーのものを取る
  playersRef.once('value', snapshot => {
    const currentPlayerRef = getCurrentPlayerRef(state.roomId)
    const players = snapshot.val()
    const nextPlayer = _(players).keys().filter(player => player !== state.currentPlayer).value()[0]
    currentPlayerRef.set(nextPlayer)
  })
}
