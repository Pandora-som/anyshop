<template>
     <BackButton>
        <div class="label-text">
            <p>КОРЗИНА</p>
        </div>
    </BackButton>
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
import BackButton from '../components/BackButton.vue';

export default {
    components: { BackButton },
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
        pageChange(href) {
            this.router.push(href);
        },
    },
    
    computed: {},
};
</script>
<style>
.label-text {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    line-height: 100%;
    font-size: 30px;
    font-family: Inter;
    font-weight: 400;
}
.empty-basket {
    height: 400px;
    font-size: 60px;
    letter-spacing: 1px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Inter;
}

.product-details .product-img-container {
    width: 50%;
    height: 100%;
    border-radius: 15px;
    display: flex;
    justify-content: center;
}

.product-details .product-img {
    width: auto;
    height: auto;
}

.product-details .product-desc {
    background-color: #4D5164;
    width: 100%;
    flex: 1;
    display: block;
    border-radius: 15px;
    cursor: auto;
}

.product-details .desc-text {
    font-weight: 500;
    font-family: Inter;
    font-size: 25px;
    line-height: 20px;
    color: white;
    flex: 1;
    padding: 19px;
}

.product-details .rating {
    max-width: 100%;
    justify-content: left;
    gap: 5px;
    margin: 19px;
}

.product-details .row.price {
    justify-content: space-between;
    color: white;
    font-family: Inter;
    padding: 19px;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
}

.product-details .category {
    font-size: 24px;
    font-family: Inter;
    font-weight: 300;
    line-height: 29px;
    color: white;
    padding: 19px;
}

.product-details .product-count {
    font-family: Inter;
    font-weight: 700;
    color: white;
    font-size: 32px;
    line-height: 40px;
}

.product-details .counter {
    align-items: center;
    padding: 24px;
}

.basket-button {
    width: max(250px, 50%);
    height: min(20vw, 118px);
    border-radius: 35px;
    background-color: #BB7699;
    cursor: pointer;
    font-size: min(4vw, 32px);
    font-family: Inter;
    font-weight: 400;
    line-height: min(4.5vw, 39px);
    color: black;
    margin: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sum {
    font-family: Inter;
    font-weight: 400;
    font-size: min(5vw, 32px);
    line-height: 39px;
    color: black;
}

body {
    min-height: 100vh;
    background-color: #EEECE0;
}

header, footer {
    border-radius: 47px;
    background-color: #01072B;
}

footer {
    margin-top: auto;
}

main {
    margin: 32px;
    flex: 1;
}

.row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.justify-center {
    justify-content: space-evenly;
}

.filter p {
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: black;
}

.product-img-container {
    height: 340px;
    display: flex;
    align-items: center;
}

.product-img {
    max-width: 100%;
    max-height: 320px;
}

.product-desc {
    background-color: #4D5164;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    cursor: pointer;
}

.rating {
    max-width: 100%;
    justify-content: right;
    gap: 5px;
    margin: 10px;
}

.star {
    width: 22px;
    height: 22px;
    filter: invert(1);
    background-size: cover;
}

.full-star {
    background-image: url("@/images/full-star.png");
}

.semi-star {
    background-image: url("@/images/semi-star.png");
}

.empty-star {
    background-image: url("@/images/empty-star.png");
}

.desc-text {
    font-weight: 500;
    font-family: Inter;
    font-size: 16px;
    line-height: 19px;
    color: white;
    flex: 1;
    padding: 19px;
}

.row.price {
    justify-content: space-between;
    color: white;
    font-family: Inter;
    padding: 19px;
}

.product-details {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4D5164;
    border-radius: 15px;
    margin: 20px 0;
}

.ellipse {
    width: min(10vw, 96px);
    height: min(10vw, 96px);
    border-radius: min(5vw, 48px);
    background-color: #F4C5DD;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: min(4vw, 60px);
    font-weight: 1000;
    cursor: pointer;
}

.ellipse:hover {
    box-shadow: 1px 1px 2px 2px black;
}

.ellipse:active {
    opacity: 0.9;
}
</style>
