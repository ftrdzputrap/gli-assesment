<template>
  <div>
    <Sidebar />
    <div class="ml-64 h-full">
      <Header />
      <main class="h-full px-8 pb-10">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar/index.vue";
import Header from "@/components/Header/index.vue";
</script>