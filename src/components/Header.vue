<template>
  <div>
    <div><p>Diseñador de habitaciones 3d</p></div>
    <div>
        <button @click="clearButton">Limpiar todo</button>
    </div>
  </div>
</template>
<script setup>
const clearButton = () => {
    console.log("Limpiar todo")
}
</script>
