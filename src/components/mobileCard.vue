<template>
  <div>
    <q-carousel class="bg-grey-1" animated swipeable transition-prev="jump-right" transition-next="jump-left"
      v-model="slide" arrows infinite control-color="black" height="300px">
      <q-carousel-slide :name="1" class="column no-wrap flex-center">
        <div class="row text-center">
          <div v-for="p in promocoes" :key="p.produto" class="col-5 q-pl-xl">
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
          <div v-for="p in promocoes2" :key="p.produto" class="col-5 q-pl-xl">
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
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'mobileCard',
  setup() {
    return {
      slide: ref(1),
      promocoes: [
        { produto: 'Produto teste', preco: '1' },
        { produto: 'Produto teste 2', preco: '2' },
      ],

      promocoes2: [
        { produto: 'Produto teste 3', preco: '3' },
        { produto: 'Produto teste 4', preco: '4' },
      ],
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
