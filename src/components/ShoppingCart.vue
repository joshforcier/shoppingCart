<template>
    <div class="wrap cf">
        <div class="heading cf">
            <h1>My Cart</h1>
            <a href="#" class="continue">Continue Shopping</a>
        </div>
        <div class="cart">
            <ul class="cartWrap" v-for="product in products">
                <li class="items odd">
                    <div class="infoWrap">
                        <div class="cartSection">
                            <img src="http://lorempixel.com/output/technics-q-c-300-300-4.jpg" alt="" class="itemImg" />
                            <h3>{{product.title}}</h3>
                            <p> <input type="text"  class="qty" v-model="product.quantity"/>x {{product.price | currency}}</p>
                            <p v-if="product.inventory > 0" class="stockStatus">In Stock</p>
                            <p v-if="product.inventory === 0" class="stockStatus">Out of Stock</p>
                        </div>

                        <div class="prodTotal cartSection">
                            <p>{{product.quantity * product.price | currency}}</p>
                        </div>
                        <div class="cartSection removeWrap">
                            <a href="#" class="remove">x</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="promoCode"><label for="promo">Have A Promo Code?</label><input type="text" name="promo" placholder="Enter Code" />
            <a href="#" class="btn"></a></div>

        <div class="subtotal cf">
            <ul>
                <li class="totalRow"><span class="label">Subtotal</span><span class="value">{{total | currency}}</span></li>

                <li class="totalRow"><span class="label">Shipping</span><span class="value">$5.00</span></li>

                <li class="totalRow"><span class="label">Tax</span><span class="value">{{total * 0.075 | currency}}</span></li>

                <li class="totalRow final"><span class="label">Total</span><span class="value">{{total + 5 + total * 0.075| currency}}</span></li>
                <li class="totalRow"><a href="#" @click="checkout" class="btn continue">Checkout</a></li>
                <p v-if="checkoutStatus">{{checkoutStatus}}</p>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'

    export default {
        computed: {
            ...mapGetters('cart', {
                products: 'cartProducts',
                total: 'cartTotal'
            }),
            ...mapState('cart', {
                checkoutStatus: state => state.checkoutStatus
            })
        },

        methods: {
        ...mapActions('cart', ['checkout'])
        }
    }
</script>

<style scoped>

</style>