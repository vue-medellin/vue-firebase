<template>
  <div class="home">
    <NavBar :authenticated="authenticated" />
    <div class="container-fluid home-container">
      <h1>Projects & Tasks</h1>
      <div class="row">
        <div class="col-xs-12 col-md-6 tasks-container">
          <Pending />
        </div>
        <div class="col-xs-12 col-md-6 tasks-container">
          <Done />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import NavBar from '@/components/NavBar.vue';
import Pending from '@/components/Pending.vue';
import Done from '@/components/Done.vue';

export default {
  name: 'home',
  data() {
    return {
      userTasks: [],
    };
  },
  beforeMount() {
    this.$firebaseRef
      .child(this.uid)
      .child('personalInfo')
      .set({
        username: this.authenticated.displayName,
        email: this.authenticated.email,
        photoURL: this.authenticated.photoURL,
      });
  },
  methods: {
    receiveUserTasks(tasks) {
      this.userTasks = tasks;
    },
  },
  computed: {
    ...mapState(['uid', 'authenticated']),
  },
  components: {
    NavBar,
    Pending,
    Done,
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  margin: 0 auto;
  padding-top: 70px;
}
</style>
