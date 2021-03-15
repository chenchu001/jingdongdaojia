<template>
  <div class="order">
    <div class="order_price">
      实付金额 <b>¥{{ calculations.price }}</b>
    </div>
    <div class="order_btn" @click="handleSubmitClick(true)">提交订单</div>
  </div>
  <div class="mask" v-show="showConfirm" @click="handleSubmitClick(false)">
    <div class="mask_content" @click.stop>
      <h3 class="mask_content_title">确认要离开收银台？</h3>
      <p class="mask_content_desc">请尽快完成支付，否则将被取消</p>
      <div class="mask_content_btns">
        <div
          class="mask_content_btn mask_content_btn-first"
          @click="handleConfirmOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask_content_btn mask_content_btn-last"
          @click="handleConfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffects'
import { post } from '../../utils/request'

// 提交订单和取消订单逻辑
const useMakeOrderEffect = (shopName, productList, shopId) => {
  const router = useRouter()
  const store = useStore()
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (let i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product._id, 10) }, { num: product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        router.push({ name: 'OrderList' })
        store.commit('clearCartData', shopId)
      }
    } catch (e) { }
  }
  return { handleConfirmOrder }
}

// 蒙层显隐逻辑
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleSubmitClick = (flag) => {
    showConfirm.value = flag
  }
  return { showConfirm, handleSubmitClick }
}

export default {
  setup() {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const { calculations, shopName, productList } = useCommonCartEffect(shopId)
    const { handleConfirmOrder } = useMakeOrderEffect(shopName, productList, shopId)
    const { showConfirm, handleSubmitClick } = useShowMaskEffect()
    return { showConfirm, calculations, handleConfirmOrder, handleSubmitClick }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.order {
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  &_price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: #333;
    b {
      font-size: 0.16rem;
    }
  }
  &_btn {
    width: 0.98rem;
    background: #4fb0f9;
    font-size: 0.14rem;
    text-align: center;
    color: #fff;
  }
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  &_content {
    width: 3rem;
    height: 1.56rem;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.04rem;
    text-align: center;
    &_title {
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
      font-size: 0.18rem;
      color: #333;
    }
    &_desc {
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
      color: #666;
    }
    &_btns {
      display: flex;
      margin: 0.24rem 0.58rem;
    }
    &_btn {
      width: 0.8rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      &-first {
        margin-right: 0.12rem;
        border: 0.01rem solid #4fb0f9;
        color: #4fb0f9;
      }
      &-last {
        margin-left: 0.12rem;
        background: #4fb0f9;
        color: #fff;
      }
    }
  }
}
</style>
