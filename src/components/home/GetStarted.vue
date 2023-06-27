<template>
  <div class="testimonial">
    <div class="testimonialtop">
      <h1 class="font-semibold text-900 text-orange-500">{{ $t('get-started-slogan') }}</h1>
    </div>
    <div class="contenedortestimonial" :class="{ 'mobile-layout': isMobile }">
      <div class="testimonialtext" :class="{ 'full-width': isMobile }">
        <div class="cuerpo-test">
          <p class="text-900 text-xl">
            {{ $t('get-started-content') }}
          </p>
          <div class="text-orange-500 font-bold mb-3">>&nbsp;Powered by Discord</div>
        </div>
      </div>
      <div class="testimonialimg" v-if="!isMobile">
        <img
          src="https://cliply.co/wp-content/uploads/2021/08/372108630_DISCORD_LOGO_BLACK_400.gif"
          alt="Gif del logo de discord"
        />
      </div>
    </div>
    <a id="signup_button" href="/signup"
      ><Button
        label="Join Now"
        icon="pi pi-external-link"
        class="font-bold px-5 py-3 p-button-raised bg-orange-400 border-orange-500 p-button-rounded white-space-nowrap"
      ></Button>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.checkWindowWidth();
    window.addEventListener('resize', this.checkWindowWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWindowWidth);
  },
  methods: {
    checkWindowWidth() {
      this.isMobile = window.innerWidth < 768;
    },
  },
};
</script>

<style scoped>
/* Testimonial */
.testimonial {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.testimonialtop {
  text-align: center;
  width: 100%;
}

.testimonialtop h1 {
  font-weight: bold;
  font-size: 40px;
}

.testimonialtop p {
  text-align: center;
  color: gray;
}

.contenedortestimonial {
  justify-content: space-between;
  align-items: center;
  position: relative;
  display: flex;
  margin-left: 50px;
  margin-right: 50px;
}

.testimonialimg {
  width: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.testimonialimg img {
  height: 250px;
}

.testimonialtext {
  margin-left: 50px;
  margin-right: 50px;
  justify-content: center;
  align-items: center;
}

.full-width {
  width: 100%;
}

.mobile-layout {
  flex-direction: column;
}

@media (max-width: 767px) {
  .contenedortestimonial {
    margin: 0;
  }
}
</style>

