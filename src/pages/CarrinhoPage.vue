<template>
  <q-page padding>
    <div class="q-pa-md">
    <q-markup-table dark class="bg-indigo-8">
      <thead>
        <tr>
          <th class="text-left">Produto</th>
          <th class="text-right">Quantidade</th>
          <th class="text-right">Valor unitário</th>
          <th class="text-right">Valor total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">Frozen Yogurt</td>
          <td class="text-right">159</td>
          <td class="text-right">6</td>
          <td class="text-right">24</td>
        </tr>
        <tr>
          <td class="text-left">Ice cream sandwich</td>
          <td class="text-right">237</td>
          <td class="text-right">9</td>
          <td class="text-right">37</td>
        </tr>
        <tr>
          <td class="text-left">Eclair</td>
          <td class="text-right">262</td>
          <td class="text-right">16</td>
          <td class="text-right">23</td>
        </tr>
        <tr>
          <td class="text-left">Cupcake</td>
          <td class="text-right">305</td>
          <td class="text-right">3.7</td>
          <td class="text-right">67</td>
        </tr>
        <tr>
          <td class="text-left">Gingerbread</td>
          <td class="text-right">356</td>
          <td class="text-right">16</td>
          <td class="text-right">49</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
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
