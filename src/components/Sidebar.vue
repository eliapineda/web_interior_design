<template>
    <h2>Muebles</h2>
    <div>
        <div v-for="furniture in roomStore.furnitureList" :key="furniture.id" draggable="true" @dragstart="onDragStart($event, furniture)">
            <p>{{furniture.name}}</p>
        </div>
    </div>
</template>
<script setup>
import { useRoomStore } from '@/stores/roomStore';

const roomStore = useRoomStore();

const onDragStart = (event, furniture) => {
    event.dataTransfer.setData("furnitureId", furniture.id);
    event.dataTransfer.setData("furnitureName", furniture.name);
    console.log("objeto cogido");
}
</script>