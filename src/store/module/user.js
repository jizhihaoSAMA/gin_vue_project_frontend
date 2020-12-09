import storageService from '@/service/storageService'
import userService from '@/service/userService'


const userModule = {
    namespaced: true,
    state: {
        token: storageService.get(storageService.USER_TOKEN),
        userInfo: storageService.get(storageService.USER_INFO) ? JSON.parse(storageService.get(storageService.USER_INFO)) : null,

    },
    mutations: {
        SET_TOKEN (state, token) {
            // 更新本地缓存
            storageService.set(storageService.USER_TOKEN, token);
            // 更新state
            state.token = token;
        },
        SET_USERINFO (state, userInfo) {
            // 更新缓存
            storageService.set(storageService.USER_INFO, JSON.stringify(userInfo));
            // 更新state
            state.userInfo = userInfo;
        },


    },
    actions: {
        updateToken (context) {
            return new Promise((resolve, reject) => {
                userService.updateToken().then(res => {
                    if (res.data.code == '200') {
                        context.commit('SET_TOKEN', res.data.data.token)
                        return userService.info()
                    } else {
                        throw new Error("Can't update token")
                    }
                }).then(res => {
                    context.commit('SET_USERINFO', res.data.data.user)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        register (context, { username, telephone, password, captcha }) {
            return new Promise((resolve, reject) => {
                userService.register({ username, telephone, password, captcha }).then(res => {
                    //  保存token
                    if (res.data.code == "200") {
                        context.commit('SET_TOKEN', res.data.data.token)
                        return userService.info()
                    } else {
                        throw new Error('Error')
                    }
                }).then(res => {
                    // 保存用户信息
                    context.commit('SET_USERINFO', res.data.data.user)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        login (context, { telephone, password }) {
            return new Promise((resolve, reject) => {
                userService.login({ telephone, password }).then(res => {
                    //  保存token
                    context.commit('SET_TOKEN', res.data.data.token)
                    return userService.info()
                }).then(res => {
                    // 保存用户信息
                    console.log(res.data.data.user)
                    context.commit('SET_USERINFO', res.data.data.user)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        logout ({ commit }) {
            //直接清除token
            commit('SET_TOKEN', '')
            storageService.set(storageService.USER_TOKEN, '')
            // 清除用户信息
            commit('SET_USERINFO', '')
            storageService.set(storageService.USER_INFO, '')

        }
    }
}

export default userModule;
