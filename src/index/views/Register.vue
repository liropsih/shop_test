<template>
  <form class="card auth-card" @submit.prevent="register">
    <div class="card-content">
      <span class="card-title">Laravel Test Shop</span>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="name">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
          >Имя не должно быть пустым</small
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
          >Поле Email не должно быть пустым</small
        >
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
          >Введите корректный Email</small
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
          >Поле Password не должно быть пустым</small
        >
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
          >Пароль должен содержать не менее
          {{ $v.password.$params.minLength.min }} символов. Сейчас он
          {{ password.length }}</small
        >
      </div>
      <!-- 
      <div class="input-field">
        <select v-model="is_admin" ref="adminselect" class="no-autoinit">
          <option value="0">Нет</option>
          <option value="1">Да</option>
        </select>
        <label>Админ?</label>
      </div> -->

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

export default {
  //   metaInfo () {
  //     return {
  //       title: this.$title('Register')
  //     }
  //   },
  name: 'register',
  data: () => ({
    name: '',
    email: '',
    password: '',
    // password_confirmation: '',
    agree: false,
    // is_admin: null
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v }
  },
  mounted() {
    // M.FormSelect.init(this.$refs.adminselect)
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async register() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/dashboard')
      } catch (e) { }
    }
  }
}
</script>
