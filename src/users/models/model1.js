import { tableAjax } from "../services";

export default {
  namespace: "admin",
  state: {
    dataList: []
  },
  actions: {
    //传入对象
    fetch(payload) {
      payload.date = "我是请求列表方法";
      return {
        payload
      };
    },
    //传入对象
    remove(payload) {
      payload.date = "我是删除列表方法";
      return {
        payload
      };
    }
  },
  reducers: {
    //参数1state，参数2action
    list(state, { payload }) {
      return { ...state, payload };
    },
    detail(state, { payload }) {
      return { ...state, id: 2 };
    }
  },
  epics: {
    fetch(action$, store, actionType, put) {
      return action$.ofType(actionType).mergeMap(action => {
        return tableAjax(action, store).map(response => {
          return put({
            type: "list",
            payload: { date: "我是刷新列表请求" }
          });
        });
      });
    }
    // remove(action, store, put) {
    //   return tableAjax(action, store).map(response => {
    //     return put({
    //       type: "detail",
    //       payload: { content: "我是获取详情请求" }
    //     });
    //   });
    // }
  }
};
