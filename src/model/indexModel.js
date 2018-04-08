// import * as activityInfoServer from './activityInfoServer';
import { routerRedux } from 'dva/router';
import { message} from 'antd';

export default {
    namespace: 'index',
    state: {
        num:0
    },
    reducers: {
        save(state, { payload: { num } }) {
            return { ...state, num };
        }
    },
    effects: {
        *query({payload:{num} },{ call, put}){
            yield put({
                type:"save",
                payload:{
                    num:num
                }
            })
        }
    },
    // subscriptions: {
    //     setup({ dispatch, history }) {
    //         return history.listen(({ pathname, query }) => {
    //             if (pathname === '/') {
    //                 dispatch({ type: 'query', payload:query});
    //             }
    //         });
    //     },
    // },
};