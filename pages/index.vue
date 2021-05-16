<template>
  <span>
    <div v-if="entries.items" class='nav'>
      {{ entries.skip }}-{{ entries.skip + entries.items.length }} of {{ entries.total }}
      <div class='nav-buttons'>
        <button @click="prev" class="p-1 rounded shadow bg-blue-100" v-if="entries.skip != 0">prev</button>
        <button @click="next" class="p-1 rounded shadow bg-blue-100" v-if="entries.skip + entries.items.length != entries.total">next</button>
      </div>
    </div>

    <div class="games">
      <div v-if="loading">
        Loading..
      </div>

      <NuxtLink :to='"/game/" + entry.sys.id' v-else v-for="entry in entries.items" class='game-link' :key="entry.sys.id">
      <img v-if="entry.fields.cover" :src="entries.includes.Asset.find(item => item.sys.id == entry.fields.cover.sys.id).fields.file.url" />
      <div v-else class='placeholder-image border'>No cover</div>

      <span class='game-link-serial'>{{ entry.fields.serialNumber }}</span>
      <span class='game-link-title'> {{ entry.fields.officialTitle }}</span>
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
@font-face {
  font-family: 'Zrnic';
  src:  url('~/assets/fonts/Zrnic.ttf.woff') format('woff'),
  url('~/assets/fonts/Zrnic.ttf.svg#Zrnic') format('svg'),
  url('~/assets/fonts/Zrnic.ttf.eot'),
  url('~/assets/fonts/Zrnic.ttf.eot?#iefix') format('embedded-opentype');
  font-weight: normal;
  font-style: normal;
}

.games {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  margin: 0 auto 30px;
  max-width: 80vw;
}

.nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin: 1em;
}

.game-link {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.game-link img {
  width: 100%;
  height: 250px;
  object-fit: contain;
}

</style>
