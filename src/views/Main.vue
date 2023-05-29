<script>
import MainHeader from "../components/MainHeader.vue";
import MainFooter from "../components/MainFooter.vue";
import ArcName from "../components/icons/ArcName.vue";

export default {
  components: {
    MainHeader,
    MainFooter,
    ArcName,
  },
};
</script>

<template>
  <main-header />
  <arc-name class="service-name" />
  <section class="additional-info">
    <p class="paragraph">
      <b class="title-description">АРКА</b> - это онлайн платформа,
      предоставляющая возможность быстро производить архитектурные и
      строительные расчёты. Этот сервис будет полезен для профессиональных
      архитекторов и инженеров, а также для людей, занимающихся ремонтом и
      строительными работами в домашних условиях. Все вычисления происходят
      автоматически, на основе введенных пользователем данных. Благодаря этому,
      пользователи могут быстро и точно производить расчеты, что позволяет
      сократить время и улучшить качество работы.
    </p>
  </section>
  <h1 class="title-advantages">НАШИ ПРЕИМУЩЕСТВА</h1>
  <div class="wrapper-section">
    <div class="container">
      <img src="../assets/images/003.png" />
      <h1 class="title-description">ДОСТУПНЫЙ ИНТЕРФЕЙС</h1>
    </div>
    <div class="container">
      <img src="../assets/images/002.png" />
      <h1 class="title-description">ЭКОНОМИЯ ВРЕМЕНИ ПРИ РАСЧЕТАХ</h1>
    </div>
    <div class="container">
      <img src="../assets/images/001.png" />
      <h1 class="title-description">ДОСТУП ОНЛАЙН С ЛЮБОГО УСТРОЙСТВА</h1>
    </div>
  </div>
  <main-footer />
</template>

<style>
.service-name {
  display: block;
  margin: 130px auto 60px;
}

.title-advantages {
  margin: 0 auto 32px;
  text-align: center;
  color: var(--color-grey);
}

.title-description {
  font-size: inherit;
  color: var(--color-grey);
  margin: 8px 0 0;
  width: 200px;
}

.wrapper-section {
  display: flex;
  justify-content: space-between;
  max-width: 944px;
  margin: 0 auto 60px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  text-align: center;
  width: 270px;
  overflow: hidden;
}

.container img {
  width: 110%;
}
</style>
