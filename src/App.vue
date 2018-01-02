<template>
  <div id="app">
    <!-- navbar (header) -->
    <app-header v-if="authenticated" :user="user"></app-header>
    <!-- views will be placed here -->
    <router-view v-on:authentication="authAction" :authenticated="authenticated" />
  </div>
</template>

<script src="@/components/controller/App.js">

</script>

<style>
</style>
