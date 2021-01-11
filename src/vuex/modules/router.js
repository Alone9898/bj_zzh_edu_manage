const state = {
  routerShow: false, //路由加载loading
};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  setShow(state, type) {
    state.routerShow = type==1?true:false
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};