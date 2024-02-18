import { createStore } from 'vuex';

import coaches from './modules/coaches/index';
import requests from './modules/requests/index';
import auth from './modules/auth';

export default createStore({
  modules: {
    coaches,
    requests,
    auth,
  },
  state() {
    return {
      userId: 'c3',
    };
  },
});
