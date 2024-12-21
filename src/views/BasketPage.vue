<template>
    <template v-if="basket.length > 0">
        <div
            v-for="product in basket"
            :key="product.id"
            class="product-details"
        >
            <div class="product-img-container">
                <img
                    class="product-img"
                    alt=""
                    :src="product.image"
                >
            </div>
            <div class="product-desc">
                <div class="desc-text">
                    {{ product.title }}
                </div>
                <div class="row rating">
                    <div
                        class="star"
                        :class="{
                        'full-star': product.rating.rate >= 1,
                        'semi-star': product.rating.rate < 1 && product.rating.rate > 0,
                        'empty-star': product.rating.rate === 0
                    }"
                    />
                    <div
                        class="star"
                        :class="{
                        'full-star': product.rating.rate >= 2,
                        'semi-star': product.rating.rate < 2 && product.rating.rate > 1,
                        'empty-star': product.rating.rate <= 1
                    }"
                    />
                    <div
                        class="star"
                        :class="{
                        'full-star': product.rating.rate >= 3,
                        'semi-star': product.rating.rate < 3 && product.rating.rate > 2,
                        'empty-star': product.rating.rate <= 2
                    }"
                    />
                    <div
                        class="star"
                        :class="{
                        'full-star': product.rating.rate >= 4,
                        'semi-star': product.rating.rate < 4 && product.rating.rate > 3,
                        'empty-star': product.rating.rate <= 3
                    }"
                    />
                    <div
                        class="star"
                        :class="{
                        'full-star': product.rating.rate >= 5,
                        'semi-star': product.rating.rate < 5 && product.rating.rate > 4,
                        'empty-star': product.rating.rate <= 4
                    }"
                    />
                </div>
                <div class="category"> {{ filters.find(val => val.name === product.category).label }}</div>
                <div class="row price">
                    <div> $ {{ product.price }}</div>
                </div>
                <div class="row counter justify-center">
                    <div
                        class="ellipse"
                        @click="changeCounter(product, '-')"
                    >
                        <p>–</p>
                    </div>
                    <div class="product-count">{{ product.count }}</div>
                    <div
                        class="ellipse"
                        @click="changeCounter(product, '+')"
                    >
                        <p>+</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-center">
            <p class="sum">Сумма заказа: <b> $ {{ calcSum() }}</b></p>
        </div>
        <div class="row justify-center">
            <div
                class="basket-button"
            >
                <p>ОФОРМИТЬ ЗАКАЗ</p>
            </div>
        </div>
    </template>
    <template v-else>
        <div class="empty-basket">
            <p>Корзина пока пуста.</p>
        </div>
    </template>
</template>

<script>
export default {
    data() {
        return {
            basket:  JSON.parse(localStorage.getItem('basket') || '[]'),
            filters: [
                {
                    name:  'all',
                    label: 'Всё',
                },
                {
                    name:  'electronics',
                    label: 'Электроника',
                },
                {
                    name:  'women\'s clothing',
                    label: 'Женская одежда',
                },
                {
                    name:  'men\'s clothing',
                    label: 'Мужская одежда',
                },
                {
                    name:  'jewelery',
                    label: 'Драгоценности',
                },
            ],
        };
    },
    
    methods: {
        changeCounter(product, event) {
            if (event === '+') {
                if (product.count < product.rating.count) {
                    product.count++;
                }
            }
            else {
                if (product.count > 1) {
                    product.count--;
                }
            }
            
            localStorage.setItem('basket', JSON.stringify(this.basket));
        },
        
        calcSum() {
            let sum = 0;
            
            for (const product of this.basket) {
                sum += product.count * product.price;
            }
            
            return sum.toFixed(2);
        },
    },
    
    computed: {},
};
</script>
