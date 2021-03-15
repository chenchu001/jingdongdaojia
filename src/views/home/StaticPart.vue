<template>
  <div class="position">
    <span class="iconfont iconposition"></span>
    <span class="position_title">北京理工大学国防科技园2号楼10层</span>
    <span class="iconfont iconbell"></span>
  </div>
  <div class="search">
    <span class="iconfont iconsousuo"></span>
    <span class="search_text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img
      class="banner_img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
    />
  </div>
  <div class="icons">
    <div class="icons_item" v-for="item in iconsList" :key="item.desc">
      <img
        class="icons_item_img"
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
      />
      <p class="icons_item_desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup() {
    const iconsList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '烘培蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return { iconsList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.position {
  display: flex;
  padding: 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  .iconfont {
    flex: 0 0 0.16rem;
    font-size: 0.2rem;
  }
  &_title {
    flex: 1;
    margin-left: 0.08rem;
    margin-right: 2%;
    color: $content-font-color;
    @include ellipsis;
  }
}
.search {
  line-height: 0.32rem;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  border-radius: 0.16rem;
  padding: 0 0.16rem 0 0.16rem;
  margin-bottom: 0.12rem;
  overflow: hidden;
  .iconfont {
    color: #b7b7b7;
    font-size: 0.16rem;
    position: relative;
    top: 0.01rem;
  }
  &_text {
    font-size: 0.14rem;
    color: #b7b7b7;
    margin-left: 0.04rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &_img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &_item {
    width: 20%;
    &_img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &_desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-font-color;
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background: $content-bgColor;
}
</style>
