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
  <div class="q-pa-md" v-if="$q.screen.gt.sm">
    <q-carousel class="bg-grey-1" animated swipeable transition-prev="jump-right" transition-next="jump-left"
      v-model="slide2" arrows infinite control-color="black" height="400px">
      <q-carousel-slide :name="1" class="column no-wrap flex-center">
        <div class="row text-center">
          <div v-for="(p, index) in promocoes" :key="p.produto" class="col-3 q-pl-xl">
            <q-card filled bordered class="my-card">
              <img :src="p.img" />
              <q-btn flat dense @click="toPage(index)"><q-card-section>{{ p.produto }}</q-card-section></q-btn>
              <q-card-section>{{ p.preco }}
                <div class="absolute-top-right q-ma-xs q-pr-sm">
                  <q-tooltip>Adicionar ao carrinho</q-tooltip>
                  <q-btn @click="Adicionar(index)" round color="green" icon="ion-cart" />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="column no-wrap flex-center">
        <div class="row text-center">
          <div v-for="(p, index) in promocoes2" :key="p.produto" class="col-3 q-pl-xl">
            <q-card filled bordered class="my-card">
              <img :src="p.img" />
              <q-btn flat dense @click="toPage(index + 4)"><q-card-section>{{ p.produto }}</q-card-section></q-btn>
              <q-card-section>{{ p.preco }}
                <div class="absolute-top-right q-ma-xs q-pr-sm">
                  <q-tooltip>Adicionar ao carrinho</q-tooltip>
                  <q-btn @click="Adicionar(index + 4)" round color="green" icon="ion-cart" />
                </div>
              </q-card-section>
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
  <div v-if="$q.screen.gt.sm" class="row text-center q-pt-md q-mb-xl">
    <div v-for="(p, index) in maisvendidos" :key="p.produto" class="col-3 q-pl-xl">
      <q-card filled bordered class="my-card">
        <img :src="p.img" />
        <q-btn flat dense @click="toPage(index)"><q-card-section>{{ p.produto }}</q-card-section></q-btn>
        <q-card-section>{{ p.preco }}
          <div class="absolute-top-right q-ma-xs q-pr-sm">
            <q-tooltip>Adicionar ao carrinho</q-tooltip>
            <q-btn @click="Adicionar(index)" round color="green" icon="ion-cart" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import mobileCard from "src/components/mobileCard.vue";
import mobileMaisVendido from "src/components/mobileMaisVendido.vue";
import axios from "axios";
import { onMounted } from "vue";
import { addtocart } from "src/stores/cartAdd";
import { useRouter } from "vue-router";

export default {
  setup() {
    const $router = useRouter()
    const logado = ref(true)
    const promocoes = ref([]);
    const promocoes2 = ref([]);
    const maisvendidos = ref([]);
    async function buscaProdutos() {
      const token = localStorage.getItem("x-access-token");
      const promocoes = await axios.post(
        "http://localhost:3000/produtos",
        null,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      return promocoes;
    }

    async function Adicionar(p) {
      const res = await buscaProdutos()
      const nomeproduto = res.data[p].nomeproduto
      const valorproduto = res.data[p].valorproduto
      const resposta = addtocart().addtocart(nomeproduto, valorproduto)
      return resposta;
    }

    async function setValores(p) {
      const res = await buscaProdutos()
      const nomeproduto = res.data[p].nomeproduto
      const valorproduto = res.data[p].valorproduto
      localStorage.setItem('nomeproduto', nomeproduto)
      localStorage.setItem('valorproduto', valorproduto)
    }

    async function toPage(p) {
      await setValores(p)
      if (logado.value) {
        $router.push('/produto')
      }
      else {
        $router.push('/produtopmn')
      }
    }

    onMounted(async () => {
      const token = localStorage.getItem('x-access-token')
      if (!token) {
        logado.value = false
      }
      const res = await buscaProdutos();
      promocoes.value = [
        {
          produto: res.data[0].nomeproduto,
          preco: "R$ " + res.data[0].valorproduto,
          img: res.data[0].imgproduto
        },
        {
          produto: res.data[1].nomeproduto,
          preco: "R$ " + res.data[1].valorproduto,
          img: res.data[1].imgproduto
        },
        {
          produto: res.data[2].nomeproduto,
          preco: "R$ " + res.data[2].valorproduto,
          img: res.data[2].imgproduto
        },
        {
          produto: res.data[3].nomeproduto,
          preco: "R$ " + res.data[3].valorproduto,
          img: res.data[3].imgproduto
        },
      ];

      promocoes2.value = [
        {
          produto: res.data[4].nomeproduto,
          preco: "R$ " + res.data[4].valorproduto,
          img: res.data[4].imgproduto
        },
        {
          produto: res.data[5].nomeproduto,
          preco: "R$ " + res.data[5].valorproduto,
          img: res.data[5].imgproduto
        },
        {
          produto: res.data[6].nomeproduto,
          preco: "R$ " + res.data[6].valorproduto,
          img: res.data[6].imgproduto
        },
        {
          produto: res.data[7].nomeproduto,
          preco: "R$ " + res.data[7].valorproduto,
          img: res.data[7].imgproduto
        },
      ];

      maisvendidos.value = [
        {
          produto: res.data[0].nomeproduto,
          preco: "R$ " + res.data[0].valorproduto,
          img: res.data[0].imgproduto
        },
        {
          produto: res.data[1].nomeproduto,
          preco: "R$ " + res.data[1].valorproduto,
          img: res.data[1].imgproduto
        },
        {
          produto: res.data[2].nomeproduto,
          preco: "R$ " + res.data[2].valorproduto,
          img: res.data[2].imgproduto
        },
        {
          produto: res.data[3].nomeproduto,
          preco: "R$ " + res.data[3].valorproduto,
          img: res.data[3].imgproduto
        },
      ];
    });

    return {
      logado,
      toPage,
      Adicionar,
      promocoes,
      promocoes2,
      maisvendidos,
      slide: ref("style"),
      slide2: ref(1),
      count: ref(4),
      autoplay: ref(true),
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },
  components: { mobileCard, mobileMaisVendido },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 84%
</style>
