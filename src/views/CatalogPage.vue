<template>
    <div class="filters">
        <div
            v-for="filter in filters"
            :key="filter.name"
            class="filter"
            :class="{ active: filter.name === selectedFilter }"
            @click="useFilter(filter.name)">

            <p class="font-inter">{{ filter.label }}</p>
        </div>
    </div>
    <div class="products-table">
        <div
            v-for="product in products.slice(productsPerPage * (pageNumber - 1), productsPerPage * (pageNumber))"
            :key="product.id"
            class="product-container">
            <div
                class="product"
                @click="openDetails(product)">
                <div class="product-img-container">
                    <img class="product-img" alt="" :src="product.image">
                </div>
                <div class="product-desc">
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
                    <div class="desc-text">
                        {{ product.title }}
                    </div>
                    <div class="row price">
                        <div> {{ filters.find(val => val.name === product.category).label }}</div>
                        <div> $ {{ product.price }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="pagination">
        <img
            src="@/images/arrow.png"
            alt=""
            class="arrow"
            @click="changePage('left')"
        >
        <div
            v-for="i in Math.ceil(products.length / productsPerPage)"
            :key="i"
            class="page-number"
            :class="{ active: pageNumber === i }"
            @click="changePage(i)"
        >
            {{ i }}
        </div>
        <img
            src="@/images/arrow.png"
            alt=""
            class="arrow right"
            @click="changePage('right')"
        >
    </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    name: 'CatalogPage',
    
    data() {
        return {
            selectedFilter:  'all',
            filters:         [
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
            products:        [],
            pageNumber:      1,
            productsPerPage: 10,
            router:          useRouter(),
        };
    },
    
    methods: {
        useFilter(filter) {
            this.selectedFilter = filter;
            this.getProducts();
        },
        
        changePage(param) {
            if (param === 'right') {
                if (this.pageNumber < Math.ceil(this.products.length / this.productsPerPage)) {
                    this.pageNumber++;
                }
            }
            else if (param === 'left') {
                if (this.pageNumber > 1) {
                    this.pageNumber--;
                }
            }
            else {
                if (this.pageNumber !== param) {
                    this.pageNumber = param;
                }
            }
        },
        
        openDetails(product) {
            localStorage.setItem('product', JSON.stringify(product));
            this.router.push('/details');
        },
        
        async getProducts() {
            try {
                if (this.selectedFilter === 'all') {
                    const result = await axios.get('https://fakestoreapi.com/products');
                    this.products = result.data;
                }
                else {
                    const result = await axios.get(`https://fakestoreapi.com/products/category/${ this.selectedFilter }`);
                    this.products = result.data;
                }
                
                this.pageNumber = 1;
            }
            catch (e) {
                console.log(e);
            }
        },
    },
    
    async created() {
        await this.getProducts();
    },
};
</script>

<style>
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

.font-inter {
    color: white;
    font-family: Inter;
    font-weight: 200;
}

.filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    row-gap: 5px;
}

.filter {
    width: max(16%, 214px);
    border-radius: 35px;
    background-color: #F4C5DD;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.filter p {
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: black;
}

.filter.active {
    background-color: #BB7699;
}

.products-table {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(366px, 1fr));
    grid-row-gap: 65px;
    grid-column-gap: 47px;
    margin: 32px;
}

.product-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.product {
    width: 366px;
    height: 497px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 15px;
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

.pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: min(5vw, 50px);
    align-items: center;
}

.arrow {
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.arrow.right {
    rotate: 180deg;
}

.page-number {
    font-family: Inter;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    color: #000000;
    cursor: pointer;
}

.page-number.active {
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: #FF0082;
}

</style>
