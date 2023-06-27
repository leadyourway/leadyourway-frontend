<script setup>
import moment from 'moment';
import HeaderComponent from '../components/HeaderComponent.vue';
import { userService } from '../services/user.service';
import { bicycleService } from '../services/bicycle.lyw.service';
import { cardService } from '../services/card.lyw.service';
</script>
<template>
  <head>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    />
  </head>

  <div class="header-component-wrapper">
    <HeaderComponent class="mb-5" />
  </div>

  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img class="rounded-circle" width="150" :src="user.image" alt="Admin" />
                <div class="mt-3">
                  <h4>{{ user.name }}</h4>
                  <p class="text-secondary mb-1">{{ user.email }}</p>
                  <p class="text-muted font-size-sm">
                    Miembro desde {{ moment(user.dateCreated).format('YYYY-MM-DD') }}
                  </p>
                  <button class="btn btn-primary">Cerrar Sesión</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card mt-3">
            <ul class="list-group list-group-flush">
              <h6 class="fw-normal m-3">Metodos de Pago</h6>
              <li
                class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
              >
                <i class="fa-brands fa-paypal fa-lg" style="color: #003087"></i>
                <span class="text-secondary">{{ user.name }}</span>
              </li>
              <li
                v-for="card in cards.data"
                class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
              >
                <i class="fa-brands fa-cc-visa" style="color: #1a1f71"></i>
                <p class="mb-0">{{ card.number[0] }}*** **** ****{{ card.number.slice(12) }}</p>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
              >
                <a href="/payment-method"
                  ><button class="btn btn-primary">Añadir Método</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Full Name</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ user.name }}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Email</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ user.email }}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Phone</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ user.phone }}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">BirthDate</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ moment(user.birthDate).format('YYYY-MM-DD') }}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-12">
                  <a href="/profile/update" class="btn btn-info" target="__blank">Edit Profile</a>
                </div>
              </div>
            </div>
          </div>

          <div class="row gutters-sm">
            <div class="col-sm-6 mb-3">
              <div class="card h-100">
                <div class="card-body"></div>
              </div>
            </div>
            <div class="col-sm-6 mb-3">
              <div class="card h-100">
                <div class="card-body"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  async mounted() {
    const id = localStorage.getItem('id');
    const hash = window.location.hash;

    if (!id) {
      this.$router.push('/login');
    }
    if (hash === '#login') {
      this.$toast.add({
        severity: 'success',
        summary: 'Exito',
        detail: 'Ingreso con exito!\nBienvendio a Lead Your Way!',
        life: 3000,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.$toast.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Ahora puede actualizar su perfil',
        life: 5000,
      });
    }
    await userService.getById(id).then((response) => {
      this.user = response;
    });
    await bicycleService.getByUserId(id).then((response) => {
      this.user.bicycles = response;
    });
    await cardService.getByUserId(id).then((response) => {
      this.cards = response;
    });
  },
  data() {
    return {
      user: {},
      cards: [],
    };
  },
  methods: {
    async logout() {
      localStorage.removeItem('id');
      this.$router.push('/home');
    },
    masCardNumber(number) {
      const maskedNumber = number.slice(-4).padStart(number.length, 'x');
      const formattedNumber = maskedNumber.replace(/(.{4})/g, '$1 - ');
      return formattedNumber.slice(0, -3);
    },
  },
};
</script>

<style scoped>
body {
  margin-top: 20px;
  color: #1a202c;
  text-align: left;
  background-color: #e2e8f0;
}
.main-body {
  padding: 15px;
}
.card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm > .col,
.gutters-sm > [class*='col-'] {
  padding-right: 8px;
  padding-left: 8px;
}
.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}
.h-100 {
  height: 100% !important;
}
.shadow-none {
  box-shadow: none !important;
}

.header-component-wrapper {
  padding: 5px;
  color: #6366f1;
}
</style>
