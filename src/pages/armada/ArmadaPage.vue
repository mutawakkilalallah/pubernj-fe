<template>
  <div id="app">
    <div class="column">
      <h2>Kolom Kiri</h2>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="active"
            v-for="(it, i) in leftColumn"
            :key="i"
            @click="onKlik(i+1)"
          >
            <td>{{ it.id }}</td>
            <td>{{ it.name }}</td>
          </tr>
          <tr>
            <td>23</td>
            <td>23</td>
          </tr>
        </tbody>
      </table>
      <ul>
        <li
          v-for="(item, index) in leftColumn"
          :key="index"
          draggable="true"
          @dragstart="handleDragStart('leftColumn', index)"
          @dragover="handleDragOver"
          @drop="handleDrop('leftColumn', index)"
        >
          {{ item.name }}
        </li>
        <li
          v-if="!leftColumn.length"
          @dragover="handleDragOver"
          @drop="handleDrop('leftColumn', 0)"
        >
          Drop disini untuk menambahkan item
        </li>
      </ul>
    </div>
    <div class="column">
      <h2>Kolom Kanan</h2>
      <ul>
        <li
          v-for="(item, index) in rightColumn"
          :key="index"
          draggable="true"
          @dragstart="handleDragStart('rightColumn', index)"
          @dragover="handleDragOver"
          @drop="handleDrop('rightColumn', index)"
        >
          {{ item.name }}
        </li>
        <li
          v-if="!rightColumn.length"
          @dragover="handleDragOver"
          @drop="handleDrop('rightColumn', 0)"
        >
          Drop disini untuk menambahkan item
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const leftColumn = ref([
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
]);
const rightColumn = ref([]);

const draggedItem = ref(null);
const draggedFrom = ref(null);

const handleDragStart = (source, index) => {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", source + "-" + index);
  draggedItem.value =
    source === "leftColumn"
      ? leftColumn.value[index]
      : rightColumn.value[index];
  draggedFrom.value = source;
};

const handleDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

const handleDrop = (target, index) => {
  const data = event.dataTransfer.getData("text/plain");
  const [source, itemIndex] = data.split("-");

  if (source === target) return;

  const item =
    source === "leftColumn"
      ? leftColumn.value[itemIndex]
      : rightColumn.value[itemIndex];

  if (source === "leftColumn") {
    leftColumn.value.splice(itemIndex, 1);
  } else {
    rightColumn.value.splice(itemIndex, 1);
  }

  if (target === "leftColumn" && draggedFrom.value === "rightColumn") {
    leftColumn.value.splice(index, 0, draggedItem.value);
  } else if (target === "rightColumn" && draggedFrom.value === "leftColumn") {
    rightColumn.value.splice(index, 0, draggedItem.value);
  }
};

function onKlik(a) {
  console.log("klick", a);
}
</script>

<style lang="scss" scoped>
/* Tambahkan gaya CSS sesuai keinginan Anda */
.column {
  float: left;
  width: 50%;
  padding: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
  border: 1px solid #ccc;
}
li {
  padding: 5px;
  margin: 5px;
  background-color: #f9f9f9;
  cursor: grab;
}
/*table */
.table tbody tr.active td {
  background-color: #15449b;
}
</style>
