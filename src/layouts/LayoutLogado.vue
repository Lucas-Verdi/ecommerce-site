<template>
  <mobileLayoutLogado v-if="$q.screen.lt.md"></mobileLayoutLogado>
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
          <q-input dense outlined square v-model="search" placeholder="Search" class="bg-white col" />
          <q-btn class="YL__toolbar-input-btn" color="grey-3" text-color="grey-8" icon="search" unelevated />
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap q-mr-xl">
          <router-link class="router" to="/carrinho"><q-btn dense flat color="grey-8" icon="ion-cart"
              v-if="$q.screen.gt.sm" class="q-mr-xl">
              Carrinho
            </q-btn></router-link>
          <q-btn dense flat color="grey-8" icon="person" v-if="$q.screen.gt.sm">
            LOGADO
            <q-menu>
              <q-list>
                <q-item clickable @click="logout()">
                  <q-item-section>Logout</q-item-section>
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
          <q-item v-for="link in links1" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
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
import { QList, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { auth } from 'app/auth'
import mobileLayoutLogado from 'components/mobileLayoutLogado.vue'
import axios from 'axios'

export default {
  name: 'MyLayout',
  setup() {
    const leftDrawerOpen = ref(true);
    const search = ref('');
    const $router = useRouter()
    const $q = useQuasar()

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }


    function logout() {
      localStorage.removeItem('x-access-token')
      $router.push('/')

      $q.notify({
        color: 'blue-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Logout realizado'
      })
    }

    onMounted(async (res) => {
      res = await auth()
      if (!res) {
        $router.push('/')
      }
    })


    return {
      logout,
      fabYoutube,
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
      links1: [
        { icon: 'clock', text: 'Categoria' },
        { icon: 'clock', text: 'Categoria' },
        { icon: 'clock', text: 'Categoria' }
      ],
    };
  },
  components: { QList, mobileLayoutLogado }
}
</script>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
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