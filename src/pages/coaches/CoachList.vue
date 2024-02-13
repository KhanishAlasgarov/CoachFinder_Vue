<template>
  <section>
    Filter
  </section>
  <section>
<div class="controls">
  <button>Refresh</button>
  <router-link to="/register">Register as Coach</router-link>
</div>
    <ul v-if="hasCoaches">
      <li v-for="coach of filteredCoaches" :key="coach.id">
        {{ coach.firstName }}
      </li>
    </ul>
    <h3 v-else>No coaches found.</h3>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
  computed:{
    ...mapGetters('coaches',['hasCoaches']),
    filteredCoaches(){
      return this.$store.getters['coaches/getCoaches']
    }
  }
    
}</script>
