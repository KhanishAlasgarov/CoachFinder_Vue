<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Recived</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests">
        <request-item
          :message="request.message"
          :email="request.email"
          v-for="request of getRequests"
          :key="request.id"
        >
        </request-item>
      </ul>
      <h3 v-else>Yohdu</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  data(){
    return{
      isLoading:false,
    }
  },
  components: {
    RequestItem,
  },
  created() {
    this.loadData();
  },
  methods:{
    async loadData() {
      this.isLoading=true;
      await this.$store.dispatch('requests/loadData');
      this.isLoading =false;
    },
  },
  computed: {
    getRequests() {
      return this.$store.getters['requests/getRequests'];
    },
    hasRequests() {
      return this.$store.getters['requests/getRequests'].length > 0;
    },
    
  },
};
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
