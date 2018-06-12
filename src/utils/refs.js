import db from '../plugins/firebase'

export const getGameRef = () => {
  const ref = db.ref('game')
  return ref
}

export const getRoomRef = (roomId) => {
  const ref = db.ref(`game/${roomId}`)
  console.log(ref.key, roomId);
  return ref
}

export const getPlayersRef = (roomId) => {
  const ref = db.ref(`game/${roomId}/players`)
  return ref
}
