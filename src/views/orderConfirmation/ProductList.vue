<template>
  <div class="products">
    <div class="products_info">
      <div class="products_title">{{ shopName }}</div>
      <div class="products_list">
        <template v-for="item in productList" :key="item._id">
          <div class="products_item" v-if="item.count > 0">
            <img class="products_item_img" :src="item.imgUrl" />
            <div class="products_item_detail">
              <h4 class="products_item_title">{{ item.name }}</h4>
              <p class="products_item_price">
                <span class="products_item_single">
                  <span class="products_item_yen">&yen;</span>
                  {{ item.price }} x {{ item.count }}
                </span>
                <span class="products_item_total">
                  <span class="products_item_yen">&yen;</span>
                  {{ (item.price * item.count).toFixed(2) }}
                </span>
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.products {
  position: absolute;
  left: 0.18rem;
  right: 0.18rem;
  top: 2.1rem;
  bottom: 0.7rem;
  overflow-y: auto;
  &_info {
    width: 100%;
    margin-bottom: 0.14rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &_title {
    font-size: 0.16rem;
    color: #333;
    background: #fff;
    padding: 0.16rem 0.16rem 0 0.16rem;
  }
  &_list {
    background: #fff;
    padding-bottom: 0.16rem;
  }
  &_item {
    position: relative;
    display: flex;
    padding: 0.16rem 0.16rem 0 0.16rem;
    &_detail {
      overflow: hidden;
      flex: 1;
    }
    &_img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &_title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-font-color;
      @include ellipsis;
    }
    &_price {
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
      display: flex;
    }
    &_total {
      text-align: right;
      flex: 1;
      color: #000;
    }
    &_yen {
      font-size: 0.12rem;
    }
  }
}
</style>
