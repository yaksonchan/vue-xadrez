<template>
  <div class="peca">
      <img :src="peca.imagem" />
  </div>
</template>

<script>
export default {
    props: {
        peca: Object
    }
}
</script>

<style scoped>
.peca {
    height: 100%;
    width: 100%;
}

.peca img {
    margin:0 auto;
    display: block;
    margin-top: 7px;
}
</style>