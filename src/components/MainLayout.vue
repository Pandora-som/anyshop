<template>
    <div class="main-layout">
        <header>
            <div class="row justify-center pad-large">
                <div v-for="(page, ind) in views" :key="ind">
                    <a @click.prevent="pageChange(page.path)" class="row v-link font-inter">
                        <img :src="page.img" class="img-link">
                        <div>{{ page.name }}</div>
                    </a>
                </div>
            </div>
            <template v-if="$root.currentRoute === '/'">
                <div class="full-width row justify-center">
                    <p class="title font-inter">&nbsp;&nbsp;&nbsp;&nbsp;Интернет магазин <b>AnyShop</b> -
                        <br>найдите то, что искали</p>
                </div>
                <div class="row justify-right">
                    <p class="description font-inter">В нашем интернет магазине вы найдёте всё:
                        <br> от бытовой техники до одежды по
                        <br> приемлемой цене и высоким качеством!</p>
                </div>
            </template>
        </header>
        
        <main>
            <slot>
            </slot>
        </main>
        
        <footer class="pad-large">
            <div class="row justify-between font-inter footer">
                <p>
                    <b>AnyShop</b>
                </p>
                <p>
                    + 7 900 000 00 00
                </p>
            </div>
            <div class="row justify-center pad-large">
                <div v-for="(page, ind) in views" :key="ind">
                    <a @click.prevent="pageChange(page.path)" class="row v-link font-inter">
                        <img :src="page.img" class="img-link">
                        <div>{{ page.name }}</div>
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            views:  [
                {
                    path: '/',
                    name: 'КАТАЛОГ',
                    img:  require('@/images/catalog.png'),
                },
            ],
            router: useRouter(),
        };
    },
    
    methods: {
        pageChange(href) {
            this.router.push(href);
        },
    },
};
</script>

<style>
body {
    min-height: 100vh;
    background-color: #EEECE0;
}
.main-layout {
    display: flex;
    flex-direction: column;
    margin: min(51px, 3.8vw) min(32px, 2.4vw);
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
.justify-right {
    justify-content: right;
}
.justify-between {
    justify-content: space-between;
}
.img-link {
    width: 33px;
    height: 33px;
}
.pad-large {
    padding: 32px;
}
.full-width {
    width: 100% !important;
}
.title {
    width: max-content;
    font-size: 34px;
    line-height: 41px;
}
.description {
    width: max-content;
    font-size: 22px;
    line-height: 27px;
    padding-right: 86px;
}
.font-inter {
    color: white;
    font-family: Inter;
    font-weight: 200;
}
.footer {
    font-weight: 400;
    font-size: 28px;
    line-height: 34px;
}
.filter p {
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: black;
}
.v-link {
    text-decoration: none;
    font-size: 30px;
    line-height: 36px;
    gap: 10px;
}
@media (max-width: 640px) {
    .v-link {
        text-decoration: none;
        font-size: 20px;
        line-height: 26px;
        gap: 10px;
    }
    
    .title {
        font-size: 20px;
        line-height: 26px;
    }
    
    .description {
        font-size: 12px;
        line-height: 17px;
        padding-right: 10px;
    }
    
    .footer {
        font-weight: 400;
        font-size: 20px;
        line-height: 26px;
    }
    
    .pad-large {
        padding: 16px;
    }
}

@media (max-width: 380px) {
    .footer {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
    }
    
    .title {
        font-size: 14px;
        line-height: 20px;
    }
    
    .v-link {
        text-decoration: none;
        font-size: 14px;
        line-height: 20px;
        gap: 10px;
    }
}

</style>
