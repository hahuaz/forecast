<template>
  <div>
    <div class="max-w-screen-sm mx-auto">
      <v-text-field
        v-model="adress"
        autofocus
        filled
        color="black"
        label="Provide an adress"
        append-icon="mdi-map-marker"
        append-outer-icon="mdi-send"
        :loading="loading"
        :error="error"
        :error-messages="errorMessages"
        @click:append-outer="fetchForecast"
        @keydown.enter="fetchForecast"
      >
      </v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adress: null,
      previousFetchedAdress: null,
      loading: false,
      error: false,
      errorMessages: [],
    }
  },
  computed: {},
  methods: {
    async fetchForecast() {
      // reset
      this.errorMessages = []
      this.error = false

      if (!this.adress) return
      const adress = this.sanitizeAdress(this.adress)

      /* eslint-disable-next-line */
      if (this.previousFetchedAdress == adress) return
      this.loading = true
      this.previousFetchedAdress = this.adress
      try {
        await this.$store.dispatch('fetchForecast', { adress: this.adress })
      } catch (error) {
        console.error(error.response.data.error)
        this.errorMessages.push(error.response.data.error)
        this.error = true
      }
      this.loading = false
    },
    sanitizeAdress(adress) {
      return adress.toLowerCase().trim()
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .v-input__append-outer {
  margin-left: 20px !important;
}
::v-deep .v-input__icon--append-outer .v-icon {
  font-size: 50px !important;
}
::v-deep .v-input__icon--append-outer .v-icon::after {
  background-color: transparent;
}
</style>
