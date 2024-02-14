<template>
  <base-card>
    <h2>Find your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" @change="setFilter" checked />
      <label for="frontend">Frontend</label>
    </span>

    <span class="filter-option">
      <input type="checkbox" @change="setFilter" id="backend" checked />
      <label for="backend">Backend</label>
    </span>

    <span class="filter-option">
      <input type="checkbox" @change="setFilter" id="career" checked />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  emits: ['change-filter'],
  methods: {
    setFilter(event) {
      const id = event.target.id;
      const isActive = event.target.checked;

      this.filters = {
        ...this.filters,
        [id]: isActive,
      };

      this.$emit('change-filter', this.filters);
    },
  },
};
</script>
<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
  user-select: none;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
