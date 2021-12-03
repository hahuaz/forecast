export const state = () => ({
  forecast: null,
})

export const actions = {
  async fetchForecast({ commit }, { adress }) {
    const forecast = await this.$axios.$get(`api/?adress=${adress}`)
    commit('ADD_FORECAST', forecast)
  },
}

export const mutations = {
  ADD_FORECAST(state, forecast) {
    state.forecast = forecast
  },
}
