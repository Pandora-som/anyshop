<template>
  <MainLayout>
      <router-view/>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/MainLayout.vue';

export default {
  components: { MainLayout },
};

</script>
