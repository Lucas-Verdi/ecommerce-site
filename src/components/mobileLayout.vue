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
            <q-btn flat><q-icon name="ion-cart"></q-icon></q-btn>
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
              <q-fab-action color="primary" @click="onClick" icon="book" label="Cadastrar-se" />
              <q-fab-action color="secondary" @click="onClick" icon="login" label="Login"/>
            </q-fab>
          </q-page-sticky>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'mobileLayout',
  setup() {
    return {}
  }
}
</script>