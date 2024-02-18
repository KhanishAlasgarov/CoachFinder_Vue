<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullname }}</h2>
        <h3>${{ selectedCoache.hourlyRate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button
            link
            :to="{
              name: 'contact',
              params: {
                id: this.id,
              },
            }"
            >Contact</base-button
          >
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area of selectedCoache.areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ selectedCoache.description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoache: null,
    };
  },
  computed: {
    fullname() {
      return `${this.selectedCoache.firstName} ${this.selectedCoache.lastName}`;
    },
  },
  created() {
    const coaches = this.$store.getters['coaches/getCoaches'];

    this.selectedCoache = coaches.find((x) => x.id == this.id);
  },
};
</script>
