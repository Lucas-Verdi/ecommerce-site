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
      <q-carousel-slide name="layers" class="column no-wrap flex-center">
        <q-icon name="layers" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="map" class="column no-wrap flex-center">
        <q-icon name="terrain" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>

  <div class="row q-pl-md">
      <div v-for="i in count" :key = i.id class="col-3">
        <q-card filled bordered class="my-card">
          Produto teste
          <img src="https://cdn.quasar.dev/img/parallax2.jpg">
        </q-card>
      </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue';

export default {
  setup() {
    return {
      slide: ref('style'),
      count: ref(4),
      autoplay: ref(true),
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  }
}

</script>

<style lang="sass" scoped>
.my-card
  width: 95%
</style>
