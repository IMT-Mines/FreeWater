<script>
import axios from 'axios';
import CityCard from './CityCard.vue';

export default {
  components: {
    CityCard,
  },
  data() {
    return {
      cities: [],
    };
  },
  created() {
    this.fetchCities();
  },
  methods: {
    async fetchCities() {
      try {
        const response = await axios.get('http://localhost:10002/favorite', {
          headers: {
            Authorization: `Bearer coucou`,
          },
        });
        this.cities = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
  },
};
</script>

<template>
  <div class="sample-box">
    <h1>Cities sample</h1>
    <div v-if="cities.length" class="cities-container">
      <CityCard v-for="city in cities" :key="city.cityCode" :city="city"/>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style scoped>

.sample-box {
  margin: auto;
  width: 90%;
}

.cities-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
