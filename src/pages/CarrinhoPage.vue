<template>
  <q-page padding>
    Teste
  </q-page>
</template>

<script>
import { auth } from 'app/auth'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
export default {
  name: 'CarrinhoPage',
  setup(){
    const $router = useRouter()
    onMounted(async (res) => {
      res = await auth()
      if (!res) {
        $router.push('/index')
      }
    })
    return{

    }
  }
}
</script>
