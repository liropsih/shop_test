<template>
  <div class="Profile" ref="Profile">
    <div class="page-title pb-3">
      <h4>Профиль</h4>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="row">
        <div class="input-field col s12 m4">
          <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{
              invalid:
                ($v.name.$dirty && !$v.name.required) ||
                ($v.name.$dirty && !$v.name.minLength),
            }"
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
        <div class="input-field col s12 m4">
          <input
            id="lastname"
            type="text"
            v-model.trim="lastname"
            :class="{ invalid: $v.lastname.$dirty && !$v.lastname.minLength }"
          />
          <label for="lastname">Фамилия</label>
          <small
            v-if="$v.lastname.$dirty && !$v.lastname.minLength"
            class="helper-text invalid"
            >Фамилия должна содержать не менее
            {{ $v.lastname.$params.minLength.min }} символов</small
          >
        </div>
        <div class="input-field col s12 m4">
          <input
            id="patronymic"
            type="text"
            v-model.trim="patronymic"
            :class="{
              invalid: $v.patronymic.$dirty && !$v.patronymic.minLength,
            }"
          />
          <label for="patronymic">Отчество</label>
          <small
            v-if="$v.patronymic.$dirty && !$v.patronymic.minLength"
            class="helper-text invalid"
            >Отчество должно содержать не менее
            {{ $v.patronymic.$params.minLength.min }} символов</small
          >
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m4">
          <input
            id="email"
            type="email"
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
        <div class="input-field col s12 m4">
          <input
            id="phone"
            type="text"
            ref="phone"
            v-mask="'+7 (###) ###-##-##'"
            v-model.trim="phone"
            :class="{
              invalid:
                $v.phone.$dirty && (!$v.phone.minLength || !$v.phone.maxLength),
            }"
          />
          <label for="phone">Телефон</label>
          <small
            v-if="
              $v.phone.$dirty && (!$v.phone.minLength || !$v.phone.maxLength)
            "
            class="helper-text invalid"
            >Некорректный номер телефона</small
          >
        </div>
        <div
          class="input-field col s12 m4"
          :class="birthdateInactive && 'inactive'"
        >
          <input
            id="birthdate"
            type="text"
            class="datepicker"
            ref="datepicker"
            v-model.lazy="birthdate"
            placeholder="дд.мм.гггг"
            :class="{
              invalid:
                $v.birthdate.$dirty &&
                (!$v.birthdate.minLength || !$v.birthdate.maxLength),
            }"
          />
          <label for="birthdate">Дата рождения</label>
          <!-- <label
            class="label-icon right pointer"
            for="birthdate"
            @click="datepicker.open()"
            ><i class="material-icons">event</i></label
          > -->
          <small
            v-if="
              $v.birthdate.$dirty &&
              (!$v.birthdate.minLength || !$v.birthdate.maxLength)
            "
            class="helper-text invalid"
            >Некорректная дата</small
          >
          <small v-else-if="!birthdate" class="helper-text"
            >Дату рождения нельзя будет изменить после сохранения</small
          >
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m4">
          <input
            id="oldPassword"
            type="password"
            v-model.trim="oldPassword"
            :class="{
              invalid:
                ($v.oldPassword.$dirty || $v.newPassword.$dirty) &&
                !$v.oldPassword.required,
            }"
          />
          <label for="oldPassword">Старый пароль</label>
          <small
            v-if="
              ($v.oldPassword.$dirty || $v.newPassword.$dirty) &&
              !$v.oldPassword.required
            "
            class="helper-text invalid"
            >Пароль не должен быть пустым</small
          >
        </div>
        <div class="input-field col s12 m4">
          <input
            id="newPassword"
            type="password"
            v-model.trim="newPassword"
            :class="{
              invalid:
                (($v.oldPassword.$dirty || $v.newPassword.$dirty) &&
                  !$v.newPassword.required) ||
                (($v.oldPassword.$dirty || $v.newPassword.$dirty) &&
                  !$v.newPassword.minLength) ||
                (($v.oldPassword.$dirty || $v.newPassword.$dirty) &&
                  !$v.newPassword.sameAs),
            }"
          />
          <label for="newPassword">Новый пароль</label>
          <small
            v-if="
              ($v.oldPassword.$dirty || $v.newPassword.$dirty) &&
              !$v.newPassword.required
            "
            class="helper-text invalid"
            >Пароль не должен быть пустым</small
          >
          <small
            v-else-if="
              ($v.oldPassword.$dirty || $v.newPassword.$dirty) &&
              !$v.newPassword.minLength
            "
            class="helper-text invalid"
            >Пароль должен содержать не менее
            {{ $v.newPassword.$params.minLength.min }} символов</small
          >
          <small
            v-else-if="
              ($v.oldPassword.$dirty || $v.newPassword.$dirty) &&
              !$v.newPassword.sameAs
            "
            class="helper-text invalid"
            >Новый пароль должен отличаться от старого</small
          >
        </div>
      </div>
      <button class="btn waves-effect waves-light red lighten-1" type="submit">
        Сохранить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import $axios from '@/http'
import { email, required, requiredUnless, minLength, maxLength, sameAs, not } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'Profile',
  data: () => ({
    name: '',
    lastname: '',
    patronymic: '',
    email: '',
    phone: '',
    birthdate: '',
    birthdateInactive: false,
    oldPassword: '',
    newPassword: '',
    datepicker: {}
  }),
  validations: {
    name: { required, minLength: minLength(2) },
    lastname: { minLength: minLength(2) },
    patronymic: { minLength: minLength(2) },
    email: { required, email },
    phone: { minLength: minLength(18), maxLength: maxLength(18) },
    birthdate: { minLength: minLength(10), maxLength: maxLength(10) },
    oldPassword: {
      required: requiredUnless(function () { return (!!this.newPassword === !!this.oldPassword) })
    },
    newPassword: {
      required: requiredUnless(function () { return (!!this.newPassword === !!this.oldPassword) }),
      minLength: minLength(6),
      sameAs: not(sameAs(function () { return this.oldPassword }))
    }
  },
  async mounted() {
    await this.getUserInfo()
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  watch: {
    phone(value) {
      if (value) {
        let val = value
        if (val[0] === '8') {
          val = val.replace('8', '+7')
        }
        if (val.replace(/[^0-9]+/g, '') === '789') {
          val = '79'
        }
        this.phone = val
      }
    }
  },
  destroyed() {
    this.datepicker?.destroy && this.datepicker.destroy()
  },
  methods: {
    ...mapActions(['authCheck', 'setError', 'setMessage']),
    // dateFilter(date) {
    //   const options = {
    //     day: '2-digit',
    //     month: '2-digit',
    //     year: 'numeric'
    //   }
    //   return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date))
    // },
    datepickerInit(el) {
      M.Datepicker.init(el, {
        firstDay: 1,
        yearRange: [new Date().getFullYear() - 100, new Date().getFullYear() - 14],
        showClearBtn: true,
        format: 'dd.mm.yyyy',
        i18n: {
          cancel: 'Закрыть',
          clear: 'Очистить',
          done: 'Ок',
          months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
          ],
          monthsShort: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек'
          ],
          weekdays: [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
          ],
          weekdaysShort: [
            'Вс',
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб'
          ],
          weekdaysAbbrev: [
            'Вс',
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб'
          ]
        },
      })
      this.datepicker = M.Datepicker.getInstance(el)
    },
    async getUserInfo() {
      try {
        const { data } = await $axios.get('/api/user/info')
        this.name = data.name
        this.lastname = data.lastname
        this.patronymic = data.patronymic
        this.email = data.email
        this.phone = data.phone
        if (data.birthdate) {
          this.birthdate = data.birthdate
          this.birthdateInactive = true
        } else {
          this.datepickerInit(this.$refs.datepicker)
        }
      } catch (e) {
        this.setError(e)
      }
    },
    phoneClean() {
      return this.phone ? this.phone.replace(/[^+,0-9]/g, '') : null
    },
    async submitHandler() {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const data = {
          name: this.name,
          lastname: this.lastname,
          patronymic: this.patronymic,
          email: this.email,
          phone: this.phoneClean(),
          birthdate: (this.birthdateInactive || !this.birthdate) ? undefined : this.birthdate,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        }
        const message = await $axios.post('/api/user/update_info', data)
        this.birthdateInactive = !!this.birthdate
        await this.authCheck()
        this.setMessage(message)
      } catch (e) {
        this.setError(e)
      }
    }
  }
}
</script>