<template>
  <div>
    <Sidebar />
    <Nuxt class='content' />
  </div>
</template>

<style scoped>

.content {
  margin-left: 75px; /* This allows for the left sidebar for all our page content */
  display: block; /* <Nuxt /> defaults to span, but we want div, so force it */
}

</style>
