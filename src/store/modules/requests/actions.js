export default {
  async addRequest(context, data) {
    data.id = context.state.requests.length + 1;
    const response = await fetch(
      'https://find-tutor-96639-default-rtdb.firebaseio.com/requests.json',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = new Error('Failed to send request!');
      throw error;
    }
    context.commit('addRequest', data);
  },
  async loadData(context) {
    const response = await fetch(
      'https://find-tutor-96639-default-rtdb.firebaseio.com/requests.json'
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message ?? 'Failed to fetch the data'
      );
      throw error;
    }
    const requests = [];

    for (const key in responseData) {
      requests.push({
        id: responseData[key].id,
        message: responseData[key].message,
        email: responseData[key].email,
        coachId: responseData[key].coachId,
      });
    }
    context.commit('setData', requests);
  },
};
