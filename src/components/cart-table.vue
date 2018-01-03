<template src="@/components/view/cart-table.html">
</template>

<script src="@/components/controller/cart-table.js">
</script>

<style >
.busy-indicator-outer-container {
  /* text-align: center; */
  /* margin-top:1rem; */

  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.busy-indicator-content {
  margin: auto;
  position: absolute;
  text-align: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 20%;
  min-width: 200px;
  max-width: 400px;
  padding: 40px;
}
</style>