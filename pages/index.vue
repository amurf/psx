<template>
  <span>

    <div v-if="entries.items" class='nav'>
      {{ entries.skip }}-{{ entries.skip + entries.items.length }} of {{ entries.total }}
      <div class='nav-buttons'>
        <button @click="prev" class="p-1 rounded shadow bg-blue-100" v-if="entries.skip != 0">prev</button>
        <button @click="next" class="p-1 rounded shadow bg-blue-100" v-if="entries.skip + entries.items.length != entries.total">next</button>
      </div>
    </div>


    <div v-if="loading"class="text-center text-lg">
      Loading..
    </div>

    <GameGrid v-else
              :games="entries.items"
              :assets="entries.includes.Asset"
              />

  </span>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
  data() {
    return {
      entries: {
        items: [],
        includes: {
          Assets: [],
        },
      },
      loading: true
    };
  },

  methods: {

    async fetchEntries(skip, limit) {
      this.loading = true;

      let entries = await client.getEntries({ skip, limit, content_type: 'game', order: 'fields.officialTitle', include: 2 });
      this.entries = entries;

      this.loading = false;
    },
    async next() {
      this.fetchEntries(this.entries.skip + this.entries.limit, this.entries.limit);
    },
    async prev() {
      this.fetchEntries(this.entries.skip - this.entries.limit, this.entries.limit);
    }
  },
  async fetch() {
    const startAtEntry   = 0;
    const entriesToFetch = 3 * 7;

    this.fetchEntries(startAtEntry, entriesToFetch);
  },

  /*
  #DF0024 = psx red
  #F3C300 = psx yellow
  #00AC9F = psx green
  #2E6DB4 = psx blue
  #bec1c0 = psx light gray
  #6f706f = psx dark gray
   */
}
</script>

<style>


.nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin: 1em;
}

</style>
