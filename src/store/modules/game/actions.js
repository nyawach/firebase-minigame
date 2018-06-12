import db from '../../../plugins/firebase'
import { getRoomRef, getPlayersRef } from '../../../utils/refs';

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
      [state.playerId]: true,
    },
    status,
  })
  const roomId = roomRef.key

  commit('setRoomId', roomId)
  commit('setStatus', status)
}

export const joinRoom = async ({state, commit}, {playerId}) => {
  const roomRef = await getRoomRef(state.roomId)
  const status = 'matched'
  await roomRef.update({
    status
  })
  const playerRef = await getPlayersRef(state.roomId)
  playerRef.update({
    [state.playerId]: true,
  })

  commit('setStatus', status)
}
