import {
  extendList,
  extendRule,
  initData,
  lastNodeList,
  groupList,
  orgList,
  positionList,
  saveItem
} from '@/api/workflow/define/extend/extend'

const state = {
  list: [], // 代办配置数据
  detailData: {}, // 编辑初始化数据
  dicList: [], // 数据字典
  lastNodeList: [], // 上一节点列表
  groupList: [] // 组织树数据
}

const mutations = {
  setData: (state, data) => {
    state.list = data
  },
  setDetailInitData: (state, data) => {
    state.detailData = data
  },
  sysDic: (state, data) => {
    state.dicList = data
  },
  lastNode: (state, data) => {
    state.lastNodeList = data
  },
  group: (state, data) => {
    state.groupList = data
  }
}

const actions = {
  // user login
  getList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      extendList(payload).then(response => {
        commit('setData', response.ResponseBody.RetList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 编辑初始化
  getInitData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      initData(payload).then(response => {
        commit('setDetailInitData', response.ResponseBody)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 数据字典
  getRuleList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      extendRule(payload).then(response => {
        commit('sysDic', response.ResponseBody.RetList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 上一节点
  getLastNode({ commit }, payload) {
    return new Promise((resolve, reject) => {
      lastNodeList(payload).then(response => {
        commit('lastNode', response.ResponseBody.RetList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 组织
  getGroup({ commit }, payload) {
    return new Promise((resolve, reject) => {
      groupList(payload).then(response => {
        commit('group', response.ResponseBody.RetList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

