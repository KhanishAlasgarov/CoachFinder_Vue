<template>
  <section>Filter</section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button mode="outline" link :to="{name:'register'}">Register as Coach</base-button>
      </div>
      <ul v-if="hasCoaches">
        <coache-list-item
          v-for="coach of filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :areas="coach.areas"
          :description="coach.description"
          :hourlyRate="coach.hourlyRate"
        >
        </coache-list-item>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import CoacheListItem from '../../components/coaches/CoacheListItem.vue';
export default {
  components: {
    CoacheListItem,
  },
  computed: {
    ...mapGetters('coaches', ['hasCoaches']),
    filteredCoaches() {
      return this.$store.getters['coaches/getCoaches'];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
