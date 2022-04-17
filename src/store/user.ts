import { defineStore } from 'pinia'
import { cloud } from '@/utils/request'
import { setStorageSync } from '@/modules/storage'

export const useUserStore = defineStore('user', {
  state: () => {
    return {}
  },
  actions: {
    updateUserData() {
      return cloud
        .auth({
          persistence: 'local',
        })
        .getCurrenUser()
        .then((user) => {
          if (user) {
            console.log('储存', user)
            setStorageSync('userData', {
              email: user.email,
              loginType: user.loginType,
              uid: user.uid,
            })
            localStorage.setItem('loginStatus', 'true')
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
