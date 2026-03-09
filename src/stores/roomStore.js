import { defineStore } from "pinia";

export const useRoomStore = defineStore("roomStore", {
  state: () => ({
    furnitureOnMap: [],
    selectedItem: null,
    furnitureList: [
      {
        id: "chair",
        name: "Silla",
        model: "models/chair.glb",
        icon: "furniture_icons/chair.png",
      },
      {
        id: "table",
        name: "Mesa",
        model: "models/table.glb",
        icon: "furniture_icons/table.png",
      },
      {
        id: "bed",
        name: "Cama",
        model: "models/bed.glb",
        icon: "furniture_icons/bed.png",
      },
      {
        id: "bedDouble",
        name: "Cama Doble",
        model: "models/bedDouble.glb",
        icon: "furniture_icons/bedDouble.png",
      },
      {
        id: "lamp",
        name: "Lámpara",
        model: "models/lamp.glb",
        icon: "furniture_icons/lamp.png",
      },
      {
        id: "rug",
        name: "Alfombra",
        model: "models/rug.glb",
        icon: "furniture_icons/rug.png",
      },
      {
        id: "bookcase",
        name: "Estanteria",
        model: "models/bookcase.glb",
        icon: "furniture_icons/bookcase.png",
      },
      {
        id: "sofa",
        name: "Sofá",
        model: "models/sofa.glb",
        icon: "furniture_icons/sofa.png",
      },
      {
        id: "plant",
        name: "Planta",
        model: "models/plant.glb",
        icon: "furniture_icons/plant.png",
      },
      {
        id: "trashcan",
        name: "Papelera",
        model: "models/trashcan.glb",
        icon: "furniture_icons/trashcan.png",
      },
      {
        id: "coatRack",
        name: "Perchero",
        model: "models/coatRack.glb",
        icon: "furniture_icons/coatRack.png",
      },
      {
        id: "radio",
        name: "Radio",
        model: "models/radio.glb",
        icon: "furniture_icons/radio.png",
      },
    ],
  }),
  actions: {
    //add item on map
    addFurnitureOnMap({type, position}){
      const newId = `${type}_${Date.now()}`;
      const furniture = {
        "id": newId,
        "position": {
          x: position.x,
          y: position.y,
          z: position.z
        }
      }
      this.furnitureOnMap.push(furniture);
      console.log(furniture, "added")
    },
    //update item on map
    updateFurnitureOnMap(){

    },
    //delete item on map
    deleteFurnitureOnMap(furniture){
      
    },
    //delete all items on map
    deleteAllFurnitureOnMap(furniture){

    },
  },
});
