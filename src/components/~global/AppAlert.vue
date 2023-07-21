<template>
  <div>
    <div
      class="toast position-absolute bottom-0 end-50 translate-middle text-bg-primary border-0 fade show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ label }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>

  </div>
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "Label",
  },
});
</script>
<style lang="scss" scoped>
.toast {
  $toast-max-width: 350;
  margin-top: -10px;
  $toas-padding-x: 0.75rem;
  $toast-padding-y: 0.5rem;
  $toast-font-size: 0.875rem;
  $toast-color: null;
  $toast-background-color: rgba(var(body-bg-rgb), 0.85);
  $toast-border-width: var(border-width);
  $toast-border-color: var(border-color-translucent);
  $toast-border-radius: var(border-radius);
  $toast-box-shadow: var(box-shadow);
  $toast-spacing: padding-x;

  $toast-header-color: var(secondary-color);
  $toast-header-background-color: rgba(var(body-bg-rgb), 0.85);
  $toast-header-border-color: $toast-border-color;
}
</style>