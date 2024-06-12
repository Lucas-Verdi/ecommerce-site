<template>
  <q-page padding>
    <div class="row items-center text-center">
      <div class="col-6 text-h5">
        <p>Cadastrar um endereço para entrega</p>
      </div>
      <div class="col-6 text-h5">
        <p>Confira seus dados</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { auth } from 'app/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'checkoutPage',
  setup(){
    const $router = useRouter()

    onMounted(async (res) => {
      res = await auth()
      if (!res) {
        $router.push('/')
      }
    })
    return{

    }
  }
}
</script>
