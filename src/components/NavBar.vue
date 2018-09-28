<template>
  <div class="user-navbar">
    <h4>{{ authenticated.displayName }}</h4>
    <div class="navbar-actions">
      <img class="user-img" :src="authenticated.photoURL" alt="userPhotoUrl">
      <button class="logout-button" @click="logout()">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  props: ['authenticated'],
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
h4 {
  color: white;
  float: left;
  margin: 15px;
}

.user-navbar {
  background-color: #304960;
  height: 60px;
  position: fixed;
  width: 100%;
  z-index: 1000;
}

.navbar-actions {
  float: right;
  margin-right: 5px;
}

.user-img {
  border-radius: 100%;
  margin: 5px 15px;
  height: 50px;
  width: 50px;
}

.logout-button {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
