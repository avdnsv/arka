<script>
import ArcName from "./icons/ArcName.vue";

export default {
  components: {
    ArcName,
  },
};
</script>

<template>
  <p class="responsibility">
    Предоставленная на сайте информация предназначена исключительно для
    ознакомления. За все возможные последствия, связанные с использованием этой
    информации, пользователь несет самостоятельную ответственность. Владельцы
    сайта не несут ответственность за прямые или косвенные последствия
    использования информации или программного обеспечения, размещенного на этом
    сайте, что также не может служить основанием для судебного разбирательства
    или иного преследования владельцев сайта ни при каких условиях и
    обстоятельствах.
  </p>
  <footer class="footer">
    <a class="link" href="/"><arc-name /></a>
    <p class="paragraph">
      © АРКА, 2023. Любое использование либо копирование материалов или подборки
      материалов сайта, элементов дизайна и оформления допускается лишь с
      разрешения правообладателя и только со ссылкой на источник:
      <a class="footer-block__icon" href="https://www.doarch.site"
        >www.doarch.site</a
      >
    </p>
  </footer>
</template>

<style>
.footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  justify-content: space-between;
  border-top: 1px solid var(--color-grey);
  padding: 32px 0px;
  max-width: 944px;
  margin: auto;
}

.footer svg {
  height: 30px;
  width: fit-content;
}

.footer .paragraph {
  margin: 0;
  font-size: 13px;
}

.responsibility {
  font-size: 13px;
  max-width: 944px;
  margin: 0 auto 32px;
}
</style>
