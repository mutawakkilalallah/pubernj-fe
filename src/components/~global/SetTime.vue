<template>
  <div class="time__box">
    <p>{{ days }}</p>
    <p>{{ hours % 24 }}</p>
    <p>{{ minutes % 60 }}</p>
    <p>{{ seconds % 60 }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const launchDate = new Date("20 August 2023");

setInterval(() => {
  const currDate = new Date();
  const launchTime = launchDate - currDate;

  seconds.value = parseInt(launchTime / 1000);
  minutes.value = parseInt(seconds.value / 60);
  hours.value = parseInt(minutes.value / 60);
  days.value = parseInt(hours.value / 24);
}, 1000);
</script>
<style scoped>
.time__box {
  width: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* justify-items: center; */
  transform: translateY(100px);
}
.time__box p {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  background-color: whitesmoke;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
}
</style>>
