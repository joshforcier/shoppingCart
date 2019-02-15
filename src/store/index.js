import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // data
        products: [],
        // {id, quantity}
        cart: [],
        checkoutStatus: null
    },

    getters: { // computed properties
        availableProducts(state, getters) {
            return state.products.filter(product => product.inventory > 0);
        },

        cartProducts (state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },

        cartTotal (state, getters) {
            let total = 0;
            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity;
            });
            return total;
        },

        productIsInStock () {
            return (product) => {
                return product.inventory > 0;
            }
        }
    },

    actions: { // decide when a mutation should fire
        fetchProducts ({commit}) {
            return new Promise((resolve, reject) => {
                // make api call
                // run setProducts mutation
                shop.getProducts(products => {
                    commit('setProducts', products);
                    resolve();
                })
            })
        },

        addProductToCart ({state, getters, commit}, product) {
            if (getters.productIsInStock(product)) {
                const cartItem = state.cart.find(item => item.id === product.id);

                if (!cartItem) {
                    commit('pushProductToCart', product.id);
                } else {
                    commit('incrementItemQuantity', cartItem);
                }
                commit('decrementProductInventory', product);
            }
        },

        checkout ({state, commit}) {
            shop.buyProducts(
                state.cart,
                ()=> {
                    commit('emptycart');
                    commit('setCheckoutStatus', 'Success');
                },
                () => {
                    commit('setCheckoutStatus', 'Fail');
                }
            )
        }
    },

    mutations: { // responsible for state changes
        setProducts (state, products) {
            // update products
            state.products = products;
        },


        pushProductToCart (state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            });
        },

        incrementItemQuantity (state, cartItem) {
            cartItem.quantity++;
        },

        decrementProductInventory (state, product) {
            product.inventory--;
        },

        setCheckoutStatus (state, status) {
            state.checkoutStatus = status;
        },

        emtpyCart (state) {
            state.cart = [];
        }
    }
})