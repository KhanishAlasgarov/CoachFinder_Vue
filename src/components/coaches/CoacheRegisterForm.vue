<template>
  <form @submit.prevent="handleSubmit">
    <div
      class="form-control"
      :class="{ invalid: !formAction.firstName.isValid }"
    >
      <label for="firstname">Firstname</label>
      <input
        @input="clearValidate('firstName')"
        type="text"
        id="firstname"
        v-model.trim="formAction.firstName.val"
      />
      <p v-if="!formAction.firstName.isValid">Firstname must not be empty!</p>
    </div>

    <div
      class="form-control"
      :class="{ invalid: !formAction.lastName.isValid }"
    >
      <label for="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="formAction.lastName.val"
        @input="clearValidate('firstName')"
      />
      <p v-if="!formAction.lastName.isValid">Lastname must not be empty!</p>
    </div>

    <div
      class="form-control"
      :class="{ invalid: !formAction.description.isValid }"
    >
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="formAction.description.val"
      ></textarea>
      <p v-if="!formAction.description.isValid">
        Description must not be empty!
      </p>
    </div>

    <div class="form-control" :class="{ invalid: !formAction.rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="formAction.rate.val" />
      <p v-if="!formAction.rate.isValid">Add appropriate data!!</p>
    </div>

    <div class="form-control" :class="{ invalid: !formAction.areas.isValid }">
      <h3>Area of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="formAction.areas.val"
        />
        <label for="frontend">Frontend Development</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="formAction.areas.val"
        />
        <label for="backend">Backend Development</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="formAction.areas.val"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!formAction.areas.isValid">Select something!!</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      formAction: {
        firstName: {
          val: '',
          isValid: true,
        },
        lastName: {
          val: '',
          isValid: true,
        },
        description: {
          val: '',
          isValid: true,
        },
        rate: {
          val: '',
          isValid: true,
        },
        areas: {
          val: [],
          isValid: true,
        },
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidate(input) {
      if (!this.formAction[input].val) {
        this.formAction[input].isValid = false;
      } else {
        this.formAction[input].isValid = true;
      }
    },
    validateForm() {
      this.formIsValid = true;
      for (const key in this.formAction) {
        if (
          key == 'rate' &&
          (!this.formAction[key].val || this.formAction[key].val <= 0)
        ) {
          this.formIsValid = false;
          this.formAction[key].isValid = false;
        } else if (
          key == 'areas' &&
          (!this.formAction[key].val || this.formAction[key].val.length == 0)
        ) {
          this.formAction[key].isValid = false;
          this.formIsValid = false;
        } else if (!this.formAction[key].val) {
          this.formAction[key].isValid = false;
          this.formIsValid = false;
        }
      }
    },
    handleSubmit() {
      this.validateForm();
      if (this.formIsValid) {
        this.$emit('save-data', {
          firstName: this.formAction.firstName.val,
          lastName: this.formAction.lastName.val,
          description: this.formAction.description.val,
          hourlyRate: this.formAction.rate.val,
          areas: this.formAction.areas.val,
        });
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
