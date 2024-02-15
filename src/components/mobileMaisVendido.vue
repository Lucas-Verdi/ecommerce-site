<template>
  <div>
    <q-carousel class="bg-grey-1" animated swipeable transition-prev="jump-right" transition-next="jump-left"
      v-model="slide" arrows infinite control-color="black" height="300px">
      <q-carousel-slide :name="1" class="column no-wrap flex-center">
        <div class="row text-center">
          <div v-for="p in maisVendido" :key="p.produto" class="col-5 q-pl-xl q-ml-xs">
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
          <div v-for="p in maisVendido2" :key="p.produto" class="col-5 q-pl-xl q-ml-xs">
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
  name: 'mobileMaisVendido',
  setup() {
    return {
      slide: ref(1),
      maisVendido: [
        { produto: 'Mais vendido', preco: '1' },
        { produto: 'Mais vendido 2', preco: '2' },
      ],

      maisVendido2: [
        { produto: 'Mais vendido 3', preco: '3' },
        { produto: 'Mais vendido 4', preco: '4' },
      ],
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
