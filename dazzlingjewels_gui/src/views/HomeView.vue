<template>
  <div>
    <nav class="navbar" style="background-color: white!important;">
      <div class="container-fluid">
        <a class="navbar-brand">DazzlingJewels</a>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
    
    <!-- Horizontal Line -->
    <hr class="horizontal-line">
   
    <nav class="navbar" style="background-color: white!important;">
      <form class="container-fluid justify-content-start">
        <a class="btn me-5" type="button" href="./ProductsView.vue">ShopNow</a>
        <a class="btn btn-sm me-5" type="button" href="">Watches</a>
        <a class="btn btn-sm me-5" type="button" href="">Rings</a>
        <a class="btn btn-sm me-5" type="button" href="">Necklaces</a>
      </form>
    </nav>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>
