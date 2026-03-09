<template>
  <div class="p-4">
    <h2 class="font-bold">Muebles</h2>
    <div>
      <div
        v-for="furniture in roomStore.furnitureList"
        :key="furniture.id"
        draggable="true"
        @dragstart="onDragStart($event, furniture)"
        class="flex"
      >
        <div>
          <img :src="furniture.icon" alt="Icono del mueble" class="w-8 h-8" />
        </div>
        <div>{{ furniture.name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoomStore } from "@/stores/roomStore";

const roomStore = useRoomStore();

const onDragStart = (event, furniture) => {
  event.dataTransfer.setData("furnitureId", furniture.id);
  event.dataTransfer.setData("furnitureName", furniture.name);
  console.log("objeto cogido");
};
</script>
