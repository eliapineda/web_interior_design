<template>
  <div class="flex flex-col h-screen">
    <div class="w-full h-24 shadow-xl">
      <Header />
    </div>
    <div class="flex flex-1 w-full">
      <div class="w-1/6 overflow-auto">
        <Sidebar />
      </div>
      <div class="w-5/6 overflow-auto">
        <Room />
      </div>
    </div>
  </div>
</template>
<script setup>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import Room from "../components/Room.vue";
</script>
