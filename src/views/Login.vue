<template>
  <div class="container-fluid login-container">
    <h1>Welcome to Vue.js Medellín Meetup</h1>
    <img alt="Vue logo" src="../assets/logo.png">
    <img alt="Firebase logo" src="../assets/firebase.png">
    <div class="button-container">
      <button class="login-button" @click="login()">
        <i class="fab fa-google"></i>
        Login
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    async login() {
      await this.$store.dispatch('LOGIN');
      if (this.$store.state.uid) {
        this.$router.push({ name: 'Home' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  padding-top: 15%;

  img {
    padding-top: 5%;
    height: 200px;
  }
}

.button-container {
  margin-top: 50px;
}

.login-button {
  background-color: #304960;
  border: none;
  border-radius: 7px;
  color: white;
  cursor: pointer;
  padding: 10px 25px;
}
</style>
