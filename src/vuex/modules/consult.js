import router from '@/router'
const state = {
  latestMsg: {}, //最新一条的消息
  historyList: [], //历史记录

};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  //处理环信发来的新消息
  setMsg(state, msg) {
    //当在本群的咨询页面或收到系统消息时 消息数量不用存入缓存中，直接展示在页面中即可
    if (router.currentRoute.query.groupId == msg.to || msg.action) {
      state.latestMsg = msg
    } else {
      let count = window.utils.storage.getter('group' + msg.to, 1)
      if (!count) {
        count = 1
      } else {
        count++
      }
      window.utils.storage.setter('group' + msg.to, count, 1)
      state.latestMsg = msg
    }

    //如果有保存的当前群的历史记录，插入对应的数组，没有的话不用保存  进入页面会调用环信API，获取完整的历史记录
    //系统消息不保存
    if (msg.action) return
    let index = state.historyList.findIndex(ele => {
      return ele.group_id == msg.to
    });
    if (index != -1) {
      state.historyList[index].msgs.push(msg)
    }
  },
  //新建 覆盖历史记录
  setHistoryList(state, {
    msgs,
    group_id
  }) {
    let obj = {
      group_id,
      msgs
    }
    let index = state.historyList.findIndex(ele => {
      return ele.group_id == group_id
    })
    if (index == -1) {
      state.historyList.push(obj)
    } else {
      state.historyList[index] = obj
    }

  },
  addNewMsg(state,{msg}){
    let index = state.historyList.findIndex(ele => {
      return ele.group_id == msg.to
    });
    if (index != -1) {
      state.historyList[index].msgs.push(msg)
    }
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};