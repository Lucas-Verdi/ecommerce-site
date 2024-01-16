import LoginPage from '../pages/LoginPage.vue'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      
    ]
  },

  { path: '/login', name: 'login', component: LoginPage  },

  { path: '/cadastro', name: 'cadastro', component: () => import('pages/CadastroPage.vue') }


]

export default routes
