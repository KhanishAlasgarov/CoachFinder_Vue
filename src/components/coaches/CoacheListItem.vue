<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ hourlyRate }}/hour</h4>
    <div>
      <base-badge
        v-for="area of areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button
        mode="outline"
        link
        :to="{
          name: 'coachDetail',
          params: {
            id: this.id,
          },
        }"
        >View Details</base-button
      >
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
    </div>
  </li>
</template>

<script>
export default {
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    areas: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
