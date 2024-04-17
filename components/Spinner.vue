<script setup lang="ts">
// Imports

// Props

// Emits

// Reactive properties

// Computed properties

// Methods

// Lifecycle hooks

// Watchers
</script>

<template>
  <Transition name="opacity" appear>
    <div class="flex gap-1" role="status" aria-live="polite">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>
  </Transition>
</template>

<style scoped>
.particle {
  @apply h-4 w-1 rounded-full bg-current;
  animation: bounce 1200ms infinite ease;
}

.particle:nth-child(2) {
  animation-delay: 100ms;
}

.particle:nth-child(3) {
  animation-delay: 200ms;
}

@keyframes bounce {
  0%,
  100% {
    translate: 0 0;
    scale: 1;
  }
  25% {
    translate: 0 -0.25rem;
    scale: 1 0.66;
  }
  50% {
    translate: 0 0;
    scale: 1;
  }
  75% {
    translate: 0 0.25rem;
    scale: 1 0.66;
  }
}

.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 400ms;
}
.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>
