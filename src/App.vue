<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  watch: {
    '$route'(to, from) {
      // console.log(to.meta.index, from.meta.index)
    }
  }
}
</script>
