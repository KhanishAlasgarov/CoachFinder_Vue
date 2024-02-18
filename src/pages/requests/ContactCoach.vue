<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-control" :class="{ errors: !formData.email.isValid }">
      <label for="email">Your E-Mail</label>
      <input
        type="email"
        id="email"
        v-model="formData.email.val"
        @input="setValidateState('email')"
      />
    </div>
    <div class="form-control" :class="{ errors: !formData.message.isValid }">
      <label for="message">Message</label>
      <textarea
        id="message"
        rows="5"
        v-model="formData.message.val"
        @input="setValidateState('message')"
      ></textarea>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      formData: {
        email: {
          val: null,
          isValid: true,
        },
        message: {
          val: null,
          isValid: true,
        },
      },
      formIsValid: true,
    };
  },
  methods: {
    setValidateState(input) {
      if (!this.formData[input].val) {
        this.formData[input].isValid = false;
      } else {
        this.formData[input].isValid = true;
      }
    },
    validateForm() {
      this.formIsValid = true;
      for (const key in this.formData) {
        if (!this.formData[key].val) {
          this.formIsValid = false;
          this.formData[key].isValid = false;
        }
      }
    },
    handleSubmit() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      this.$store.dispatch('requests/addRequest', {
        coachId: this.id,
        email: this.formData.email.val,
        message: this.formData.message.val,
      });
      this.$router.replace('/');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
