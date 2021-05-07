<template>
  <div>
    <div v-if="entries.items" class='m-auto nav'>
      {{ entries.skip }}-{{ entries.skip + entries.items.length }} of {{ entries.total }}
      <br>
      <button @click="prev" class="p-1 rounded shadow bg-blue-100" v-if="entries.skip != 0">prev</button>
      <button @click="next" class="p-1 rounded shadow bg-blue-100" v-if="entries.skip + entries.items.length != entries.total">next</button>
    </div>

    <div class="grid">


      <div v-for="entry in entries.items" class='games'>
        <img v-if="entry.fields.cover" :src="entries.includes.Asset.find(item => item.sys.id == entry.fields.cover.sys.id).fields.file.url" />
        <div v-else class='placeholder-image border'>No cover</div>
        {{ entry.fields.serialNumber }}: {{ entry.fields.officialTitle }}
      </div>

    </div>
  </div>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
  data() {
    return { entries: {} };
  },

  methods: {
    // TODO: can tidy these up to use the one fetch, but calculate the skip/limit
    async next() {
      let entries = await client.getEntries({ skip: this.entries.skip + this.entries.limit, limit: this.entries.limit });
      this.entries = entries;
    },
    async prev() {
      let entries = await client.getEntries({ skip: this.entries.skip - this.entries.limit, limit: this.entries.limit });
      this.entries = entries;
    }
  },
  async fetch() {
    let entries = await client.getEntries({ limit: 20, skip: 0 })
    this.entries = entries;
  },

}
</script>

<style>
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

</style>
