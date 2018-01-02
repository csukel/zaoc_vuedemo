<template>
  <div id="app">
    <!-- navbar (header) -->
    <app-header v-if="authenticated"></app-header>
    <!-- views will be placed here -->
    <router-view  />
  </div>
</template>

<script src="@/components/controller/App.js">

</script>

<style>
</style>
