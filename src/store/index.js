import { createStore } from 'vuex';

import coaches from './modules/coaches/index';
import requests from './modules/requests/index';

export default createStore({
  modules: {
    coaches,
    requests,
  },
});
