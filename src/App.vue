<template>
  <div id="app">
    <button @click="createRoom" v-if="!roomId" >部屋を作る</button>
    <p v-else>{{ roomURL }}</p>
    <p>プレイヤーID: {{ playerId }}</p>
    <p>ゲームステータス: {{ status }}</p>
    <button @click="joinRoom" v-if="isInvited">部屋に入る</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import {getRoomRef} from './utils/refs'
import firebaseSubscriber from './mixins/firebaseSubscriber'

export default {
  name: 'App',

  data: () => ({
  }),

  mixins: [firebaseSubscriber],

  computed: {
    ...mapState('game', ['roomId', 'playerId', 'status', 'isInvited']),
    roomURL() {
      return `${window.location.origin}/?room-id=${this.roomId}`
    },
    firebaseSubscription() {
      return [
        {
          ref: getRoomRef(this.roomId),
          fn: (snapshot) => {
            console.log(snapshot.child('status').val());
            if(snapshot.child('status').val() === 'matched') {
              this.start()
            }
          }
        }
      ]
    }
  },

  methods: {
    ...mapActions('game', ['createRoom', 'joinRoom', 'createPlayer']),
    ...mapMutations('game', ['setRoomId']),
    start() {
      alert("start!")
    }
  },

  created() {
    this.createPlayer()
  }
}
</script>

<style>
</style>
