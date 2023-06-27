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
  <div v-if="bicycle" class="principal-container">
    <div class="container d-lg-flex">
      <div class="box-1 bg-light user">
        <div class="d-flex align-items-center mb-3 custom-div">
          <img
            src="https://images.pexels.com/photos/4925916/pexels-photo-4925916.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            class="pic rounded-circle"
            alt=""
          />
          <p class="ps-2 name">Oliver</p>
        </div>
        <div class="box-inner-1 pb-3 mb-3">
          <div class="d-flex justify-content-between mb-3 userdetails">
            <p class="fw-bold">Bicicleta a rentar: {{ bicycle.name }}</p>
            <p class="fw-lighter"><span class="fas fa-dollar-sign"></span>{{ bicycle.price }}</p>
          </div>
          <div id="my" class="carousel slide carousel-fade img-details" data-bs-interval="2000">
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#my"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#my"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#my"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img :src="bicycle.image" class="d-block w-100" />
              </div>
              <div class="carousel-item">
                <img src="https://i.imgflip.com/20qjbb.jpg" class="d-block w-100 h-100" />
              </div>
              <div class="carousel-item">
                <img
                  src="https://i.kym-cdn.com/photos/images/original/002/449/093/854.jpg"
                  class="d-block w-100"
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#my"
              data-bs-slide="prev"
            >
              <div class="icon">
                <span class="fas fa-arrow-left"></span>
              </div>
              <span class="visually-hidden">Previous</span>
            </button>

            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#my"
              data-bs-slide="next"
            >
              <div class="icon">
                <span class="fas fa-arrow-right"></span>
              </div>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <p class="dis info my-3">
            Bicicleta de acero. Esta bicicleta de acero es ideal para viajar y disfrutar de
            aventuras al aire libre. Con un diseño resistente y duradero, te brinda estabilidad y
            confianza en cada trayecto.
          </p>
          <p class="fw-bold">Aplicar Seguro</p>
          <div class="radiobtn">
            <input type="checkbox" class="btn-check" autocomplete="off" name="box" id="one" />
            <input type="checkbox" class="btn-check" autocomplete="off" name="box" id="two" />
            <input type="checkbox" class="btn-check" autocomplete="off" name="box" id="three" />

            <label for="one" class="box py-2 first" @click="calculatePrice(0)">
              <div class="d-flex align-items-start">
                <span class="circle"></span>
                <div class="course">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <p class="fw-bold">Seguro de Responsabilidad Civil</p>
                    <p><span class="fas fa-dollar-sign"></span>19</p>
                  </div>
                  <span
                    >Cubre daños a terceros en caso de accidentes relacionados a las
                    bicicletas</span
                  >
                </div>
              </div>
            </label>
            <label for="two" class="box py-2 second" @click="calculatePrice(1)">
              <div class="d-flex">
                <span class="circle"></span>
                <div class="course">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="fw-bold"> Seguro contra Robo o Pérdida </span>
                    <p><span class="fas fa-dollar-sign"></span>29</p>
                  </div>
                  <span
                    >Proporciona cobertura en caso de robo o pérdida de las bicicletas
                    arrendadas.</span
                  >
                </div>
              </div>
            </label>
            <label for="three" class="box py-2 third" @click="calculatePrice(2)">
              <div class="d-flex">
                <span class="circle"></span>
                <div class="course">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="fw-bold"> Seguro de Daños o Accidentes </span>
                    <p><span class="fas fa-dollar-sign"></span>39</p>
                  </div>
                  <span
                    >Cubre daños materiales y lesiones personales a los arrendatarios en caso de
                    accidentes con las bicicletas.</span
                  >
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="box-2">
        <div class="box-inner-2">
          <div>
            <p class="my-2 fw-bold">Detalles del Pago</p>
            <p class="dis mb-3">Complete su compra y seleccione su método de pago.</p>
          </div>
          <form action="">
            <div class="mb-3">
              <p class="dis fw-bold mb-2">Email address</p>
              <input class="form-control" type="email" />
            </div>
            <div class="my-3 cardname">
              <p class="dis fw-bold mb-2">Cardholder name</p>
              <input class="form-control" type="text" />
            </div>
            <div>
              <p class="dis fw-bold mb-2">Seleccione una tarjeta</p>

              <div v-for="card in cards" class="card card-atm border rounded mt-3">
                <div class="card-body">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="card"
                      :id="card.id"
                      @click="selectCard(card.id)"
                    />
                    <label class="form-check-label" :for="card.id">
                      <div class="d-flex align-items-xxl-center">
                        <div
                          :class="`fab fa-cc-${card.type == 'visa' ? 'visa' : 'mastercard'}`"
                        ></div>
                        <div class="card-details">
                          <span class="card-name">{{ card.name }}</span>
                          <br />
                          <span class="card-info">{{ card.number }}</span>
                          <br />
                          <span class="card-expiry">{{ card.expirationDate }}</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div class="my-3 address">
                <p class="dis fw-bold mb-3">Billing address</p>
                <select class="form-select" aria-label="Default select example">
                  <option selected hidden>Lima</option>
                  <option value="1">Ayacucho</option>
                  <option value="2">Cuzco</option>
                  <option value="3">Arequipa</option>
                </select>
                <div class="d-flex">
                  <input class="form-control zip" type="text" placeholder="CP" />
                  <input class="form-control state" type="text" placeholder="Provincia" />
                </div>

                <div class="my-3 d-flex flex-column dis">
                  <p class="dis fw-bold mb-3">Resumen</p>
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <p>Subtotal (precio de la bicicleta * numero de días)</p>
                    <p><span class="fas fa-dollar-sign"></span>{{ subTotal }}</p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <p>Seguros</p>
                    <p><span class="fas fa-dollar-sign"></span>{{ insuranceTotal }}</p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <p class="fw-bold">Total</p>
                    <p class="fw-bold"><span class="fas fa-dollar-sign"></span>{{ total }}</p>
                  </div>
                  <button
                    :disabled="!this.selectedCard"
                    @click.prevent="rentBicycle()"
                    class="btn btn-primary mt-2"
                  >
                    Pagar S/.{{ total }}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bicycleService } from '../services/bicycle.lyw.service';
import { rentService } from '../services/rent.lyw.service';
import { cardService } from '../services/card.lyw.service';
export default {
  data() {
    return {
      bicycle: undefined,
      liabilityInsurance: false,
      theftInsurance: false,
      accidentInsurance: false,
      subTotal: 0.0,
      insuranceTotal: 0.0,
      total: 0.0,
      selectedCard: null,
      cards: [],
    };
  },

  methods: {
    calculatePrice(insuranceId = -1) {
      switch (insuranceId) {
        case 0:
          this.liabilityInsurance = !this.liabilityInsurance;
          break;
        case 1:
          this.theftInsurance = !this.theftInsurance;
          break;
        case 2:
          this.accidentInsurance = !this.accidentInsurance;
          break;
      }
      const startDate = localStorage.getItem('startDate');
      const endDate = localStorage.getItem('endDate');
      const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
      this.subTotal = this.bicycle.price * days;
      this.insuranceTotal = 0.0;
      if (this.liabilityInsurance) {
        this.insuranceTotal += 19.0;
      }
      if (this.theftInsurance) {
        this.insuranceTotal += 29.0;
      }
      if (this.accidentInsurance) {
        this.insuranceTotal += 39.0;
      }
      this.total = this.subTotal + this.insuranceTotal;
    },
    rentBicycle() {
      console.log('renting bicycle');
      const startDate = localStorage.getItem('startDate');
      const endDate = localStorage.getItem('endDate');
      if (!this.selectCard) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Seleccione una tarjeta',
          life: 3000,
        });
        return;
      }
      const rent = {
        startDate: startDate,
        endDate: endDate,
        totalPrice: this.total,
        cardId: this.selectedCard,
        bicycleId: this.bicycle.id,
      };
      console.log(rent);
      rentService.create(rent).then(
        (response) => {
          this.$router.push('/search');
          console.log(response);
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Bicicleta rentada exitosamente',
            life: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un error al rentar la bicicleta',
            life: 3000,
          });
        }
      );
    },
    getCards() {
      const id = localStorage.getItem('id');
      cardService.getByUserId(id).then((response) => {
        this.cards = response.data;
        this.cards.forEach((card) => {
          card.expirationDate =
            card.expirationDate.slice(5, 7) + '/' + card.expirationDate.slice(2, 4);
        });
        console.log(this.cards);
      });
    },

    getBicycle() {
      const bicycleId = localStorage.getItem('bicycleId');
      if (bicycleId.length > 0) {
        bicycleService.getById(bicycleId).then((response) => {
          this.bicycle = response;
          this.calculatePrice();
        });
      }
    },

    selectCard(cardId) {
      this.selectedCard = cardId;
    },
  },

  mounted() {
    this.getBicycle();
    this.getCards();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: 'Montserrat', sans-serif;
}

p {
  margin: 0%;
}

.container {
  max-width: 900px;
  margin: 20px auto;
  overflow: hidden;
  background-color: #f8f9fa;
  border: 3px solid #d78477;
  border-radius: 10px;
}

.box-1 {
  max-width: 450px;
  padding: 10px 40px;
  user-select: none;
}

.box-1 div .fs-12 {
  font-size: 8px;
  color: white;
}

.box-1 div .fs-14 {
  font-size: 15px;
  color: white;
}

.box-1 img.pic {
  width: 20px;
  height: 20px;
  object-fit: cover;
}

.box-1 img.mobile-pic {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.box-1 .name {
  font-size: 11px;
  font-weight: 600;
}

.dis {
  font-size: 12px;
  font-weight: 500;
}

label.box {
  width: 100%;
  font-size: 12px;
  background: #ddd;
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid transparent;
}

.card.card-atm {
  width: 350px;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.card-body {
  padding: 1rem;
}

.form-check {
  display: flex;
  align-items: center;
}

.form-check-input {
  margin-right: 0.5rem;
}

.fab.fa-cc-visa {
  font-size: 24px;
  color: #333;
  margin-right: 1rem;
}

.fab.fa-cc-mastercard {
  font-size: 24px;
  color: #333;
  margin-right: 1rem;
}

.card-details {
  flex-grow: 1;
}

.card-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.card-info {
  font-size: 16px;
  margin-bottom: 0.5rem;
  color: #777;
}

.card-number {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

#one:checked ~ label.first,
#two:checked ~ label.second,
#three:checked ~ label.third {
  border: 2px solid #d78477;
}

/* #one:checked ~ label.first .circle,
  #two:checked ~ label.second .circle,
  #three:checked ~ label.third .circle {
    border-color: #d78477;
    background-color: #fff;
  } */

label.box .course {
  width: 100%;
}

/* label.box .circle {
    height: 12px;
    width: 12px;
    background: #ccc;
    border-radius: 50%;
    margin-right: 15px;
    border: 4px solid transparent;
    display: inline-block;
  } */

.form-check-input:checked {
  background-color: #e67665;
  border-color: #e67665;
}

.box-2 {
  max-width: 450px;
  padding: 10px 40px;
}

.box-2 .box-inner-2 input.form-control {
  font-size: 12px;
  font-weight: 600;
}

.box-2 .box-inner-2 .inputWithIcon {
  position: relative;
}

.box-2 .box-inner-2 .inputWithIcon span {
  position: absolute;
  left: 15px;
  top: 8px;
}

.box-2 .box-inner-2 .inputWithcheck {
  position: relative;
}

.box-2 .box-inner-2 .inputWithcheck span {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: green;
  font-size: 12px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 15px;
  top: 6px;
}

.form-control:focus,
.form-select:focus {
  box-shadow: none;
  outline: none;
  border: 1px solid #d78477;
}

.border:focus-within {
  border: 2px solid #d78477 !important;
}

.box-2 .card-atm .form-control {
  border: none;
  box-shadow: none;
}

.form-select {
  border-radius: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.address .form-control.zip {
  border-radius: 0;
  border-bottom-left-radius: 10px;
}

.address .form-control.state {
  border-radius: 0;
  border-bottom-right-radius: 10px;
}

.box-2 .box-inner-2 .btn.btn-outline-primary {
  width: 120px;
  padding: 10px;
  font-size: 11px;
  padding: 0% !important;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 0;
  background-color: whitesmoke;
  color: black;
  font-weight: 600;
}

.box-2 .box-inner-2 .btn.btn-primary {
  background-color: #d78477;
  color: whitesmoke;
  font-size: 14px;
  display: flex;
  align-items: center;
  font-weight: 600;
  justify-content: center;
  border: none;
  padding: 10px;
}

.box-2 .box-inner-2 .btn.btn-primary:hover {
  background-color: #e67665;
}

.box-2 .box-inner-2 .btn.btn-primary .fas {
  font-size: 13px !important;
  color: whitesmoke;
}

.carousel-indicators [data-bs-target] {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.carousel-inner {
  width: 100%;
  height: 250px;
}

.carousel-item img {
  object-fit: cover;
  height: 100%;
}

.carousel-control-prev {
  transform: translateX(-50%);
  opacity: 1;
}

.carousel-control-prev:hover .fas.fa-arrow-left {
  transform: translateX(-5px);
}

.carousel-control-next {
  transform: translateX(50%);
  opacity: 1;
}

.carousel-control-next:hover .fas.fa-arrow-right {
  transform: translateX(5px);
}

.fas.fa-arrow-left,
.fas.fa-arrow-right {
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.icon {
  width: 30px;
  height: 30px;
  background-color: #f8f9fa;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transform-origin: center;
  opacity: 1;
}

.fas,
.fab {
  color: #6d6c6d;
}

::placeholder {
  font-size: 12px;
}

@media (max-width: 992px) {
  .container {
    max-width: 700px;
    margin: 10px auto;
  }

  .box-1,
  .box-2 {
    max-width: 600px;
    padding: 20px 90px;
    margin: 20px auto;
  }
}

@media (max-width: 526px) {
  .box-1,
  .box-2 {
    max-width: 400px;
    padding: 20px 10px;
  }

  ::placeholder {
    font-size: 9px;
  }
  .container {
    max-width: 900px;
    margin: 20px auto;
    overflow: hidden;
    background-color: #f8f9fa;
    border: none;
    border-radius: 10px;
  }
}
</style>
