<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) of list" :key="index">
        <div class="order_title">
          <span class="order_title_name">{{ item.shopName }}</span>
          <span class="order_title_status">{{
            item.isCanceled ? "已取消" : "已下单"
          }}</span>
        </div>
        <div class="order_content">
          <div class="order_content_imgs">
            <template
              v-for="(innerItem, innerIndex) of item.products"
              :key="innerIndex"
            >
              <img
                class="order_content_img"
                :src="innerItem.product.img"
                v-if="innerIndex <= 3"
              />
            </template>
          </div>
          <div class="order_content_info">
            <div class="order_content_price">¥ {{ item.totalPrice }}</div>
            <div class="order_content_count">共 {{ item.totalNumber }} 件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import Docker from '../../components/Docker'
import { get } from '../../utils/request'
// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getOrder = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products || []
        let totalPrice = 0
        let totalNumber = 0
        products.forEach((productItem) => {
          totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)
          totalNumber += (productItem?.orderSales || 0)
        })
        order.totalPrice = totalPrice
        order.totalNumber = totalNumber
      })
      data.list = result.data
    }
  }
  getOrder()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { Docker },
  setup() {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  overflow-y: auto;
  background: #f5f5f5;
}
.title {
  line-height: 0.44rem;
  background: #fff;
  font-size: 0.16rem;
  color: #333;
  text-align: center;
}
.order {
  margin: 0.16rem 0.18rem;
  padding: 0.16rem;
  background: #fff;
  &_title {
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: #333;
    display: flex;
    justify-content: space-between;
    &_status {
      color: #999;
      font-size: 0.14rem;
    }
  }
  &_content {
    display: flex;
    margin: 0.16rem 0 0 0;
    &_imgs {
      flex: 1;
    }
    &_img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.12rem;
    }
    &_info {
      width: 0.7rem;
    }
    &_price {
      line-height: 0.2rem;
      margin-bottom: 0.04rem;
      font-size: 0.14rem;
      color: #e93b3b;
      text-align: right;
    }
    &_count {
      line-height: 0.14rem;
      font-size: 0.12rem;
      color: #333;
      float: right;
    }
  }
}
</style>
