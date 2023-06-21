<script>
import MainHeader from "../components/MainHeader.vue";
import MainFooter from "../components/MainFooter.vue";
import AdditionalInfo from "../components/AdditionalInfo.vue";
import ElemSelect from "../components/ElemSelect.vue";
import ElemInput from "../components/ElemInput.vue";
import ElemTooltip from "../components/ElemTooltip.vue";

import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { XCircleIcon } from "@heroicons/vue/24/outline";

import API from "../api";

export default {
  components: {
    MainHeader,
    MainFooter,
    AdditionalInfo,
    ElemInput,
    ElemSelect,
    ElemTooltip,
    PlusCircleIcon,
    XCircleIcon,
  },
  data() {
    return {
      temperature: null,
      humidity: null,
      typeBuilding: { title: "Выберите значение из списка", value: null },
      typeConstruction: { title: "Выберите значение из списка", value: null },
      innerIndex: { title: "Выберите значение из списка", value: null },
      outerIndex: { title: "Выберите значение из списка", value: null },

      humidMode: null,
      humidityZone: null,
      calculation: { valid: null },

      typesOfBuilding: [
        "Жилые, гостиницы и общежития",
        "Дошкольные образовательные и общеобразовательные организации, медицинские организации и интернаты",
        "Общественные, административные и бытовые, за исключением помещений с влажным или мокрым режимом",
        "Производственные с сухим и нормальным режимами",
      ],
      typesOfConstruction: [
        "Стены, включая стены в грунте",
        "Покрытия и перекрытия над проездами",
        "Перекрытия чердачные или над неотапливаемыми подпольями и подвалами, полы по грунту",
        "Окна, фасадные и другие типы светопрозрачных конструкций, за исключением фонарей",
        "Фонари",
      ],
      innerIndexValues: [
        "Стены, полы, гладкие потолки, потолки с выступающими ребрами (при отношении h/a <= 0,3)",
        "Потолки с выступающими ребрами (при отношении h/a > 0,3)",
        "Окна",
        "Зенитные фонари",
      ],
      outerIndexValues: [
        "Наружные стены, покрытия, перекрытия над проездами и над холодными (без ограждающих стенок) подпольями в Северной строительно-климатической зоне",
        "Перекрытия над холодными подвалами, сообщающимися с наружным воздухом, перекрытия над холодными (с ограждающими стенками) подпольями и холодными этажами в Северной строительно-климатической зоне",
        "Перекрытия чердачные и над неотапливаемыми подвалами со световыми проемами в стенах, а также наружные стены с воздушной прослойкой, вентилируемой наружным воздухом",
        "Перекрытия над неотапливаемыми подвалами и техническими, подпольями, не вентилируемые наружным воздухом",
      ],
      layers: [
        {
          layerName: null,
          layerThickness: null,
          layerConductivity: null,
        },
      ],
      cities: [],
      selectedCity: null,
      cityData: { is_heat_data: true },
      errors: [],
    };
  },
  methods: {
    selectOption(name, option, value) {
      if (name == "typeOfBuilding") {
        this.typeBuilding.title = option;
        this.typeBuilding.value = value;
      }
      if (name == "typeOfConstruction") {
        this.typeConstruction.title = option;
        this.typeConstruction.value = value;
      }
      if (name == "innerIndex") {
        this.innerIndex.title = option;
        this.innerIndex.value = value;
      }
      if (name == "outerIndex") {
        this.outerIndex.title = option;
        this.outerIndex.value = value;
      }
    },
    addLayerInTable(index) {
      this.layers.splice(index + 1, 0, {
        layerName: null,
        layerThickness: null,
        layerConductivity: null,
      });
    },
    removeLayerInTable(index) {
      if (this.layers.length > 1) {
        this.layers.splice(index, 1);
      }
    },
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
    async updateHumidMode() {
      this.humidMode = await API.getHumidMode(
        this.temperature,
        this.humidity,
        this.humidityZone
      );
    },
    async calculateTheData() {
      this.calculation = { valid: null };
      if (this.validate()) {
        this.calculation = await API.requestOfCalculation(this.bodyParams);
      }
    },
    async downloadAReport() {
      if (this.validate()) {
        let a = document.createElement("a");
        a.href = window.URL.createObjectURL(
          await API.requestOfReport(this.bodyParams)
        );
        a.download = "report";
        a.click();
      }
    },
    reset() {
      this.temperature = null;
      this.humidity = null;
      this.typeBuilding = { title: "Выберите значение из списка", value: null };
      this.typeConstruction = {
        title: "Выберите значение из списка",
        value: null,
      };
      this.innerIndex = { title: "Выберите значение из списка", value: null };
      this.outerIndex = { title: "Выберите значение из списка", value: null };

      this.humidMode = null;
      this.humidityZone = null;
      this.calculation = { valid: null };

      this.layers = [
        {
          layerName: null,
          layerThickness: null,
          layerConductivity: null,
        },
      ];
      this.selectedCity = null;
      this.cityData = { is_heat_data: true };
      this.errors = [];
    },
    validate() {
      this.errors = [];
      if (!this.selectedCity) this.errors.push("selectedCity");
      if (!this.temperature && this.temperature !== 0) {
        this.errors.push("temperature");
      }
      if (
        (!this.humidity && this.humidity !== 0) ||
        !(this.humidity >= 0 && this.humidity <= 100)
      ) {
        this.errors.push("humidity");
      }
      if (!this.typeBuilding.value) this.errors.push("typeOfBuilding");
      if (!this.typeConstruction.value) this.errors.push("typeOfConstruction");
      if (!this.innerIndex.value) this.errors.push("innerIndex");
      if (!this.outerIndex.value) this.errors.push("outerIndex");
      for (let index in this.layers) {
        if (!this.layers[index].layerName)
          this.errors.push("name" + String(index));
        if (
          !this.layers[index].layerThickness &&
          this.layers[index].layerThickness !== 0
        ) {
          this.errors.push("thickness" + String(index));
        }
        if (!this.layers[index].layerConductivity) {
          this.errors.push("conductivity" + String(index));
        }
      }

      if (!this.cityData.is_heat_data) this.errors.push("isHeatData");

      if (this.typeBuildingValue !== 4 && this.typeConstructionValue == 4)
        this.errors.push("notTypeConstruction");

      return this.errors.length == 0;
    },
  },
  computed: {
    calculationResult() {
      return this.calculation.checking ? "соответствует" : "не соответствует";
    },
    isHumidMode() {
      return !!this.humidityZone &&
        !!this.temperature &&
        !!this.humidity &&
        this.humidity >= 0 &&
        this.humidity <= 100
        ? this.updateHumidMode()
        : (this.humidMode = null);
    },
    isHeatingData() {
      if (this.selectedCity == null) {
        this.cityData = { is_heat_data: true };
        return this.cityData.is_heat_data;
      }
      return this.cityData.is_heat_data;
    },
    bodyParams() {
      return {
        city: this.selectedCity,
        temperature: this.temperature,
        humidity: this.humidity,
        type_building: this.typeBuilding.value,
        type_construction: this.typeConstruction.value,
        layers_construction: this.layers,
        inner_index: this.innerIndex.value,
        outer_index: this.outerIndex.value,
      };
    },
  },
  created: function () {
    this.updateListOfCities();
  },
};
</script>

<template>
  <main-header />
  <section class="wrapper-name-info">
    <additional-info />
  </section>

  <form class="calculation-form">
    <div class="wrapper-block">
      <h1 class="title">ОБЩИЕ ДАННЫЕ</h1>
      <p class="paragraph">
        Расчет выполняется в соответствии с требованиями СП 50.13330.2012, СП
        131.13330.2020, ГОСТ 30494-2011.
      </p>
    </div>
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
        <template #no-options="{ search, searching }">
          <template v-if="searching"
            >По запросу <b>{{ search }}</b> ничего не найдено</template
          >
          <template v-else>В данный момент список городов недоступен.</template>
        </template>
      </v-select>
      <p class="warning-message" v-if="!isHeatingData">
        ДЛЯ ДАННОГО ГОРОДА ОТСУТСТВУЮТ КЛИМАТИЧЕСКИЕ ДАННЫЕ
      </p>
    </div>

    <div class="wrapper-block">
      <elem-input
        name="temperature"
        label="РАСЧЕТНАЯ ТЕМПЕРАТУРА ВНУТРЕННЕГО ВОЗДУХА, ℃"
        tooltip="true"
        tooltip-text="Температура внутреннего воздуха принимается при расчете ограждающих конструкций групп зданий согласно табл. 1-3 ГОСТ 30494-2011."
        type="number"
        v-model.number="temperature"
        :errors="errors"
      />
    </div>

    <div class="wrapper-block">
      <elem-input
        name="humidity"
        label="ВЛАЖНОСТЬ ВНУТРЕННЕГО ВОЗДУХА, %"
        tooltip="true"
        tooltip-text="Влажность внутреннего воздуха принимается при расчете ограждающих конструкций групп зданий согласно табл. 1-3 ГОСТ 30494-2011."
        type="number"
        v-model.number="humidity"
        :errors="errors"
      />
      <p class="additional-message" v-if="isHumidMode">
        УСЛОВИЕ ЭКСПЛУАТАЦИИ ОГРАЖДАЮЩЕЙ КОНСТРУКЦИИ - {{ humidMode }}
      </p>
    </div>

    <div class="wrapper-block">
      <elem-select
        :title="typeBuilding.title"
        :options="typesOfBuilding"
        :errors="errors"
        @select="selectOption"
        name="typeOfBuilding"
        label="ТИП ЗДАНИЯ (ПОМЕЩЕНИЯ)"
      />
    </div>

    <div class="wrapper-block">
      <elem-select
        :title="typeConstruction.title"
        :options="typesOfConstruction"
        :errors="errors"
        @select="selectOption"
        name="typeOfConstruction"
        label="ТИП ОГРАЖДАЮЩЕЙ КОНСТРУКЦИИ"
      />
      <p
        class="warning-message"
        v-if="typeBuilding.value !== 4 && typeConstruction.value == 4"
      >
        ДЛЯ ДАННОГО ТИПА ОГРАЖДАЮЩЕЙ КОНСТРУКЦИИ РАСЧЁТ НЕ ПРЕДУСМОТРЕН
      </p>
    </div>

    <div class="wrapper-block">
      <div class="wrapper-heading-tooltip">
        <h1 class="title">ОГРАЖДАЮЩАЯ КОНСТРУКЦИЯ</h1>
        <elem-tooltip
          title="Ограждающая конструкция описывается послойно в
        любом порядке. В поле <b>Наименование</b> указывается название материала в
        произвольной форме. В поле <b><i>δ</i>, мм</b> устанавливается толщина данного
        материала. В поле <b><i>λ</i>, Вт/(м∙℃)</b> указывается расчетная теплопроводность (А или Б) данного материала."
        />
      </div>
      <table class="table">
        <thead>
          <tr>
            <td>№</td>
            <td>Наименование</td>
            <td><i>δ</i>, мм</td>
            <td>
              <i
                >λ<sub>{{ humidMode }}</sub></i
              >, Вт/(м∙℃)
            </td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody class="tbody" v-for="(item, index) in layers" :key="index">
          <tr>
            <td></td>
            <td>
              <elem-input
                :name="'name' + String(index)"
                type="text"
                v-model="item.layerName"
                :errors="errors"
              />
            </td>
            <td>
              <elem-input
                :name="'thickness' + String(index)"
                type="number"
                v-model.number="item.layerThickness"
                :errors="errors"
              />
            </td>
            <td>
              <elem-input
                :name="'conductivity' + String(index)"
                type="number"
                v-model.number="item.layerConductivity"
                :errors="errors"
              />
            </td>
            <td>
              <button
                class="button added"
                @click="addLayerInTable(index)"
                type="button"
              >
                <PlusCircleIcon />
                Добавить
              </button>
            </td>
            <td>
              <button
                class="button removed"
                @click="removeLayerInTable(index)"
                type="button"
              >
                <XCircleIcon />
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="wrapper-block">
      <elem-select
        :title="innerIndex.title"
        :options="innerIndexValues"
        :errors="errors"
        @select="selectOption"
        name="innerIndex"
        label="ВНУТРЕННЯЯ ПОВЕРХНОСТЬ ОГРАЖДАЮЩЕЙ КОНСТРУКЦИИ"
      />
    </div>

    <div class="wrapper-block">
      <elem-select
        :title="outerIndex.title"
        :options="outerIndexValues"
        :errors="errors"
        @select="selectOption"
        name="outerIndex"
        label="НАРУЖНАЯ ПОВЕРХНОСТЬ ОГРАЖДАЮЩЕЙ КОНСТРУКЦИИ"
      />
    </div>

    <div class="wrapper-block inline">
      <button class="button" @click="calculateTheData" type="button">
        Рассчитать
      </button>
      <button class="button" @click="downloadAReport" type="button">
        Скачать PDF
      </button>
      <button class="button reset" @click="reset" type="button">
        Сбросить
      </button>
    </div>

    <div class="wrapper-block" v-if="calculation.valid != null">
      <h1 class="title">РЕЗУЛЬТАТ</h1>
      <p class="paragraph" v-if="calculation.valid">
        Нормируемое <i>R<sub>о</sub><sup>норм</sup></i> -
        {{ calculation.normed_resistance }} и приведенное
        <i>R<sub>о</sub><sup>пр</sup></i> - {{ calculation.con_resistance }}
        сопротивление теплопередаче, м<sup>2</sup>∙℃/Вт
        <br />
        Ограждающая конструкция
        <strong class="important">{{ calculationResult }}</strong>
        требованиям пункта «а» п.5.1 СП50.13330.2012.
      </p>
      <p class="paragraph" v-if="!calculation.valid">{{ calculation.error }}</p>
    </div>
  </form>
  <main-footer />
</template>

<style>
.wrapper-name-info {
  margin: 130px auto 60px;
}

.warning-message {
  color: var(--color-red);
  font-size: 13px;
  margin: 16px 0 0;
}

.additional-message {
  color: var(--color-green);
  font-size: 13px;
  margin: 16px 0 0;
}

.calculation-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 944px;
  margin: 30px auto 60px;
}

.title,
.label {
  display: block;
  font-weight: bold;
  font-size: inherit;
  color: var(--color-grey);
  margin: 0 0 8px;
}

.paragraph {
  margin: 0;
}

.wrapper-heading-tooltip {
  display: flex;
  align-items: center;
  gap: 8px;
}

.inline {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.table {
  border-collapse: collapse;
  text-align: center;
  width: 100%;
  counter-reset: rowNumber;
}

tr,
td {
  padding-bottom: 8px;
  padding-left: 16px;
}

tbody td:first-child::before {
  display: block;
  counter-increment: rowNumber;
  content: counter(rowNumber);
  border: 1px solid var(--color-grey);
  border-radius: 8px;
  width: 100%;
  padding: 8px 0px 9px;
}

td:nth-child(1) {
  padding-left: 0px;
  width: 40px;
}

td:nth-child(3),
td:nth-child(4) {
  width: 126px;
}

td:nth-child(5),
td:nth-child(6) {
  width: 110px;
}

.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-size: inherit;
  padding: 10px 16px 9px;
  border: 1px solid var(--color-grey);
  border-radius: 8px;
  cursor: pointer;
  background: var(--color-white);
  white-space: nowrap;
  width: fit-content;
}

.table .button {
  width: 100%;
}

.button > svg {
  height: 20px;
  color: var(--color-grey);
}

.button:hover {
  background: var(--color-grey);
  color: var(--color-white);
  transition: all 0.3s ease 0s;
}

.button:hover > svg {
  color: var(--color-white);
  transition: all 0.3s ease 0s;
}

.added:hover {
  background-color: var(--color-green);
  border: 1px solid var(--color-green);
}

.reset:hover,
.removed:hover {
  background-color: var(--color-red);
  border: 1px solid var(--color-red);
}

.reset {
  margin-left: auto;
}
</style>
