<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        Networking
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'BasicLayout'
}
</script>

<style lang="scss">
.title{
  color: $btnBgColor1;
}
</style>
