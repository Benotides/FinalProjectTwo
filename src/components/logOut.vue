<template>
<div>
    <button class="signout" @click.prevent="_handleLogOut">Log Out</button>
</div>
</template>

  
<script>
import {
    mapActions
} from 'pinia'
import userStore from '@/stores/user.js'

export default {
    name: 'LogOut',

    methods: {
        ...mapActions(userStore, ['signOut']),
        async _handleLogOut() {
            try {
                await this.signOut()
                this.$router.push({
                    name: 'signIn'
                })
            } catch (err) {
                console.error(err)
            }
        },
    },
}
</script>
  
<style scoped>
.signout {
    margin-top: 1rem;
    background-color: #a97f50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 80%;
    margin-bottom: 8%;

}
  </style>
