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
        console.error('Error while retrieving data:', error);
      }
    },

    async fetchFavoriteCities() {
      try {
        const response = await axios.get('http://localhost:10002/favorite');
        this.favoritesCitiesSamples = response.data;
      } catch (error) {
        console.error('Error while retrieving data:', error);
      }
    },
    handleCityDeleted() {
      this.fetchFavoriteCities();  // Rafraîchir les données des villes favorites
    },
    async addCity() {
      const cityInput = document.querySelector('input[name="Cities"]');
      const city = this.cities.find((city) => city.name === cityInput.value);
      if (city) {
        try {
          await axios.post('http://localhost:10002/favorite', {
            cityCode: city.code,
          });
          this.fetchFavoriteCities();
        } catch (error) {
          console.error('Error adding city:', error);
        }
      }
    },
  },
};
</script>

<template>
  <div class="sample-box">
    <div class="add-container">
      <h1>Cities sample</h1>
      <div class="add-city" v-if="cities.length">
        <input list="cities" name="Cities"/>
        <datalist id="cities">
          <option v-for="city in cities" :key="city.code" :value="city.name"></option>
        </datalist>
        <button type="button" @click="addCity">Add</button>
      </div>
      <div v-else class="fake-loader">
        <div class="fake-input"></div>
        <div class="fake-button"></div>
      </div>
    </div>
    <div v-if="favoritesCitiesSamples.length" class="cities-container">
      <CityCard v-for="city in favoritesCitiesSamples" :key="city.cityCode" :city="city" @cityDeleted="handleCityDeleted"/>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style scoped>

.fake-button {
  width: 43px;
  height: 35px;
  background-color: #f8f8f8;
  border-radius: 10px;
  animation: loading 1s infinite;
}

@keyframes loading {
  0% {
    background-color: #f8f8f8;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f8f8f8;
  }
}

.fake-input {
  width: 186px;
  height: 36px;
  background-color: #f8f8f8;
  border-radius: 10px;
  animation: loading 1s infinite;
}

.fake-loader {
  display: flex;
  gap: 10px;
  align-items: center;
}

.sample-box {
  margin: auto;
  width: 90%;
}

.sample-box .add-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.add-city {
  display: flex;
  gap: 10px;
  align-items: center;
}

.cities-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
