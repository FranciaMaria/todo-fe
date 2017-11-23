<template>
  <div>
    <LayoutHeader></LayoutHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import LayoutHeader from './components/LayoutHeader'

export default {
  name: 'app',
  components: {
    LayoutHeader
  }
}
</script>

<style>

</style>