import db from '../plugins/firebase'

export const getGameRef = () => {
  const ref = db.ref('game')
  return ref
}

export const getRoomRef = (roomId) => {
  const ref = db.ref(`game/${roomId}`)
  return ref
}

export const getPlayersRef = (roomId) => {
  const ref = db.ref(`game/${roomId}/players`)
  return ref
}

export const getPlayerRef = (roomId, playerId) => {
  const ref = db.ref(`game/${roomId}/players/${playerId}`)
  return ref
}

export const getStatusRef = (roomId) => {
  const ref = db.ref(`game/${roomId}/status`)
  return ref
}

export const getCurrentPlayerRef = (roomId) => {
  const ref = db.ref(`game/${roomId}/currentPlayer`)
  return ref
}
