<template>
    <div class="row">
        <div
            class="back-arrow"
            @click="back"
        >
            <img
                :src="backArrow"
                alt="Back Arrow"
                class="img-arrow"
            >
        </div>
        <div class="label">
            <slot>
            </slot>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: 'BackButton',
    
    data() {
        return {
            backArrow: require('@/images/back-arrow.png'),
            router:    useRouter(),
        };
    },
    
    methods: {
        back() {
            this.router.push('/');
        },
    },
};
</script>
<style>
.back-arrow {
    width: 46px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.img-arrow {
    width: 100%;
}

.row {
    display: flex;
}

.label {
    flex: 1;
}
</style>

