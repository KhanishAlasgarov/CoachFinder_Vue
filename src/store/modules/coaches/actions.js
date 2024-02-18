export default {
  async registerCoache(context, data) {
    const userId = context.rootState.auth.userId;
    const token = context.rootGetters.token;
    console.log("token:");
    console.log(token);
    console.log("userId:");
    console.log(userId);
    const response = await fetch(
      `https://find-tutor-96639-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    //const responseData = await response.json();

    if (!response.ok) {
      // error
    }
    context.commit('registerCoache', { id: userId, ...data });
  },

  async loadCoaches(context, payload) {
    if (!context.getters.shouldUpdate && !payload.forceRefresh) {
      return;
    }
    const response = await fetch(
      'https://find-tutor-96639-default-rtdb.firebaseio.com/coaches.json'
    );

    const responseData = await response.json();
    console.log(response);

    const coaches = [];

    for (const key in responseData) {
      coaches.push({
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      });
    }

    if (!response.ok) {
      const error = new Error(responseData.message ?? 'Failed to fetch!');
      throw error;
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
