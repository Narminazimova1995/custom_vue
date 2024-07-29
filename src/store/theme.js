const state = () => ({
    userPanel: false,
    mobileMenu: false,
    asidePanel: localStorage.getItem('aside_panel') ? JSON.parse(localStorage.getItem('aside_panel')) : true
})

const getters = {

    GET_USER_PANEL(state) {
        return state.userPanel
    },

    GET_ASIDE_PANEL(state) {
        return state.asidePanel
    },

    GET_MOBILE_MENU(state) {
        return state.mobileMenu
    }

}

const mutations = {

    CHANGE_USER_PANEL(state) {
        state.userPanel = !state.userPanel
    },

    CHANGE_ASIDE_PANEL(state) {
        localStorage.setItem('aside_panel', JSON.stringify(!state.asidePanel));
        state.asidePanel = !state.asidePanel
    },

    CHANGE_MOBILE_MENU(state) {
        state.mobileMenu = !state.mobileMenu
    }

}

const actions = {}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
