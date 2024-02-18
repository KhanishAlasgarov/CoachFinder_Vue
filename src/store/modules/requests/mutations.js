export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setData(state, payload) {
    state.requests = payload;
  },
};
