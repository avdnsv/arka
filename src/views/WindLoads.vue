<script>
import MainHeader from "../components/MainHeader.vue";
import MainFooter from "../components/MainFooter.vue";
import AdditionalInfo from "../components/AdditionalInfo.vue";
import OpenIndicator from "../components/icons/OpenIndicator.vue";

import API from "../api";

export default {
  components: {
    MainHeader,
    MainFooter,
    AdditionalInfo,
    OpenIndicator,
  },
  data() {
    return {
      cities: [],
      selectedCity: null,
      cityData: { is_heat_data: true },
      errors: [],
    };
  },
  methods: {
    async updateListOfCities() {
      this.cities = await API.getListOfCities();
    },
    async updateDataOfTheCity() {
      this.cityData = await API.getDataOfTheCity(this.selectedCity);
      if (!this.cityData["is_heat_data"]) {
        return (this.humidityZone = null), (this.humidMode = null);
      }
      this.humidityZone = this.cityData["humidity_zone"];
    },
  },
  created: function () {
    this.updateListOfCities();
  },
};
</script>

<template>
  <main-header />
  <div class="wrapper-name-info">
    <additional-info />
  </div>
  <form class="calculation-form">
    <section class="wrapper-block">
      <h1 class="title">ВЕТРОВАЯ НАГРУЗКА</h1>
      <p class="paragraph">
        Ветровая нагрузка определяется в соответствии с требованиями СП
        20.13330.2016.
      </p>
    </section>

    <div class="wrapper-block">
      <h1 class="title">РАЙОН СТРОИТЕЛЬСТВА</h1>
      <v-select
        :class="{ error: errors.includes('selectedCity') }"
        v-model="selectedCity"
        @option:selected="updateDataOfTheCity"
        :options="cities"
        :reduce="(name) => name.id"
        label="name"
        name="city"
      >
        <template #open-indicator="">
          <open-indicator class="vs__open-indicator" />
        </template>
        <template #no-options="{ search, searching }">
          <template v-if="searching"
            >По запросу <b>{{ search }}</b> ничего не найдено</template
          >
          <template v-else>В данный момент список городов недоступен.</template>
        </template>
      </v-select>
    </div>

    <div class="wrapper-block" v-if="selectedCity != null">
      <h1 class="title">РЕЗУЛЬТАТ</h1>
      <p class="paragraph">
        Ветровой район - {{ cityData.wind_zone }}
        <br />
        Ветровая нагрузка <i>S<sub>g</sub></i> - {{ cityData.wind_load }} кПа
      </p>
    </div>
  </form>
  <main-footer />
</template>

<style scoped></style>
