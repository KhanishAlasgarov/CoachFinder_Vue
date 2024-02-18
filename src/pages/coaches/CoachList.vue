<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="closeModal">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coache-filter @change-filter="setFilters"></coache-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isLoggedIn" link to="/auth">Login</base-button>
          <base-button
            v-if="!isCoach && !isLoading && isLoggedIn"
            mode="outline"
            link
            :to="{ name: 'register' }"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="hasCoaches && !isLoading">
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
        <h3 v-else-if="!hasCoaches && !isLoading">No coaches found.</h3>
      </base-card>
    </section>
  </div>
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
      isLoading: false,
      error: null,
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    ...mapGetters('coaches', ['hasCoaches', 'isCoach']),
    isLoggedIn(){
      return this.$store.getters.isAuthenticated;
    },
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
  created() {
    this.loadCoaches(false);
  },
  methods: {
    closeModal() {
      this.error = null;
    },
    setFilters(updatedFilters) {
      this.filters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message ?? 'Someting went wrong!!';
      }
      this.isLoading = false;
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
