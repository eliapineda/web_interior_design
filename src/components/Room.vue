<template>
  <div ref="container" class="h-full w-full">
    <canvas ref="canvas" @dragover.prevent @drop="handleDrop" @click="handeClick"></canvas>
  </div>
</template>
<script setup>
import * as THREE from "three";
import { onMounted, ref } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRoomStore } from "@/stores/roomStore";

const canvas = ref(null);
const container = ref(null);
const roomStore = useRoomStore();
const loader = new GLTFLoader();
const selectedFurniture = ref(null);

let scene, camera, renderer, floor;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

onMounted(() => {
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: true,
  });

  scene.background = new THREE.Color(0xf5f5f5);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);
  renderer.setSize(width, height);

  const light = new THREE.DirectionalLight(0xf5f5f5, 1);
  const light2 = new THREE.DirectionalLight(0xf5f5f5, 1);
  const ambient = new THREE.AmbientLight(0xf5f5f5, 0.6);

  light.position.set(5, 5, 5);
  light2.position.set(-5, -5, -5);
  scene.add(light);
  scene.add(light2);
  scene.add(ambient);

  const floorGeometry = new THREE.PlaneGeometry(5, 5);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    side: THREE.DoubleSide,
  });

  floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;

  scene.add(floor);
  const orbit = new OrbitControls(camera, renderer.domElement);
  // const grid = new THREE.GridHelper(100, 100);
  // scene.add(grid);
  //paredes
  const wallWidth = 5;
  const wallHeight = 2.5;
  const wallGeometry = new THREE.PlaneGeometry(wallWidth, wallHeight);
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.FrontSide,
  });

  const wall1 = new THREE.Mesh(wallGeometry, wallMaterial); //back wall
  wall1.position.set(0, wallHeight / 2, -2.5);
  scene.add(wall1);

  const wall2 = new THREE.Mesh(wallGeometry, wallMaterial); //front wall
  wall2.position.set(0, wallHeight / 2, 2.5);
  wall2.rotation.y = Math.PI;
  scene.add(wall2);

  const wall3 = new THREE.Mesh(wallGeometry, wallMaterial); //back wall
  wall3.position.set(-2.5, wallHeight / 2, 0);
  wall3.rotation.y = Math.PI / 2;
  scene.add(wall3);

  const wall4 = new THREE.Mesh(wallGeometry, wallMaterial); //back wall
  wall4.position.set(+2.5, wallHeight / 2, 0);
  wall4.rotation.y = -Math.PI / 2;
  scene.add(wall4);

  function animate() {
    requestAnimationFrame(animate);
    orbit.update();
    renderer.render(scene, camera);
  }

  animate();
  function resize() {
    const width = container.value.clientWidth;
    const height = container.value.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener("resize", resize);
});

const handleDrop = (event) => {
  const furnitureId = event.dataTransfer.getData("furnitureId");
  // const furnitureName = event.dataTransfer.getData("furnitureName");
  console.log("objeto dejado");
  const furniture = roomStore.furnitureList.find((f) => f.id === furnitureId);
  
  const rect = canvas.value.getBoundingClientRect();
  const xInCanva = event.clientX - rect.left;
  const yInCanva = event.clientY - rect.top;
  mouse.x = (xInCanva / rect.width) * 2 - 1;
  mouse.y = -(yInCanva / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(floor);

  if (intersects.length > 0){
    const coordinate = intersects[0].point;
    cargarModelo3d(furniture, coordinate);
  }
};

const cargarModelo3d = (furniture, coordinate) => {
  const modelPath = furniture.model;
  loader.load(
    modelPath,
    (gltf) =>{
      const model = gltf.scene;
      model.position.copy(coordinate);
      scene.add(model);
      roomStore.addFurnitureOnMap({type: furniture.id, position: coordinate});
    }
  )
}

const handeClick = (event) => {
  console.log("escena clicada")
  const rect = canvas.value.getBoundingClientRect();
  const xInCanva = event.clientX - rect.left;
  const yInCanva = event.clientY - rect.top;
  mouse.x = (xInCanva / rect.width) * 2 - 1;
  mouse.y = -(yInCanva / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(roomStore.furnitureOnMap, true);

  if (intersects.length > 0){
    const coordinate = intersects[0].point;
   console.log("entraste")
  }
}
</script>
