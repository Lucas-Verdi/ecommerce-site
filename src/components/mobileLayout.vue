<template>
  <div>
    <q-layout view="hHh lpR fff" class="bg-grey-1">
      <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
        <div class="row text-center">
          <span class="col"><q-icon name="ion-pin" class="q-mr-sm"></q-icon>Frete grátis para todo o estado de SP</span>
        </div>

        <div class="row items-center text-center">
          <div class="col-3">
            Logomarca
          </div>
          <div class="col-7">
            <q-input dense v-model="search" placeholder="Pesquisar produtos" class="bg-white col" />
          </div>
          <div class="col-2">
            <q-btn flat><q-icon name="ion-cart"></q-icon>
              <q-menu>
              <q-list>
                <q-item clickable>
                  <router-link class="router" to="/login"><q-item-section>Faça login para visualizar o carrinho.</q-item-section></router-link>
                </q-item>
              </q-list>
            </q-menu>
            </q-btn>
          </div>
        </div>
      </q-header>



      <q-footer>
        <div class="row text-center">
          <span class="col">rodapé</span>
        </div>
      </q-footer>

      <q-page-container>
          <q-page-sticky position="bottom-left" :offset="[18, 18]" style="z-index: 3;">
            <q-fab color="purple" icon="keyboard_arrow_up" direction="up" vertical-actions-align="left">
              <router-link class="router" to="/cadastro"><q-fab-action color="primary" @click="onClick" icon="book" label="Cadastrar-se" /></router-link>
              <router-link class="router" to="/login"><q-fab-action color="secondary" @click="onClick" icon="login" label="Login"/></router-link>
            </q-fab>
          </q-page-sticky>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { auth } from 'app/auth'
export default {
  name: 'mobileLayout',
  setup() {
    const $router = useRouter()
    onMounted(async (res) => {
      res = await auth()
      if (res){
        $router.push('/index')
      }
      else{
        $router.push('/')
      }
    })
    return {}
  }
}
</script>