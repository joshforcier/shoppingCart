<template>
    <div>
        <h1>Product List</h1>
        <img
            v-if="loading"
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
        >
        <ul v-else>
            <li v-for="product in products">
                {{product.title}} - {{product.price | currency}} - {{product.inventory}}
                <button
                    :disabled="!productIsInStock(product)"
                    @click="addProductToCart(product)">Add to cart
                </button>
                <div v-if="product.inventory > 0" class="stockStatus">In Stock</div>
                <div v-if="product.inventory === 0" class="stockStatus">Out of Stock</div>
            </li>
        </ul>
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