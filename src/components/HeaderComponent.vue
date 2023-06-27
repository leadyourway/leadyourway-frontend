<template>
  <Toast />
  <Toolbar class="p-1">
    <template #start>
      <a href="/" class="text-lg font-bold mx-2 no-underline"> Lead Your Way </a>
    </template>

    <template #end>
      <a v-if="user" href="/profile"> <Button class="mr-2 text-bold">Profile</Button> </a>
      <a v-if="user"> <Button class="mr-2 text-bold" v-on:click="addBike()">Add Bike</Button> </a>
      <a href="/search">
        <Button class="mr-2 text-bold"> <i class="pi pi-search mr-2"></i> Search </Button>
      </a>
    </template>
  </Toolbar>
</template>
<script>
import { cardService } from '../services/card.lyw.service';
export default {
  name: 'HomeHeader',
  data() {
    return {
      user: null,
      cards: [],
    };
  },
  async mounted() {
    this.user = localStorage.getItem('id');
    const id = localStorage.getItem('id');
    await cardService.getByUserId(id).then((response) => {
      this.cards = response;
    });
  },
  methods: {
    async logout() {
      localStorage.removeItem('id');
      this.$router.push('/home');
    },
    async addBike() {
      if (this.cards.data.length <= 0) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Necesitas tener una tarjeta para poder agregar una bicicleta',
          life: 3000,
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return;
      }
      this.$router.push('/create');
    },
  },
};
</script>
