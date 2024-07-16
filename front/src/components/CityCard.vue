<script>
export default {
  props: {
    city: {
      type: Object,
      required: true,
    },
  },
  computed: {
    waterQualityClass() {
      if (this.isDrinkable === 0) return 'not-drinkable';
      if (this.isDrinkable === 1) return 'partially-drinkable';
      return 'drinkable';
    },
    waterQualityText() {
      if (this.isDrinkable === 0) return 'Undrinkable';
      if (this.isDrinkable === 1) return 'Partially drinkable';
      return 'Drinkable';
    },
    waterQualityStyle() {
      if (this.isDrinkable === 0) return { color: 'red' };
      if (this.isDrinkable === 1) return { color: 'orange' };
      return { color: 'green' };
    },
    isDrinkable() {
      const scores = this.city.samples.map(sample => sample.drinkable);
      if (scores.includes(0)) return 0;
      if (scores.includes(1)) return 1;
      return 2;
    },
  },
};
</script>

<template>
  <div :class="waterQualityClass" class="city-card">
    <h2>{{ city.cityName }} ({{ city.cityCode }})</h2>
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
}

.drinkable-indicator {
  font-size: 17px;
  font-weight: 700;
}

.not-drinkable {
  //border: 2px solid red;
  padding: 1em;
  margin: 1em 0;
}
.partially-drinkable {
  //border: 2px solid orange;
  padding: 1em;
  margin: 1em 0;
}
.drinkable {
  //border: 2px solid green;
  padding: 1em;
  margin: 1em 0;
}
</style>
