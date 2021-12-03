<template>
  <div class="bg-gray-50">
    <v-app>
      <div class="content">
        <Nuxt></Nuxt>
      </div>
      <footer
        class="
          h-14
          max-w-screen-lg
          mx-auto
          w-full
          font-semibold font-mono
          flex
          items-center
          justify-center
        "
      >
        <p class="font-thin">
          developed by <span class="text-xl font-semibold">Hahuaz</span>
        </p>
      </footer>
    </v-app>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.content {
  min-height: calc(100vh - 3.5rem);
}
footer {
  font-family: 'Courier New', Courier, monospace;
  border-top: 1px solid black;
}
</style>
