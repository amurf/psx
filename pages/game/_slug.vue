<template>
  <div style='text-align: center; padding-top: 1em'>
    <NuxtLink class="p-1 rounded shadow bg-blue-100" to="/">Back</NuxtLink>
    <div v-if="!loading" class='game-view'>
      <img v-if="fields.hasOwnProperty('cover')" :src="fields.cover.fields.file.url" />

      <table>
        <tr>
          <th> Official title </th>
          <td> {{ fields.officialTitle }} </td>
        </tr>

        <tr>
          <th> Common title </th>
          <td> {{ fields.commonTitle }} </td>
        </tr>

        <tr>
          <th> Genre </th>
          <td> {{ fields.genre }} </td>
        </tr>

        <tr>
          <th> Date released </th>
          <td> {{ fields.dateReleased }} </td>
        </tr>

        <tr>
          <th> Developer </th>
          <td> {{ fields.developer }} </td>
        </tr>

        <tr>
          <th> Publisher </th>
          <td> {{ fields.publisher }} </td>
        </tr>

        <tr>
          <th> Players </th>
          <td> {{ fields.players }} </td>
        </tr>

      </table>
    </div>

    <div v-else>
      Loading..
    </div>
  </div>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
  data() {
    return { loading: false, entry: { fields: {} } };
  },

  computed: {
    fields() {
      return this.entry.fields;
    },
  },

  async asyncData({ params }) {
    const slug = params.slug;
    return { gameId: slug }
  },

  async fetch() {
    this.loading = true;

    let data = await client.getEntry(this.gameId);
    this.entry = data;

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

<style scoped>
@font-face {
  font-family: 'Zrnic';
  src:  url('~/assets/fonts/Zrnic.ttf.woff') format('woff'),
  url('~/assets/fonts/Zrnic.ttf.svg#Zrnic') format('svg'),
  url('~/assets/fonts/Zrnic.ttf.eot'),
  url('~/assets/fonts/Zrnic.ttf.eot?#iefix') format('embedded-opentype');
  font-weight: normal;
  font-style: normal;
}

th {
  @apply text-right;
}

td {
  @apply text-left;
  padding-left: 1em;
}

.game-view {
  padding-left: 75px;
  display: grid;
  grid-template-columns: auto auto;
  margin: 2em;
}

table {
  margin: 2em;
}

@media only screen and (max-width: 600px) {
  .grid {
    grid-template-columns: auto;
  }
}

</style>
