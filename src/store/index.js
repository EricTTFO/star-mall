import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { setStore, getStore } from '@/views/utils/storage'
export default new Vuex.Store({
  state: {
    // 是否登录
    login: false,
    // 用户信息
    userInfo: null,
    // 加入购物车商品
    cartList: [],
    // 展示购物车信息
    showCart: false
  },
  mutations: {
    INITBUYCART(state) {
      let initCart = getStore('buyCart');
      if(initCart) {
        state.cartList = JSON.parse(initCart)
      }
    },
    SHOWCART(state, { showCart }) {
      state.showCart = showCart;
    },
    ISLOGIN(state, info) {
      state.userInfo = info;
      state.login = true;
      setStore('userInfo', info);
    },
    ADDCART(state, { productId, salePrice, productName, productImageBig, productNum = 1 }) {
      let cart = state.cartList;
      let goods = {
        productId,
        salePrice,
        productName,
        productImageBig
      }
      let flag = true
      if (cart.length) {
        cart.forEach(item => {
          if (item.productId === productId) {
            if (item.productNum >= 0) {
              flag = false;
              item.productNum += productNum;
            }
          }
        });
      }
      if (!cart.length || flag) {
        goods.productNum = productNum;
        cart.push(goods);
      }
      state.cartList = cart;
      setStore('buyCart', cart);
    }
  },
  actions: {
  },
  modules: {
  }
})
