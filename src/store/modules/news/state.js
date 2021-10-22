import { Module } from 'vuex'

const state = {
  expired: true,
  sidebarFold: false, // 侧边栏菜单是否折叠
  thirdPanelFold: true, // 第三级版面是否折叠
  teamDetaiPanel: '0', // 团队详情里 tabbar 当前活跃的 key
  teamGroupType: 'i am teamGroupType', // 成员分组当前选择
  roleList: [] , // 权限列表
}


const news = {
  namespaced: true,
  ...state
}

export {  state }
export default news
