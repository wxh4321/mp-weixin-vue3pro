import { setStoreState } from '../../utils'
import { Store } from 'vuex'
// import CommonService from '@/api/common'
// import ManageService from '@/api/manage'

const newsActions = {
  async getTestData(context,params){
	  console.log('getTestData ',context,params);
	  setStoreState('news', 'roleList', ['hello man'])
  },
  // // 获取用户角色列表
  // async getRoleList() {
  //   const res = await CommonService.getRoleInfoList()
  //   if (res.status === 200) {
  //     const data = res.data.data
  //     setStoreState('console', 'roleList', data ? data : [])
  //     return res
  //   }
  //   return 0
  // },
}

export default newsActions
