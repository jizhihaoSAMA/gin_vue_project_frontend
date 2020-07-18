import storageService from '@/service/storageService'
import userService from '@/service/userService'


const userModule = {
    namespaced: true,
    state: {
        token: storageService.get(storageService.USER_TOKEN),
        userInfo: JSON.parse(storageService.get(storageService.USER_INFO)),
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
        }
    },
    actions: {
        register (context, { username, telephone, password }) {
            return new Promise((resolve, reject) => {
                userService.register({ username, telephone, password }).then(res => {
                    //  保存token
                    context.commit('SET_TOKEN', res.data.data.token)
                    return userService.info()
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
                    context.commit('SET_USERINFO', res.data.data.user)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        logout (context) {
            //直接清除token
            context.commit('SET_TOKEN', '')
            storageService.set(storageService.SET_TOKEN, '')
            // 清除用户信息
            context.commit('SET_USERINFO', '')
            storageService.set(storageService.SET_USERINFO, '')
        }
    }
}

export default userModule;
