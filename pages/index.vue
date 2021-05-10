<template>
  <div>
    <div class="side-logo">
      <span class='psx-logo-border'>
        <img class='psx-logo' src="~/assets/psx.png" />
      </span>
      <span class='region-indicator'>PAL</span>
      <span class='flip'>PlayStation</span>
    </div>
    <div class='content'>
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

        <div v-else v-for="entry in entries.items" class='games'>
          <img v-if="entry.fields.cover" :src="entries.includes.Asset.find(item => item.sys.id == entry.fields.cover.sys.id).fields.file.url" />
          <div v-else class='placeholder-image border'>No cover</div>
          {{ entry.fields.serialNumber }}: {{ entry.fields.officialTitle }}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
  data() {
    return { entries: {}, loading: true };
  },

  methods: {
    // TODO: can tidy these up to use the one fetch, but calculate the skip/limit
    async next() {
      this.loading = true;

      let entries = await client.getEntries({ skip: this.entries.skip + this.entries.limit, limit: this.entries.limit });
      this.entries = entries;

      this.loading = false;
    },
    async prev() {
      this.loading = true;

      let entries = await client.getEntries({ skip: this.entries.skip - this.entries.limit, limit: this.entries.limit });
      this.entries = entries;

      this.loading = false;
    }
  },
  async fetch() {
    this.loading = true;

    let entries = await client.getEntries({ limit: 20, skip: 0 })
    this.entries = entries;

    this.loading = false;
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
.content {
  /* allow for fixed sidebar */
  margin-left: 75px;
}
.grid {
  grid-template-columns: auto auto auto auto;
  width: 70%;
  margin: auto;
  grid-gap: 20px;
}

.psx-logo-border {
  border: 1px solid white;
  padding: 5px;
  z-index: 222;
  height: 60px;
  display: inline-block;
  width: 65px;

}
.psx-logo {
  height: 50px;
  width: 50px;
  display: inline;
}

.region-indicator {
  background-color: white;
  font-weight: bold;
  font-family: 'ZRNIC';
  border-radius: 5px;
  width: 60px;
  display: inline-block;
  margin-top: 0.5em;
  font-size: 0.8em;
}
.side-logo {
  position: fixed;
  width: 75px;
  height: 100vh;
  top: 0;
  padding-top: 1em;
  background-color: black;
  text-align:center;
}

.flip {
  margin-top: 0.3em;
  color: white;
  transform: scale(-1);
  writing-mode: vertical-rl;
  text-align: right;
  font-size: 2.5em;
  font-family: 'Zrnic';
  background-color: black;
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

</style>
