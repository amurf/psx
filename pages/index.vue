<template>
  <div class="container">

    <table>
      <caption v-if="entries.items">
        Showing {{ entries.skip }}-{{ entries.skip + entries.items.length }} of {{ entries.total }} 
        <button @click="prev" class="p-1 rounded shadow bg-blue-100" v-if="entries.skip != 0">prev</button>
        <button @click="next" class="p-1 rounded shadow bg-blue-100" v-if="entries.skip + entries.items.length != entries.total">next</button>
      </caption>
      <thead>
        <th>Serial</th>
        <th>Name</th>
      </thead>
      <tbody>
        <tr v-for="entry in entries.items">
          <td>{{ entry.fields.serialNumber }}</td>
          <td>{{ entry.fields.officialTitle }}</td>
        </tr>
      </tbody>
    </table>

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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
