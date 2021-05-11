<template>
  <span>
    <div v-if="entries.items" class='m-auto nav'>
      {{ entries.skip }}-{{ entries.skip + entries.items.length }} of {{ entries.total }}
      <br>
      <button @click="prev" class="p-1 rounded shadow bg-blue-100" v-if="entries.skip != 0">prev</button>
      <button @click="next" class="p-1 rounded shadow bg-blue-100" v-if="entries.skip + entries.items.length != entries.total">next</button>
    </div>

    <div class="grid">
      <div v-if="loading">
        Loading..
      </div>

      <NuxtLink :to='"/game/" + entry.sys.id' v-else v-for="entry in entries.items" class='games' :key="entry.sys.id">
      <img v-if="entry.fields.cover" :src="entries.includes.Asset.find(item => item.sys.id == entry.fields.cover.sys.id).fields.file.url" />
      <div v-else class='placeholder-image border'>No cover</div>
      {{ entry.fields.serialNumber }}: {{ entry.fields.officialTitle }}
      </NuxtLink>
    </div>
  </span>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
  data() {
    return { entries: {}, loading: true };
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
    this.fetchEntries(0, 20);
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
@font-face {
  font-family: 'Zrnic';
  src:  url('~/assets/fonts/Zrnic.ttf.woff') format('woff'),
  url('~/assets/fonts/Zrnic.ttf.svg#Zrnic') format('svg'),
  url('~/assets/fonts/Zrnic.ttf.eot'),
  url('~/assets/fonts/Zrnic.ttf.eot?#iefix') format('embedded-opentype');
  font-weight: normal;
  font-style: normal;
}

.grid {
  grid-template-columns: auto auto auto auto;
  width: 70%;
  margin: auto;
  grid-gap: 20px;
}

.games {
  width: 250px;
}

.nav {
  margin-top: 1.5em;
  margin-bottom: 2em;
  text-align: center;
}

.games img, .games .placeholder-image {
  width: 250px;
  height: 250px;
}

@media only screen and (max-width: 600px) {
  .grid {
    grid-template-columns: auto;
  }
}

</style>
