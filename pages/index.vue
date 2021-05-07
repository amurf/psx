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

      <!--
        <table class='w-full'>
        <thead>
        <th class='w-4/12 text-left'>Serial</th>
        <th class='text-left'>Name</th>
        </thead>
        <tbody>
        <tr v-for="entry in entries.items">
        <td class='text-left'>{{ entry.fields.serialNumber }}</td>
        <td class='text-left'>{{ entry.fields.officialTitle }}</td>
        </tr>
        </tbody>
        </table>
      -->

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

    console.log(this.entries);
  },

}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto mt-2;
}
 */
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

.title {
  font-family:
  'Quicksand',
  'Source Sans Pro',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  'Helvetica Neue',
  Arial,
  sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
