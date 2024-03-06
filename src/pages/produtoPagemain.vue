<template>
  <div class="row">
    <div class="col-7 q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />

        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ produto.nomeproduto }}</div>
          <div class="text-caption text-grey">
            {{ produto.descricao }}
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="primary" label="Share" />
          <q-btn flat color="secondary" label="Book" />

          <q-space />

          <q-btn color="black" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded">
            <q-tooltip>
              Visualizar descrição
            </q-tooltip>
          </q-btn>
        </q-card-actions>

        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subtitle2">
              {{ lorem }}
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>

    <div class="col-5 q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-h4 q-mt-sm q-mb-xs">{{ produto.nomeproduto }}</div>
          <div class="text-h5 text-black">
            {{ "R$" + produto.valorproduto }}
          </div>
          <div class="text-caption">Informações adicionais</div>
        </q-card-section>
        <q-card-actions>
          <q-btn @click="adicionar()" rounded color="green" label="Adicionar ao carrinho" />
          <q-space />
        </q-card-actions>
      </q-card>
    </div>
  </div>


</template>

<script>
import { onMounted, ref } from 'vue';
import { auth } from 'app/auth';
import { useRouter } from 'vue-router';
import { produtoPage } from 'src/stores/produtoPage';
import { addtocart } from 'src/stores/cartAdd';

export default {
  name: 'produtoPagemain',

  setup() {
    const $router = useRouter()
    const produto = ref([])

    async function exibirProduto() {
      const resposta = await produtoPage().toPage()
      return resposta
    }

    async function adicionar() {
      const nomeproduto = localStorage.getItem('nomeproduto')
      const valorproduto = localStorage.getItem('valorproduto')
      const resposta = await addtocart().addtocart(nomeproduto, valorproduto)
      return resposta;
    }

    onMounted(async (res) => {
      res = await auth()
      if (!res) {
        const resposta = await exibirProduto()
        produto.value = {
          nomeproduto: resposta.data[0].nomeproduto,
          valorproduto: resposta.data[0].valorproduto,
          descricao: resposta.data[0].descricao
        }
      }

    })

    return {
      adicionar,
      produto,
      expanded: ref(false),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 600px
</style>
