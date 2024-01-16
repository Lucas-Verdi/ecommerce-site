<template>
    <div class="row flex-center q-mt-xl text-center">
        <div class="col q-pa-md bg-grey-3 shadow-4" style="max-width: 400px">

            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input filled v-model="name" label="Email*" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Por favor, insira um email válido']" />

                <q-input filled type="password" v-model="age" label="Senha*" lazy-rules :rules="[
                    val => val !== null && val !== '' || 'Por favor, digite sua senha'
                ]" />

                <div>
                    <q-btn label="Login" type="submit" color="primary" />
                    <div class="q-mt-sm">Caso ainda não seja cadastrado, <router-link to="/cadastro">cadastre-se aqui.</router-link></div>
                </div>
            </q-form>

        </div>
    </div>


    <div class="container">
        <router-view></router-view>
    </div>
</template>


<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
    setup() {
        const $q = useQuasar()

        const name = ref(null)
        const age = ref(null)
        const accept = ref(false)

        return {
            name,
            age,
            accept,

            onSubmit() {
                $q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: 'Login Autorizado'
                })
            },
        }
    }
}
</script>