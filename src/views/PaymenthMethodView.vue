<template>
  <div>
    <app-user-header></app-user-header>
    <div class="container">
      <form @submit.prevent="onSubmit" ref="PaymentForm">
        <div class="row">
          <h1 class="title">Métodos de pago</h1>
          <div class="col">
            <div class="inputBox">
              <label for="nombre">Nombre completo :</label>
              <input
                v-model="PaymentData.name"
                type="text"
                id="nombre"
                placeholder="Example Name"
                required
                name="nombre"
              />
            </div>

            <div class="inputBox">
              <label for="card">Tarjetas que aceptamos :</label>
              <RadioButton
                v-model="PaymentData.cardType"
                name="cardType"
                value="Visa"
                inputId="visa"
              >
                Visa
              </RadioButton>
              <RadioButton
                v-model="PaymentData.cardType"
                name="cardType"
                value="Mastercard"
                inputId="mastercard"
              >
                Mastercard
              </RadioButton>
            </div>
            <div class="inputBox">
              <label for="numero_tarjeta">Número de tarjeta :</label>
              <input
                v-model="PaymentData.cardNumber"
                type="text"
                id="numero_tarjeta"
                placeholder="1111-2222-3333-4444"
                required
              />
            </div>
            <div class="inputBox">
              <label for="nombre_tarjeta">Nombre de su tarjeta :</label>
              <input
                v-model="PaymentData.cardHolder"
                type="text"
                id="nombre_tarjeta"
                placeholder="Example card name"
                required
              />
            </div>
          </div>

          <div class="col">
            <div class="inputBox">
              <label for="email">Correo electrónico :</label>
              <input
                v-model="PaymentData.email"
                type="email"
                id="correo"
                placeholder="example@example.com"
                required
              />
            </div>
            <div class="flex">
              <div class="inputBox">
                <label for="año_exp">Año de exp :</label>
                <input
                  v-model="PaymentData.exp_year"
                  type="text"
                  id="año_exp"
                  placeholder="2022"
                  required
                />
              </div>
              <div class="inputBox">
                <label for="mes_exp">Mes de exp :</label>
                <input
                  v-model="PaymentData.exp_month"
                  type="text"
                  id="mes_exp"
                  placeholder="05"
                  required
                />
              </div>
            </div>
            <div class="inputBox" style="margin-top: 0">
              <label for="cvv">CVV :</label>
              <input v-model="PaymentData.cvv" type="text" id="cvv" placeholder="1234" required />
            </div>
          </div>
        </div>
        <Button type="submit" class="submit-btn btn-primary"> Añadir método </Button>
      </form>
    </div>
  </div>
</template>

<script>
import { cardService } from '../services/card.lyw.service';

export default {
  name: 'PaymentMethodView',
  async mounted() {
    const id = localStorage.getItem('id');
  },
  data() {
    return {
      PaymentData: {
        name: '',
        cardNumber: '',
        cardHolder: '',
        email: '',
        exp_year: '',
        exp_month: '',
        cvv: '',
        cardType: '',
      },
      userId: localStorage.getItem('id'),
    };
  },
  methods: {
    async onSubmit() {
      if (!(await this.validForm())) return;
      try {
        await this.createCard();
        this.successToast();
        await new Promise((resolve) => setTimeout(resolve, 3000));
        this.$router.push('/profile');
      } catch (error) {
        this.errorToast('Hubo un error al crear el método de pago');
      }
    },
    async validForm() {
      if (!this.PaymentData.name) {
        this.errorToast('Por favor ingrese su nombre completo');
        return false;
      }

      if (!this.PaymentData.cardNumber.length === 16) {
        this.errorToast('Número de tarjeta no tiene 16 dígitos');
        return false;
      }

      if (!this.PaymentData.cardHolder) {
        this.errorToast('Por favor ingrese el nombre de su tarjeta');
        return false;
      }

      if (!isValidEmail(this.PaymentData.email)) {
        this.errorToast('Correo electrónico inválido');
        return false;
      }

      const expYear = parseInt(this.PaymentData.exp_year, 10);
      const expMonth = parseInt(this.PaymentData.exp_month, 10);
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        this.errorToast('La tarjeta ha expirado');
        return false;
      }

      if (!/^\d{3,4}$/.test(this.PaymentData.cvv)) {
        this.errorToast('CVV inválido');
        return false;
      }

      return true;
    },
    async createCard() {
      try {
        const cardData = {
          name: this.PaymentData.name,
          number: this.PaymentData.cardNumber,
          expirationDate: `${this.PaymentData.exp_year}-${this.PaymentData.exp_month}-01T00:00:00.000Z`,
          cvv: this.PaymentData.cvv,
          type: this.PaymentData.cardType,
          userId: this.userId,
        };
        const response = await cardService.create(cardData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async successToast() {
      this.$toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Método de pago creado',
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
  },
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap');
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  background-color: #f2f2f2;
  font-family: 'Montserrat', sans-serif;
}

.container form {
  max-width: 500px;
  background: #fff;
  border: 2px solid #d78477;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.container form .row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.container form .row .col {
  flex: 1 1 50%;
}

.container form .row .col .inputBox {
  margin-bottom: 15px;
}

.container form .row .col .inputBox label {
  display: block;
  margin-bottom: 5px;
  font-weight: 700;
}

.container form .row .col .inputBox input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px 15px;
  font-size: 15px;
}

.container form .row .col .inputBox input:focus {
  border: 1px solid #d78477;
}

.container form .row .col .inputBox img {
  height: 30px;
  margin-top: 5px;
  filter: drop-shadow(0 0 1px #000);
  transition: transform 0.2s ease-in-out;
}

.container form .row .col .inputBox img:hover {
  transform: scale(1.1);
}

.container form .row .col .inputBox img:active {
  transform: scale(0.9);
}

.container form .row .col .flex {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.container form .submit-btn {
  width: 100%;
  padding: 12px;
  font-size: 17px;
  margin-top: 10px;
  background-color: #d78477;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-in-out;
}

.container form .submit-btn:hover {
  background-color: #c47065;
}

.container form .submit-btn:active {
  background-color: #e49d8f;
}
</style>
