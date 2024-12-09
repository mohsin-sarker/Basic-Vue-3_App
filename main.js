const app = Vue.createApp({
    data(){
        return {
            cart: [],
            premium: false
        }
    },
    methods: {
        updateCart(id){
            this.cart.push(id)
        },
        removeCartItem(id){
            const index = this.cart.indexOf(id)
            if (index > -1) {
                this.cart.splice(index, 1)
            }
        }
    }
})