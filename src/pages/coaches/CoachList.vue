<template>
  <section>
    <coache-filter @change-filter="setFilters"></coache-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button mode="outline" link :to="{ name: 'register' }"
          >Register as Coach</base-button
        >
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
import CoacheFilter from '../../components/coaches/CoacheFilter.vue';
export default {
  components: {
    CoacheListItem,
    CoacheFilter,
  },
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    ...mapGetters('coaches', ['hasCoaches']),
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/getCoaches'];
      return coaches.filter((coach) => {
        if (this.filters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.filters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.filters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.filters = updatedFilters;
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
