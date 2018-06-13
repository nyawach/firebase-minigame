import qs from 'querystring'

import * as actions from './actions'
import * as mutations from './mutations'

const query = qs.parse(window.location.search.slice(1))
const roomId = query['room-id'] || null

const state = {
  roomId,
  status: null,
  currentPlayer: null,
  playerId: null,
  isInvited: !!roomId
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
