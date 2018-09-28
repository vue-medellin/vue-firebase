import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    userDisplayName: null,
    uid: null,
    refreshTasks: false,
  },
  actions: {
    async  LOGIN({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const { user } = result;
          commit('LOGIN_MUTATION', user);
        });
    },
    SET_AUTHENTICATED({ commit }, currentUser) {
      commit('LOGIN_MUTATION', currentUser);
    },
    REFRESH_TASKS({ commit }, value) {
      commit('REFRESH_TASKS_MUTATION', value);
    },
  },
  mutations: {
    LOGIN_MUTATION: (state, user) => {
      const actualState = state;

      if (user) {
        actualState.userDisplayName = user.displayName;
        actualState.uid = user.uid;
      }
      actualState.authenticated = user || false;
    },
    REFRESH_TASKS_MUTATION: (state, value) => {
      const actualState = state;
      actualState.refreshTasks = value;
    },
  },
});
