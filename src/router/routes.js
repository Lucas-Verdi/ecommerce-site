import LoginPage from '../pages/LoginPage.vue'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      
    ]
  },

  {
    path: '/sign',
    component: () => import('layouts/SecondLayout.vue'),
    children: [
      { path: '/login', name: 'login', component: LoginPage  },
      { path: '/cadastro', name: 'cadastro', component: () => import('pages/CadastroPage.vue') }
      
    ]
  },

  {
    path: '/userIn',
    component: () => import('layouts/LayoutLogado.vue'),
    children: [
      { path: '/index', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: '/carrinho', name: 'CarrinhoPage', component: () => import('pages/CarrinhoPage.vue') }
      
    ]
  },





]

export default routes
