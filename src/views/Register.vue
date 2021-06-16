<template>
  <form class="card auth-card" @submit.prevent="register">
    <div class="card-content">
      <span class="card-title">NodeJS + VUE - Test Shop</span>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: ($v.name.$dirty && !$v.name.required) ||
              ($v.name.$dirty && !$v.name.minLength) }"
        />
        <label for="name">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
          >Имя не должно быть пустым</small
        >
        <small
          v-if="$v.name.$dirty && !$v.name.minLength"
          class="helper-text invalid"
          >Имя должно содержать не менее
          {{ $v.name.$params.minLength.min }} символов</small
        >
      </div>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
          >Email не должен быть пустым</small
        >
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
          >Некорректный Email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
        />
        <label for="password">Пароль</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
          >Пароль не должен быть пустым</small
        >
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
          >Пароль должен содержать не менее
          {{ $v.password.$params.minLength.min }} символов</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="waves-effect waves-light btn red lighten-1"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import messages from '@/utils/messages'
import { email, required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  //   metaInfo () {
  //     return {
  //       title: this.$title('Register')
  //     }
  //   },
  name: 'Register',
  data: () => ({
    name: '',
    email: '',
    password: '',
    // password_confirmation: '',
    agree: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required, minLength: minLength(2) },
    agree: { checked: v => v }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    ...mapActions(['register']),
    async register() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      try {
        await this.register(data)
        this.$router.push('/profile')
      } catch (e) { }
    }
  }
}
</script>
