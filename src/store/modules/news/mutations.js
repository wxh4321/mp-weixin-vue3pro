import store from '@/store'
// import router from '@/router'
import { setStoreState } from '@/store/utils'

export default {
  __set(state, msg) {
    state[msg.key] = msg.val
  },
  updateBackPathList(context,params) { // 同步状态
	  console.log('updateBackPathList ',context,params);
	  setStoreState('news', 'roleList', ['hello mutations'])
    // const backPathList = store.state.console.backPathList
    // const currentPath = router.currentRoute.value.fullPath
    // const newBackPathList = [...backPathList]

    // if (backPathList.length < 0 || backPathList[backPathList.length - 1] !== currentPath) {
    //   newBackPathList.push(currentPath)
    // }

    // setStoreState('news', 'backPathList', [])
  }
}
