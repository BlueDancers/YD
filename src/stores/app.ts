import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      userData: {} as any,
    }
  },
  actions: {
    updateUserData(cloud) {
      cloud
        .auth({
          persistence: 'local',
        })
        .getCurrenUser()
        .then((user) => {
          if (user) {
            console.log('用户信息', user)

            this.userData = user
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
})
