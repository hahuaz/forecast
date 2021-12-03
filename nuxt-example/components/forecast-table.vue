<template>
  <div class="max-w-screen-sm mx-auto">
    <transition name="fade" appear mode="out-in">
      <div v-if="forecast" :key="forecast.placeName">
        <p class="text-2xl font-semibold py-6 text-center">
          Forecast between {{ providedDates }}
          at
          {{ forecast.placeName }}.
        </p>
        <v-expansion-panels>
          <v-expansion-panel v-for="(item, i) in forecast.daily" :key="i">
            <v-expansion-panel-header
              ><div class="grid grid-cols-4">
                <div>
                  <p class="text-xl font-semibold">
                    {{ moment.unix(item.dt).format('ddd') }}
                  </p>
                  <p class="text-gray-500">
                    {{ moment.unix(item.dt).format('MMM') }}
                    {{ moment.unix(item.dt).format('Do') }}
                  </p>
                </div>

                <div>
                  <i class="wi text-4xl" :class="item.weather[0].main"></i>
                </div>
                <div class="">
                  {{ firstLetterUppercase(item.weather[0].description) }}
                </div>
                <div>
                  <span class="text-4xl font-bold"
                    >{{ Math.trunc(item.temp.max) }}°</span
                  >
                  <span class="text-gray-500"
                    >/{{ Math.trunc(item.temp.min) }}°</span
                  >
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ summary(item) }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div v-else key="didyou" class="mt-8">
        <p class="font-thin mb-4">Before you fetch, did you know:</p>
        <div class="ml-2 space-y-4">
          <p>- Average global temperature is up 0.94°C (1.7°F) since 1880?</p>
          <p>
            - The wind doesn’t make a sound until it blows against an object?
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      moment,
    }
  },
  computed: {
    providedDates() {
      return `${moment.unix(this.forecast.daily[0].dt).format('MMM')} ${moment
        .unix(this.forecast.daily[0].dt)
        .format('Do')} - ${moment
        .unix(this.forecast.daily[this.forecast.daily.length - 1].dt)
        .format('MMM')} ${moment
        .unix(this.forecast.daily[this.forecast.daily.length - 1].dt)
        .format('Do')}
      `
    },
    forecast() {
      return this.$store.state.forecast
    },
  },

  methods: {
    summary(item) {
      return `${this.firstLetterUppercase(
        item.weather[0].description
      )} throughout day. Feeling temperature is ${Math.trunc(
        item.feels_like.day
      )}° at ${this.forecast.placeName}.`
    },
    firstLetterUppercase(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
  },
}
</script>

<style lang="scss" scoped></style>
