app.component('product-display', {

    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    template:
    /*html*/
    ` <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img :src="image" alt="sock">
                </div>
                <div class="product-info">
                    <h1>{{ title }}</h1>
                    <p>{{ sale }}</p>
                    <p v-if="inStock > 10">In stock</p>
                    <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!!</p>
                    <p v-else="inStock == 0">Out of stock</p>
                    <p>Shipping: {{ shipping }}</p>

                    <product-details :details="details"></product-details>

                    <div>
                        <button 
                            class="button" 
                            v-for="(variant, index) in variants" 
                            :key="variant.id" 
                            @mouseover="updateVariant(index)"
                            :style="{backgroundColor: variant.color}">
                        </button>
                    </div>
                    <div class="socks-size">
                        <label for="size">Choose a size</label><br>
                        <select id="size">
                            <option v-for="size in sizes" value="size">{{ size }}</option>
                        </select>
                    </div>
                    <button 
                        class="button"
                        :class="{disabledButton: inStock == 0}"
                        :disabled="inStock == 0"
                        @click="addToCart">
                        Add to Cart
                    </button>
                    <button 
                        class="button"
                        :class="{disabledButton: inStock == 0}"
                        :disabled="inStock == 0"
                        @click="removeItem">
                        Remove Item
                    </button>
                </div>
            </div>
            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submit="addReview"></review-form>
        </div>`,
    
    data(){
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyster'],
            variants: [
                {id: 101, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 50},
                {id: 102, color: 'green', image: './assets/images/socks_green.jpg', quantity: 0},
            ],
            sizes: ['small', 'medium', 'large'],
            reviews: []
        }
    },

    methods: {
        addToCart(){
            this.$emit ('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeItem(){
            this.$emit ('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index){
            this.selectedVariant = index
        },
        addReview(review){
            this.reviews.push(review)
        }
    },

    computed: {
        title(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].image
        },
        inStock(){
            return this.variants[this.selectedVariant].quantity
        },
        sale(){
            if (this.inStock > 40){
                return 'On Sale!'
            }
            return ''
        },
        shipping(){
            if (this.premium){
                return 'Free'
            }
            return 3.99
        }
    }
})