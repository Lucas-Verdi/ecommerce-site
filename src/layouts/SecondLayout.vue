<template>
    <q-layout view="hHh lpR fFf">
  
      <q-header elevated class="bg-primary text-white" height-hint="98">
        <q-tabs align="center">
          <q-route-tab to="/" label="Home" />
          <q-route-tab to="/login" label="Fazer login" />
          <q-route-tab to="/cadastro" label="Cadastrar-se" />
        </q-tabs>
      </q-header>
  
      <q-page-container>
        <router-view />
      </q-page-container>
  
    </q-layout>
  </template>