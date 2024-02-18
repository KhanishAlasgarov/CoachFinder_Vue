export default {
  getCoaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches.length;
  },
  isCoach(state, getters, rootState) {
    let coache = getters.getCoaches.find(
      (coach) => coach.id === rootState.auth.userId
    ); 
    return coache;
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();

    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
