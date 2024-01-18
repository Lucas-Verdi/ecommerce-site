<template>
    <div class="row flex-center q-mt-xl text-center">
        <div class="col q-pa-md bg-grey-3 shadow-4" style="max-width: 400px">

            <q-form @submit="loginSend" @reset="onReset" class="q-gutter-md">
                <q-input filled v-model="email" label="Email*" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Por favor, insira um email válido']" />

                <q-input filled type="password" v-model="password" label="Senha*" lazy-rules :rules="[
                    val => val !== null && val !== '' || 'Por favor, digite sua senha'
                ]" />

                <div>
                    <q-btn label="Login" type="submit" color="primary" />
                    <div class="q-mt-sm">Caso ainda não seja cadastrado, <router-link to="/cadastro">cadastre-se
                            aqui.</router-link></div>
                </div>
            </q-form>

        </div>
    </div>


    <div class="container">
        <router-view></router-view>
    </div>
</template>


<script>
import { data } from 'autoprefixer'
import axios from 'axios'
import { useQuasar } from 'quasar'
import { ref } from 'vue'



export default {
    data() {
        return {
            $q: useQuasar(),
            email: '',
            password: '',
        }
    },

    methods: {
        loginSend() {
            const dados = {
                email: this.email,
                password: this.password
            }
            axios.post('http://localhost:3000/login', dados)
                .then((Response) => {
                    if (Response.data.success) {
                        this.$router.push('/')

                        this.$q.notify({
                            color: 'green-4',
                            textColor: 'white',
                            icon: 'cloud_done',
                            message: 'Login Autorizado'
                        })
                    }
                    else {
                        this.reset()
                        this.$q.notify({
                            color: 'red',
                            textColor: 'white',
                            icon: 'warning',
                            message: 'Credenciais inválidas'
                        })
                    }
                })
        },
        reset(){
            this.email = null
            this.password = null
        }
    },
}
</script>