import globalConfig from '../config'

export default {
    baseUrl() {
        let host
        if(process.env.NODE_ENV === 'production') {
            host = globalConfig.production.domain + globalConfig.app.routerBaseApi
        } else {
            host = `http://${globalConfig.app.host}${globalConfig.app.routerBaseApi}`
        }
        return host
    },
    doneTodosCount(state,getters){

        return getters
    }
}
