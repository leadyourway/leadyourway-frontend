<script setup></script>

<template>
  <div class="justify-content-center flex justify-center align-items-center h-screen">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <img src="@/assets/img/lywlogo.png" alt="Lead Your Way logo" height="50" class="mb-3" />
        <div class="text-900 text-3xl font-medium mb-3">{{ $t('loginpage-welcome') }}</div>
        <span class="text-600 font-medium line-height-3">{{ $t('loginpage-message2') }}</span>
        <a class="font-medium no-underline ml-2 text-orange-500 cursor-pointer" href="/signup">{{
          $t('login')
        }}</a>
      </div>

      <div>
        <label for="name1" class="block text-900 font-medium mb-2">{{
          $t('loginpage-name')
        }}</label>
        <InputText id="name1" type="text" class="w-full mb-3" v-model="name" />

        <label for="email1" class="block text-900 font-medium mb-2">{{
          $t('loginpage-email')
        }}</label>
        <InputText id="email1" type="text" class="w-full mb-3" v-model="email" />

        <label for="password1" class="block text-900 font-medium mb-2">{{
          $t('loginpage-password')
        }}</label>
        <InputText id="password1" type="password" class="w-full mb-3" v-model="password1" />

        <label for="password2" class="block text-900 font-medium mb-2">{{
          $t('loginpage-repeatpassword')
        }}</label>
        <InputText id="password2" type="password" class="w-full mb-3" v-model="password2" />

        <div class="flex align-items-center justify-content-between mb-6">
          <a class="font-medium no-underline ml-2 text-orange-500 text-right cursor-pointer">{{
            $t('signup-seepassword')
          }}</a>
        </div>

        <Button
          :label="$t('register')"
          icon="pi pi-user"
          class="w-full bg-orange-400 border-orange-200"
          @click="onSubmit()"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script>
import { userService } from '../services/user.service';
export default {
  data: () => ({
    checked: false,
  }),
  methods: {
    async onSubmit() {
      if (!(await this.validForm())) return;
      if (!(await this.createUser())) {
        this.errorToast('Hubo un error al crear la cuenta');
        return;
      }
      this.successToast();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.$router.push('/profile#login');
    },
    async successToast() {
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Logged in',
        life: 3000,
      });
    },
    async errorToast(message) {
      this.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 3000,
      });
    },
    async validForm() {
      if (this.name == null || this.email == null || this.password1 == null) {
        await this.errorToast('Llena los campos indicados');
        return false;
      }
      if (this.name == '' || this.email == '' || this.password1 == '') {
        await this.errorToast('Llena los campos indicados');
        return false;
      }
      if (this.password1 != this.password2) {
        await this.errorToast('Las contraseñas no coinciden');
        return false;
      }
      if (this.email.indexOf('@') == -1) {
        await this.errorToast('El correo no es válido');
        return false;
      }
      if (this.password1.length < 5) {
        await this.errorToast('La contraseña debe tener al menos 5 caracteres');
        return false;
      }
      return true;
    },
    async createUser() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password1,
        phone: '999888777',
        image: 'https://robohash.org/' + this.name,
        birthDate: '2000-01-01',
      };
      const dataID = {
        email: this.email,
        password: this.password1,
      };
      try {
        await userService.signup(user);
        const response = await userService.loginrev1(dataID);
        localStorage.setItem('id', response.id);
        localStorage.setItem('jwt', response.token);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
</script>
