<template>
  <div id="app">
    <Header v-if="!isAdminPage" />
    <router-view />
    <Footer v-if="!isAdminPage" />
  </div>
</template>

<script>
import Header from "./layout/ComHeader.vue";
import Footer from "./layout/ComFooter.vue";




export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  computed: {
    isAdminPage() {
      return this.$route.path.startsWith("/admin");
    },
  },
};
</script>
