import { inject } from 'vue'
import { Module } from 'vuex'

const app: Module<any, any> = {
  namespaced: true,
  state() {
    return {
      userData: {},
    }
  },
  mutations: {
    set_user_data(state, data) {
      state.userData = data
    },
  },
  actions: {
    getUserData({ commit }, cloud) {
      cloud
        .auth({
          persistence: 'local',
        })
        .getCurrenUser()
        .then((user) => {
          if (user) {
            console.log('用户信息11', user)
            commit('set_user_data', user)
          } else {
            console.log('未登录')
            localStorage.setItem('loginStatus', 'false')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}

export default app
