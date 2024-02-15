<template>
  <div class="q-pa-md">
    <q-carousel v-model="slide" transition-prev="jump-right" transition-next="jump-left" swipeable animated
      :autoplay="autoplay" control-color="white" prev-icon="arrow_left" next-icon="arrow_right"
      navigation-icon="radio_button_unchecked" navigation padding arrows infinite height="300px"
      class="bg-purple text-white shadow-1 rounded-borders">
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-icon name="style" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <q-icon name="live_tv" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>

  <div class="row text-center text-h4 text-weight-bold q-pt-md">
    <div class="col-12">Confira as promoções !</div>
  </div>

  <mobileCard v-if="$q.screen.lt.md"></mobileCard>
  <div class="q-pa-md" v-if="$q.screen.gt.md">
    <q-carousel class="bg-grey-1" animated swipeable transition-prev="jump-right" transition-next="jump-left"
      v-model="slide2" arrows infinite control-color="black" height="300px">
      <q-carousel-slide :name="1" class="column no-wrap flex-center">
        <div class="row text-center">
          <div v-for="p in promocoes" :key="p.produto" class="col-3 q-pl-xl">
            <q-card filled bordered class="my-card">
              <img src="https://cdn.quasar.dev/img/parallax2.jpg">
              <q-card-section>{{ p.produto }}</q-card-section>
              <q-card-section>{{ p.preco }}</q-card-section>
            </q-card>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="column no-wrap flex-center">
        <div class="row text-center">
          <div v-for="p in promocoes2" :key="p.produto" class="col-3 q-pl-xl">
            <q-card filled bordered class="my-card">
              <img src="https://cdn.quasar.dev/img/parallax2.jpg">
              <q-card-section>{{ p.produto }}</q-card-section>
              <q-card-section>{{ p.preco }}</q-card-section>
            </q-card>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
  <q-separator class="q-my-md"></q-separator>

  <div class="q-pa-md">
    <q-img src="../images/banner-teste.png" class="shadow-4"></q-img>
  </div>

  <div class="row text-center text-h5 text-weight-bold q-ma-md">
    <div class="col-12">Mais vendidos</div>
  </div>

  <mobileMaisVendido v-if="$q.screen.lt.md"></mobileMaisVendido>
  <div v-if="$q.screen.gt.md" class="row text-center q-pt-md q-mb-xl">
    <div v-for="p in maisvendidos" :key="p.produto" class="col-3 q-pl-xl">
      <q-card filled bordered class="my-card">
        <img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <q-card-section>{{ p.produto }}</q-card-section>
        <q-card-section>{{ p.preco }}</q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue';
import mobileCard from 'src/components/mobileCard.vue';
import mobileMaisVendido from 'src/components/mobileMaisVendido.vue';

export default {
  setup() {
    return {
      slide: ref('style'),
      slide2: ref(1),
      count: ref(4),
      autoplay: ref(true),
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.',

      promocoes: [
        { produto: 'Produto teste', preco: '1' },
        { produto: 'Produto teste 2', preco: '2' },
        { produto: 'Produto teste 3', preco: '3' },
        { produto: 'Produto teste 4', preco: '4' }
      ],

      promocoes2: [
        { produto: 'Produto teste 5', preco: '5' },
        { produto: 'Produto teste 6', preco: '6' },
        { produto: 'Produto teste 7', preco: '7' },
        { produto: 'Produto teste 8', preco: '8' }
      ],

      maisvendidos: [
        { produto: 'Mais vendido 1', preco: '1' },
        { produto: 'Mais vendido 2', preco: '2' },
        { produto: 'Mais vendido 3', preco: '3' },
        { produto: 'Mais vendido 4', preco: '4' },

      ]
    }
  },
  components: { mobileCard, mobileMaisVendido }
}

</script>

<style lang="sass" scoped>
.my-card
  width: 84%
</style>
