<template>
  <mobileLayout v-if="$q.screen.lt.md"></mobileLayout>
  <q-layout view="hHh lpR fff" class="bg-grey-1" v-if="$q.screen.gt.sm">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <div class="row text-center">
        <span class="col"><q-icon name="ion-pin" class="q-mr-sm"></q-icon>Frete grátis para todo o estado de SP</span>
      </div>
      <q-toolbar>
        <q-btn flat dense round @click="toggleLeftDrawer" aria-label="Menu" icon="menu">
          <q-tooltip>Categorias</q-tooltip>
        </q-btn>


        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <router-link class="router" to="/index"><q-toolbar-title shrink class="text-weight-bold">
              Logomarca aqui
            </q-toolbar-title></router-link>
        </q-btn>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap">
          <q-select class="bg-white col" dense outlined square filled v-model="search" use-input input-debounce="0"
            label="Procurar produto" :options="promocoes" @filter="filterFn" style="width: 250px">
            <template v-slot:no-option>
              <q-list>
                <q-item>
                  <q-item-section></q-item-section>
                </q-item>
              </q-list>
            </template>
          </q-select>
          <q-btn class="YL__toolbar-input-btn" color="grey-3" text-color="grey-8" icon="search" unelevated />
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap q-mr-xl">
          <q-btn dense flat color="grey-8" v-if="$q.screen.gt.sm" class="q-mr-xl">
            <q-icon name="ion-cart"></q-icon>
            Carrinho
            <q-menu>
              <q-list>
                <q-item clickable>
                  <router-link class="router" to="/login">Faça login para visualizar o carrinho</router-link>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn dense flat color="grey-8" icon="person" v-if="$q.screen.gt.sm">
            Login/Cadastro
            <q-menu>
              <q-list>
                <q-item clickable>
                  <q-item-section><router-link class="router" to="/login">Fazer login</router-link></q-item-section>
                </q-item>
                <q-separator></q-separator>
                <q-item clickable v-close-popup>
                  <q-item-section><router-link class="router" to="/cadastro">Realizar
                      cadastro</router-link></q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2" :width="180">
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-for="(link, index) in links1" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <router-link @click="setCategoria(index)" class="router" to="/produtopcategoria"><q-item-label>{{
    link.text
  }}</q-item-label></router-link>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-footer>
      <div class="row text-center">
        <span class="col">rodapé</span>
      </div>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { fabYoutube } from '@quasar/extras/fontawesome-v6'
import { QList } from 'quasar'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { auth } from 'app/auth'
import mobileLayout from 'components/mobileLayout.vue'
import axios from 'axios'

export default {
  name: 'MyLayout',
  setup() {
    const links1 = ref([])
    const promocoes = ref([]);
    const leftDrawerOpen = ref(true);
    const search = ref('');
    const $router = useRouter()
    const options = ref(promocoes)

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

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

    links1.value = [
      { icon: 'clock', text: 'Resinas', idcategoria: "1" },
      { icon: 'clock', text: 'Limas', idcategoria: "2" },
      { icon: 'clock', text: 'Enxaguantes', idcategoria: "3" },
      { icon: 'clock', text: 'Clareadores', idcategoria: "4" }
    ]

    async function setCategoria(i) {
      const idcategoria = await links1.value[i].idcategoria
      localStorage.setItem('idcategoria', idcategoria)
    }

    onMounted(async (res) => {
      res = await auth()
      if (res) {
        $router.push('/index')
      }
      else {
        $router.push('/')
      }

      const resposta = await buscaProdutos();
      promocoes.value = [resposta.data[0].nomeproduto, resposta.data[1].nomeproduto, resposta.data[2].nomeproduto, resposta.data[3].nomeproduto, resposta.data[4].nomeproduto, resposta.data[5].nomeproduto, resposta.data[6].nomeproduto, resposta.data[7].nomeproduto];
    })

    return {
      options,
      links1,

      filterFn(val, update) {
        if (val === '') {
          update(() => {
            options.value = promocoes.value
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          options.value = promocoes.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      },

      promocoes,
      fabYoutube,
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
      setCategoria,
    };
  },
  components: { QList, mobileLayout }
}
</script>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>