<script>
import axios from 'axios';
import CityCard from './CityCard.vue';

export default {
  components: {
    CityCard,
  },
  data() {
    return {
      favoritesCitiesSamples: [],
      cities: [],
    };
  },
  created() {
    this.fetchFavoriteCities();
    this.fetchAllCities();
  },
  methods: {
    async fetchAllCities() {
      try {
        const response = await axios.get('http://localhost:10001/cities');
        this.cities = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },

    async fetchFavoriteCities() {
      try {
        const response = await axios.get('http://localhost:10002/favorite');
        this.favoritesCitiesSamples = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
  },
};
</script>

<template>
  <div class="sample-box">
    <div class="add-container">
      <h1>Cities sample</h1>
      <div v-if="cities.length">
        <input list="cities" name="Cities" />
        <datalist id="cities">
          <option v-for="city in cities" :key="city.code" :value="city.name"></option>
        </datalist>
      </div>
    </div>
    <div v-if="favoritesCitiesSamples.length" class="cities-container">
      <CityCard v-for="city in favoritesCitiesSamples" :key="city.cityCode" :city="city"/>
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

.sample-box .add-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}


.cities-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
