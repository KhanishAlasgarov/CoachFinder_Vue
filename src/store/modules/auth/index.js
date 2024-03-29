import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      didLogout:false
    };
  },
  actions,
  getters,
  mutations,
};
