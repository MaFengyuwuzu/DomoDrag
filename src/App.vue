<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>
        <router-view v-if="!$route.meta.keepAlive">
    </router-view>
  </div>
</template>
<script>
    window.onload = function() {
    document.addEventListener('touchstart', function(event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    });
    document.addEventListener('gesturestart', function(event) {
      event.preventDefault()
    })
  };
</script>

<style>
 @import "~@/assets/css/common.scss";
</style>
