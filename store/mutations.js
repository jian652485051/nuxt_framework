export default {
    SET_DOMAIN (state, domain) {
        state.domain = domain
    },
    SET_TOKEN (state, token) {
        state.token = token
    },
    SET_COMMON(state, data) {
        state.common_data = data.data
    },
    SET_USER(state, data) {
        state.user = data
    },
    NEW_LIST(state, data){
        state.news_list = data
    },
    NEW_DETAIL(state, data){
        state.news_detail = data
    }
}
