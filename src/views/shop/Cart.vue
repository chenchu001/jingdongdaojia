<template>
  <div
    class="mask"
    v-if="showCart && calculations.total > 0"
    @click="handleCartShowChange"
  ></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product_header">
        <div class="product_header_all" @click="setCartItemChecked(shopId)">
          <span
            class="product_header_icon iconfont"
            :class="[
              calculations.allChecked ? 'iconxuanzhongduigou' : 'iconicons-',
            ]"
          ></span>
          <span class="product_header_all_text">全选</span>
        </div>
        <div class="product_header_clear">
          <span @click="clearCartProducts(shopId)">清空购物车</span>
        </div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div class="product_item" v-if="item.count">
          <div
            class="product_item_checked iconfont"
            :class="[item.check ? 'iconxuanzhongduigou' : 'iconicons-']"
            @click="changeCartItemChecked(shopId, item._id)"
          ></div>
          <img class="product_item_img" :src="item.imgUrl" />
          <div class="product_item_detail">
            <h4 class="product_item_title">{{ item.name }}</h4>
            <p class="product_item_price">
              <span class="product_item_yen">&yen;</span>{{ item.price }}
              <span class="product_item_origin">&yen;{{ item.oldPrice }}</span>
            </p>
          </div>
          <div class="product_number">
            <span
              class="product_number_minus"
              @click="changeCartItemInfo(shopId, item._id, item, -1)"
              >-</span
            >
            <span class="product_number_text">{{ item.count || 0 }}</span>
            <span
              class="product_number_plus"
              @click="changeCartItemInfo(shopId, item._id, item, 1)"
              >+</span
            >
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check_icon">
        <img
          class="check_icon_img"
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          @click="handleCartShowChange"
        />
        <div class="check_icon_tag">{{ calculations.total }}</div>
      </div>
      <div class="check_info">
        总计：<span class="check_info_price"
          >&yen; {{ calculations.price }}</span
        >
      </div>
      <div class="check_btn" v-show="calculations.total > 0">
        <router-link :to="{ path: `/OrderConfirmation/${shopId}` }"
          >去结算</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 购物车金额数量联动逻辑
const useCartEffect = (shopId) => {
  const { changeCartItemInfo, productList, calculations } = useCommonCartEffect(shopId)
  const store = useStore()
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }
  const clearCartProducts = (shopId) => {
    store.commit('clearCartProducts', { shopId })
  }
  const setCartItemChecked = (shopId) => {
    store.commit('setCartItemChecked', { shopId })
  }
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }

  return { productList, changeCartItemInfo, changeCartItemChecked, clearCartProducts, setCartItemChecked, showCart, handleCartShowChange, calculations }
}

export default {
  name: 'Cart',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, changeCartItemInfo, changeCartItemChecked, clearCartProducts, setCartItemChecked, showCart, handleCartShowChange, calculations } = useCartEffect(shopId)
    return { productList, changeCartItemInfo, shopId, changeCartItemChecked, clearCartProducts, setCartItemChecked, showCart, handleCartShowChange, calculations }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: $bgColor;
}

.product {
  overflow-y: scroll;
  flex: 1;
  background: $bgColor;
  &_header {
    line-height: 0.52rem;
    border-bottom: 0.01rem solid #f1f1f1;
    display: flex;
    color: #333;
    &_all {
      width: 0.64rem;
      margin-left: 0.18rem;
      display: flex;
      &_text {
        font-size: 0.14rem;
      }
    }
    &_clear {
      flex: 1;
      margin-right: 0.16rem;
      text-align: right;
      font-size: 0.14rem;
    }
    &_icon {
      font-size: 0.2rem;
      color: #0091ff;
      margin-right: 0.08rem;
    }
  }
  &_item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &_checked {
      line-height: 0.5rem;
      margin-right: 0.2rem;
      font-size: 0.2rem;
      color: #0091ff;
    }
    &_detail {
      overflow: hidden;
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
    }
    &_yen {
      font-size: 0.12rem;
    }
    &_origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product_number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      line-height: 0.18rem;
      font-size: 0;
      &_minus,
      &_plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 50%;
        border: 0.01rem solid #666;
        font-size: 0.2rem;
        text-align: center;
        box-sizing: border-box;
      }
      &_plus {
        color: $btn-bgColor;
        background: #0091ff;
        color: #fff;
        border: none;
        line-height: 0.2rem;
      }
      &_text {
        font-size: 0.14rem;
        color: #333;
        line-height: 0.16rem;
        margin: 0 0.1rem;
      }
    }
  }
}

.check {
  display: flex;
  width: 100%;
  height: 0.5rem;
  border-top: 0.01rem solid #f1f1f1;
  line-height: 0.5rem;
  box-sizing: border-box;
  &_icon {
    position: relative;
    width: 0.84rem;
    &_img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &_tag {
      position: absolute;
      right: 0.2rem;
      top: 0.04rem;
      width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: #e93b3b;
      border-radius: 50%;
      text-align: center;
      font-size: 0.12rem;
      color: #fff;
      transform: scale(0.5);
      transform-origin: center top;
    }
  }
  &_info {
    flex: 1;
    color: #333;
    font-size: 0.12rem;
    &_price {
      color: #e93b3b;
      font-size: 0.18rem;
    }
  }
  &_btn {
    width: 0.98rem;
    line-height: 0.5rem;
    color: #fff;
    font-size: 0.14rem;
    text-align: center;
    background-color: #4fb0f9;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
