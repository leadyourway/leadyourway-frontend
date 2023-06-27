<template>
  <div class="about-component">
    <div class="first-part" :class="{ 'full-width': isMobile }">
      <div>
        <h1 class="font-semibold text-900"><span class="text-orange-500">Lead</span> Your way</h1>
        <p>{{ $t('about-content') }}</p>
        <div class="buttons"></div>
      </div>
    </div>
    <div class="second-part" :class="{ 'full-width': isMobile }">
      <div class="carousel">
        <img :src="currentImage" alt="Imagen del carrusel" />
        <button class="next-button" @click="nextImage">
          <div class="i-container">
            <i class="fa-solid fa-angle-right" style="color: #f97316"></i>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://images.prismic.io/santacruzbikesstatic/d7b7d8aa-438f-457a-8201-c88dda03bf70_NJiYgrwg.jpeg?auto=compress,format',
        'https://images.prismic.io/santacruzbikesstatic/278137c7-8010-4a40-bd73-c1ce0c7023ee_fIBc--Q8.jpeg?auto=compress,format',
        'https://images.prismic.io/santacruzbikesstatic/0b6725b2-f71a-4182-af54-36929b8edbc6_62i36DdE.jpeg?auto=compress,format',
      ],
      currentImageIndex: 0,
      isMobile: false,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
  },
  methods: {
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },
    checkWindowWidth() {
      this.isMobile = window.innerWidth < 768;
    },
  },
  mounted() {
    this.checkWindowWidth();
    window.addEventListener('resize', this.checkWindowWidth);
    setInterval(() => {
      this.nextImage();
    }, 10000); //Milisegundos -> 10 segundos
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWindowWidth);
  },
};
</script>

<style scoped>
.about-component {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 40% 60%;
}

.first-part {
  display: flex;
  align-items: center;
  padding: 20px;
}

.full-width {
  width: 100%;
}

.first-part div {
  margin-right: 20px;
}

.first-part h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.buttons button {
  margin-top: 10px;
}

.second-part {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.carousel {
  position: relative;
  max-width: 100%;
}

.carousel img {
  width: 100%;
  background-color: transparent;
}

.next-button {
  position: absolute;
  top: 50%;
  right: 0;
  border: none;
  background-color: transparent;
  transform: translateY(-50%);
  cursor: pointer;
}

.i-container {
  font-size: 30px;
}

@media (max-width: 767px) {
  .about-component {
    grid-template-columns: 100%;
  }
}
</style>

