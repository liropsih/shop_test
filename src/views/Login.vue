<template>
<div class="row pt-5 ml-5 mr-5">
  <form class="card auth-card col s12 m8 l6 offset-m2 offset-l3" @submit.prevent="loginHandler">
    <div class="card-content">
      <span class="card-title">NodeJS + VUE - Test Shop</span>
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
          :class="{invalid:$v.password.$dirty && !$v.password.required}"
        />
        <label for="password">Пароль</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
          >Пароль не должен быть пустым</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="waves-effect waves-light btn red lighten-1"
          type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/registration">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
  </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { email, required },
    password: { required }
  },
  methods: {
    ...mapActions(['login']),
    async loginHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const data = {
        email: this.email,
        password: this.password
      }

      try {
        await this.login(data)
        this.$router.push('/profile')
      } catch (e) { }
    }
  }
}
</script>
