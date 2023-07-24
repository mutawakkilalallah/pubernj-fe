<template>
  <div class="laoad-wrapper">
    <div
      class="spinner-border"
      style="width: 3rem; height: 3rem;"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.load-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>