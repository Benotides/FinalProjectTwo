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
  
<style lang="scss" scoped>

  </style>
