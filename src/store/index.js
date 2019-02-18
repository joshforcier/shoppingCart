import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        cart,
        products
    },

    state: { // data

    },

    getters: { // computed properties

    },

    actions: actions,

    mutations: { // responsible for state changes

    }
})