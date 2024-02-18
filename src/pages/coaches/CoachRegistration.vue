<template>
  <section>
    <base-card>
      <h2>Register as a coach now!!</h2>
      <coache-register-form @save-data="getFormData"> </coache-register-form
    ></base-card>
  </section>
</template>

<script>
import CoacheRegisterForm from '../../components/coaches/CoacheRegisterForm.vue';
export default {
  components: {
    CoacheRegisterForm,
  },
  methods:{
    getFormData(data){
      this.$store.dispatch('coaches/registerCoache',data);
      this.$router.replace('/');
    }
  }
};
</script>
