import LoginPage from '../pages/LoginPage.vue'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/produtopmn', name: 'produtoPagemain', component: () => import('pages/produtoPagemain.vue') },
      { path: '/produtopcategoria', name: 'produtoCategoria', component: () => import('pages/produtoCategoria.vue') },
      { path: '/consulta', name: 'searchPage', component: () => import('pages/searchPage.vue') },





    ]
  },

  {
    path: '/sign',
    component: () => import('layouts/SecondLayout.vue'),
    children: [
      { path: '/login', name: 'login', component: LoginPage },
      { path: '/cadastro', name: 'cadastro', component: () => import('pages/CadastroPage.vue') }

    ]
  },

  {
    path: '/userIn',
    component: () => import('layouts/LayoutLogado.vue'),
    children: [
      { path: '/index', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: '/carrinho', name: 'CarrinhoPage', component: () => import('pages/CarrinhoPage.vue') },
      { path: '/produto', name: 'produtoPage', component: () => import('pages/produtoPage.vue') },
      { path: '/produtopcategorialg', name: 'produtoCategorialg', component: () => import('pages/produtoCategorialg.vue') },
      { path: '/consultalg', name: 'searchPagelg', component: () => import('pages/searchPagelg.vue') },





    ]
  },





]

export default routes
