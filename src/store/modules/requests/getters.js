export default {
  getRequests(state, _, rootState) {
    return state.requests.filter((x) => x.coachId == rootState.userId);
  },
};
