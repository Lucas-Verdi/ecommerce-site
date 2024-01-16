<template>
    <div class="row flex-center q-mt-xl text-center">
        <div class="col q-pa-md bg-grey-3 shadow-4" style="max-width: 600px">
            <q-form @submit="enviarDados" class="q-gutter-md flex-center row">
                <q-input class="col-4" filled v-model="nome" label="Nome*" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Por favor, digite seu nome']" />

                <q-input class="col-4" filled v-model="sobrenome" label="Sobrenome*" lazy-rules :rules="[
                    val => val !== null && val !== '' || 'Por favor, digite seu sobrenome'
                ]" />
                <q-input class="col-4" filled type="date" v-model="dtnascimento" label="Data de nascimento*" lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Por favor, digite Sua data de nascimento'
                    ]" />
                <q-input class="col-4" filled type="number" v-model="cpf" label="CPF*" lazy-rules :rules="[
                    val => val !== null && val !== '' || 'Por favor, digite seu CPF'
                ]" />
                <q-input class="col-4" filled type="number" v-model="celular" label="Celular*" lazy-rules :rules="[
                    val => val !== null && val !== '' || 'Por favor, digite seu número de celular'
                ]" />
                <q-input class="col-4" filled v-model="email" label="Email*" lazy-rules :rules="[
                    val => val !== null && val !== '' || 'Por favor, digite seu Email'
                ]" />
                <q-input type="password" class="col-4" filled v-model="senha" label="Senha*" lazy-rules :rules="[
                    val => val !== null && val !== '' || 'Por favor, digite sua senha'
                ]" />
                <q-input type="password" class="col-4" filled v-model="confsenha" label="Confirmar senha*" lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Por favor, confirme sua'
                    ]" />
                <div class="col-12">
                    <q-btn label="Cadastrar" type="submit" color="primary" />
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
import axios from 'axios'

export default {
    data() {
        return {
            $q: useQuasar(),

            sobrenome: '',
            dtnascimento: '',
            cpf: '',
            celular: '',
            email: '',
            senha: '',
            confsenha: '',
            nome: '',
            accept: '',
        }
    },
    methods: {
        onSubmit() {
            $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Cadastro realizado'
            })
        },

        enviarDados() {
            const dados = {
                nome: this.nome,
                sobrenome: this.sobrenome,
                dtnascimento: this.dtnascimento,
                cpf: this.cpf,
                celular: this.celular,
                email: this.email,
                senha: this.senha,
                confsenha: this.confsenha,
            }

            axios.post('http://localhost:3000/teste', dados)
            this.onSubmit
        }
    }
}

</script>