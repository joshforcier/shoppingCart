<template>
    <div class="wrap cf">
        <div class="heading cf">
            <h1>Product List</h1>
        </div>
        <img
            v-if="loading"
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
        >
        <div class="cart">
            <ul class="cartWrap" v-for="product in products">
                <li class="items odd">
                    <div class="infoWrap">
                        <div class="cartSection">
                            <img src="http://lorempixel.com/output/technics-q-c-300-300-4.jpg" alt="" class="itemImg" />

                            <h3>{{product.title}}</h3>
                            <p>{{product.price | currency}}</p>

                            <div class="prodTotal cartSection">
                                <p>{{product.quantity * product.price | currency}}</p>
                            </div>

                            <p v-if="product.inventory > 0" class="stockStatus">{{product.inventory}} In Stock</p>
                            <p v-if="product.inventory === 0" class="stockStatus">Out of Stock</p>
                        </div>
                        <div class="heading cf">
                            <a :disabled="!productIsInStock(product)"
                               @click="addProductToCart(product)" href="#" class="continue">Add to cart</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import store from '@/store/index'
    import {mapState, mapGetters, mapActions} from 'vuex'

    export default {
        data () {
            return {
                loading: false,
                productIndex: 1
            }
        },

        computed: {
            ...mapState({
                products: state => state.products.items
            }),

            ...mapGetters('products', {
                productIsInStock: 'productIsInStock'
            })
        },

        methods: {
            ...mapActions({
                fetchProducts: 'products/fetchProducts',
                addProductToCart: 'cart/addProductToCart'
            }),
        },

        created () {
            this.loading = true;
            this.fetchProducts()
                .then(() => this.loading = false);
        }
    }

</script>

<style scoped>


</style>