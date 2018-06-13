<template>
  <div id="app">
    <button @click="createRoom" v-if="!roomId" >部屋を作る</button>
    <p v-else>{{ roomURL }}</p>
    <p>プレイヤーID: {{ playerId }}</p>
    <p>ゲームステータス: {{ status }}</p>
    <button @click="joinRoom" v-if="isInvited && status == 'matching'">部屋に入る</button>
    <button @click="dice" v-if="status === 'playing' && isMyTurn">dice</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import {getRoomRef, getStatusRef, getCurrentPlayerRef, getPlayersRef, getPlayerRef} from './utils/refs'
import firebaseSubscriber from './mixins/firebaseSubscriber'

export default {
  name: 'App',

  data: () => ({
  }),

  mixins: [firebaseSubscriber],

  computed: {
    ...mapState('game', ['roomId', 'playerId', 'isInvited', 'status', 'currentPlayer']),
    roomURL() {
      return `${window.location.origin}/?room-id=${this.roomId}`
    },
    firebaseSubscription() {
      return [
        {
          ref: getStatusRef(this.roomId),
          fn: snapshot => {
            const status = snapshot.val()
            console.log(`[${snapshot.key}]: ${status}`);

            this.setStatus(status)
            if(status === 'matched') {
              this.start()
              return
            }
            if(status === 'finished') {
              this.finish()
              return
            }
          }
        },
        {
          ref: getCurrentPlayerRef(this.roomId),
          fn: snapshot => {
            console.log(`[${snapshot.key}]: ${snapshot.val()}`);
            this.setCurrentPlayer(snapshot.val())
          }
        },
      ]
    },
    isMyTurn() {
      return this.currentPlayer === this.playerId
    }
  },

  methods: {
    ...mapActions('game', ['createRoom', 'joinRoom', 'createPlayer', 'changeTurn']),
    ...mapMutations('game', ['setStatus', 'setCurrentPlayer']),
    start() {
      window.alert("start!")
      {
        const ref = getStatusRef(this.roomId)
        const status = 'playing'
        ref.set(status)
      }
      if(this.isInvited) return
      {
        const ref = getCurrentPlayerRef(this.roomId)
        ref.set(this.playerId)
      }
    },
    dice() {
      const num = Math.random() * 6 + 1 | 0
      window.alert(num)
      if(num === 6) {
        const ref = getStatusRef(this.roomId)
        const status = 'finished'
        this.setStatus(status)
        ref.set(status)
        return
      }
      const ref = getPlayerRef(this.roomId, this.playerId)
      ref.set(num)
      this.changeTurn()
    },
    finish() {
      window.alert('finish')
    }
  },

  mounted() {
    this.createPlayer()
  }
}
</script>

<style>
</style>
