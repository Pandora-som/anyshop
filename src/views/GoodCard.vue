<template>
    <div class="product-details">
        <a href="../views/CatalogPage.vue"><img src="../images/Back-strelka.png"></a>
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
            <div class="row price">
                <div> $ {{ product.price }}</div>
            </div>
            <div class="category"> {{ filters.find(val => val.name === product.category).label }}</div>
            <div class="category">
                {{ product.description }}
            </div>
            <div class="row counter justify-center">
                <div
                    class="ellipse"
                    @click="changeCounter('-')"
                >
                    <p>–</p>
                </div>
                <div class="product-count">{{ count }}</div>
                <div
                    class="ellipse"
                    @click="changeCounter('+')"
                >
                    <p>+</p>
                </div>
            </div>
            <div class="row justify-center">
                <div
                    class="basket-button"
                    @click="addToBasket"
                >
                    <p>В КОРЗИНУ</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            product: JSON.parse(localStorage.getItem('product')),
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
            count:   1,
        };
    },
    
    methods: {
        changeCounter(param) {
            if (param === '+') {
                if (this.count < this.product.rating.count) {
                    this.count++;
                }
            }
            else {
                if (this.count > 1) {
                    this.count--;
                }
            }
        },
        
        addToBasket() {
            const basket = JSON.parse(localStorage.getItem('basket') || '[]');
            let needPush = true;
            
            for (const id in basket) {
                if (basket[id].title === this.product.title) {
                    basket[id].count += this.count;
                    needPush = false;
                }
            }
            
            if (needPush) {
                basket.push({ ...this.product, count: this.count });
            }
            
            localStorage.setItem('basket', JSON.stringify(basket));
        },
    },
};
</script>
<style>
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
    font-size: min(4.4vw, 24px);
    font-family: Inter;
    font-weight: 300;
    line-height: min(4.9vw, 29px);
    color: white;
    padding: 19px;
}

.product-details .product-count {
    font-family: Inter;
    font-weight: 700;
    color: white;
    font-size: min(3.2vw, 32px);
    line-height: 40px;
}

.product-details .counter {
    align-items: center;
    padding: 24px;
}

.basket-button {
    width: 50%;
    height: min(12vw, 118px);
    border-radius: 35px;
    background-color: #BB7699;
    cursor: pointer;
    font-size: min(3vw, 32px);
    font-family: Inter;
    font-weight: 400;
    line-height: min(3.5vw, 39px);
    color: black;
    margin: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.basket-button:hover {
    box-shadow: 1px 1px 2px 2px black;
}

.basket-button:active {
    opacity: 0.9;
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
@media (max-width: 820px) {
    .product-details {
        flex-direction: column;
    }
    
    .product-details .product-img-container {
        margin-top: 10px;
    }
    
    .product-details .rating {
        margin: 9px 19px;
    }
    
    .product-details .desc-text {
        padding: 9px 19px;
    }
    
    .product-details .row.price {
        padding: 9px 19px;
    }
    
    .product-details .category {
        padding: 9px 19px;
    }
    
    .product-details .counter {
        padding: 24px;
        padding-bottom: 0;
    }
}
</style>