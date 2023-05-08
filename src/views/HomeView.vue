<template>
  <main>
    <MyTable />
    <logOut />
  </main>
</template>

<script>
import userStore from '@/stores/user.js'
import { mapState } from 'pinia'
import MyTable from '@/components/MyTable.vue'
import logOut from '../components/logOut.vue'
export default {
  name: 'HomeView',
  components: {
    MyTable,
    logOut
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(userStore, ['user'])
  }
}
</script>
