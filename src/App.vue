<template>
  <TheHeader />
  <router-view v-slot="slotProp">
    <transition name="route" mode="out-in">
      <component :is="slotProp.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue';
export default {
  components: {
    TheHeader,
  },
  created(){
    this.$store.dispatch("autoLogin");
  },
  computed:{
    didLogout(){
      return this.$store.getters.didLogout
    }
  },
  watch:{
    didLogout(newValue,oldValue){
      if (newValue && newValue!=oldValue) {
        this.$router.replace("/");
      }
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
.route-enter-from{
  opacity: 0;
  transform: translateY(-30px);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.2s ease-in;
}
.route-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.route-leave-from{
  opacity: 1;
  transform: translateY(0);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
