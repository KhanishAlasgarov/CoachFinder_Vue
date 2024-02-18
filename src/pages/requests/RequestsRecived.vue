<template>
  <section>
    <base-dialog :show="!!error" title="An error occurred!" @close="closeModal">
      <p>{{ error }}</p>
    </base-dialog>
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
  data() {
    return {
      isLoading: false,
      error:null,
    };
  },
  components: {
    RequestItem,
  },
  created() {
    this.loadData();
  },
  methods: {
    closeModal(){
      this.error = null;
    },
    async loadData() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/loadData');
      } catch (error) {
        this.error = error;
      }
      this.isLoading = false;
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
