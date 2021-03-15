<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :key="item"
      :class="{
        docker_item: true,
        'docker_item-active': index === currentIndex,
      }"
    >
      <router-link :to="item.to" replace>
        <div class="iconfont" :class="item.icon"></div>
        <div class="docker_title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup() {
    const dockerList = [
      { icon: 'iconhome', text: '首页', to: { name: 'Home' } },
      { icon: 'iconcart', text: '购物车', to: { name: 'CartList' } },
      { icon: 'iconorder', text: '订单', to: { name: 'OrderList' } },
      { icon: 'iconmyae', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/variables.scss";
@import "../style/mixins.scss";
.docker {
  width: 100%;
  height: 0.5rem;
  padding: 0 0.18rem;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  bottom: 0;
  border-top: 0.01rem solid #f1f1f1;
  display: flex;
  &_item {
    flex: 1;
    text-align: center;
    a {
      text-decoration: none;
    }
    .iconfont {
      font-size: 0.2rem;
      color: #000000;
      margin: 0.07rem 0 0.02rem 0;
    }
    &-active {
      .iconfont,
      .docker_title {
        color: #1fa4fc;
      }
    }
  }
  &_title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
    color: #333333;
  }
}
</style>
