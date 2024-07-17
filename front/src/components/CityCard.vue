<script setup>
import { ref, computed } from 'vue';
import Fa from 'vue-fa';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['cityDeleted']);

const faTrashIcon = ref(faTrash);

const deleteCity = async () => {
  try {
    await axios.delete(`http://localhost:10002/favorite/${props.city.cityCode}`);
    emit('cityDeleted', props.city.cityCode);
  } catch (error) {
    console.error("Error while deleting : ", error);
  }
};

const isDrinkable = computed(() => {
  const scores = props.city.samples.map(sample => sample.drinkable);
  if (scores.includes(0)) return 0;
  if (scores.includes(1)) return 1;
  return 2;
});

const waterQualityClass = computed(() => {
  if (isDrinkable.value === 0) return 'not-drinkable';
  if (isDrinkable.value === 1) return 'partially-drinkable';
  return 'drinkable';
});

const waterQualityText = computed(() => {
  if (isDrinkable.value === 0) return 'Undrinkable';
  if (isDrinkable.value === 1) return 'Partially drinkable';
  return 'Drinkable';
});

const waterQualityStyle = computed(() => {
  if (isDrinkable.value === 0) return { color: 'red' };
  if (isDrinkable.value === 1) return { color: 'orange' };
  return { color: 'green' };
});
</script>

<template>
  <div :class="waterQualityClass" class="city-card">
    <div class="card-header">
      <h2>{{ city.cityName }} ({{ city.cityCode }})</h2>
      <div class="trash" @click="deleteCity">
        <Fa :icon="faTrashIcon"/>
      </div>
    </div>
    <p>Supplier: {{ city.supplier }}</p>
    <p class="drinkable-indicator" :style="waterQualityStyle">{{ waterQualityText }}</p>
  </div>
</template>

<style scoped>
.city-card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 300px;
  background-color: #f8f8f8;
  justify-content: space-between;
}

.city-card h2 {
  margin: 0;
  font-size: 20px;
}

.drinkable-indicator {
  font-size: 17px;
  font-weight: 700;
}

.city-card .card-header {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.city-card .card-header .trash {
  cursor: pointer;
  margin-top: 5px;
}

.not-drinkable {
border: 2px solid red; padding: 1em; margin: 1em 0;
}

.partially-drinkable {
border: 2px solid orange; padding: 1em; margin: 1em 0;
}

.drinkable {
border: 2px solid green; padding: 1em; margin: 1em 0;
}
</style>
