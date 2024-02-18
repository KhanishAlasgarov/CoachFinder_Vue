export default {
  getCoaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches.length;
  },
  isCoach(_, getters, rootState) { 
    return getters.getCoaches.find((coach) => coach.id === rootState.userId);
  },
  shouldUpdate(state){
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();

    return (currentTimeStamp - lastFetch)/1000 >60
  }
};
