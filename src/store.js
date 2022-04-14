import { createStore } from "zmp-core/lite";
import api from "zmp-sdk";
const store = createStore({
  state: {
    user: {
      displayName: "Zalo",
      email: "zte@zalo.me",
      avatar: "ZA",
      online: true,
      story: true,
    },
    profileUser: null,
    phoneNumber: null,
    token: null,
    localtionUser: null,
    products: [
      {
        id: "1",
        title: "Apple iPhone 8",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.",
      },
      {
        id: "2",
        title: "Apple iPhone 8 Plus",
        description:
          "Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!",
      },
      {
        id: "3",
        title: "Apple iPhone X",
        description:
          "Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.",
      },
    ],
  },
  getters: {
    user({ state }) {
      return state.user;
    },
    phoneNumber({ state }) {
      return state.phoneNumber;
    },
    token({ state }) {
      return state.token;
    },
    products({ state }) {
      return state.products;
    },
    profileUser({ state }) {
      return state.profileUser;
    },
    localtionUser({ state }) {
      return state.localtionUser;
    },
  },

  actions: {
    setUser({ state }, data) {
      state.user = { ...state.user, ...data };
    },
    setprofileUser({ state }, data) {
      state.profileUser = data;
    },
    addProduct({ state }, product) {
      state.products = [...state.products, product];
    },
    setPhoneNumber({ state }, phone) {
      state.phoneNumber = phone;
    },
    setToken({ state }, tokenUser) {
      state.token = tokenUser;
    },
    setlocaltionUser({ state }, data) {
      state.localtionUser = data;
    },
    async login({}) {
      api.login({
        success: async () => {
          api.getAccessToken({
            success: async (accessToken) => {
              const tokenUser = {
                token1: accessToken,
              };
              store.dispatch("setToken", tokenUser);
            },
            fail: (error) => {
              console.log(error);
            },
          });
          api.getPhoneNumber({
            success: (data) => {
              const { number } = data;
              const phoneNumber = {
                number: number,
              };
              store.dispatch("setPhoneNumber", phoneNumber);
            },
            fail: (error) => {
              console.log(error);
            },
          });
          api.getUserInfo({
            success: (data) => {
              const { userInfo } = data;
              // console.log(userInfo.name, userInfo.avatar);

              store.dispatch("setprofileUser", userInfo);
              // console.log(store.state.profileUser);
            },
            fail: (error) => {
              console.log(error);
            },
          });
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
  },
});

export default store;
