<script setup>
import {defineEmits, defineProps, onMounted, onUnmounted} from 'vue';

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
});

const isDrinkable = (sample) => {
  if (sample.drinkableScore === 0) return 'Undrinkable';
  if (sample.drinkableScore === 1) return 'Partially drinkable';
  return 'Drinkable';
};


const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>{{ city.cityName }} ({{ city.cityCode }})</h2>
      <p>Supplier: {{ city.supplier }}</p>
      <p>Date: {{ new Date(city.date).toLocaleDateString() }}</p>
      <h3>Water Quality Samples</h3>
      <ul class="samples">
        <li v-for="sample in city.samples" :key="sample.name">
          <strong>{{ sample.name }}:</strong> {{ sample.value }} {{ sample.unit }}
        </li>
      </ul>
      <p class="conclusion">{{ city.conclusion}}</p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.conclusion {
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
}

.samples {
  max-height: 300px;
  overflow-y: auto;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  max-height: 80%;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content button {
  margin-top: 20px;
}
</style>
