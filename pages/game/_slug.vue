<template>
  <div>
    <!-- TODO: turn this into a header/nav component -->
    <div class='ps-colours'></div>

    <a href="" @click.prevent="back()">
      <img class='dpad dpad-left' src="~/assets/dpad-single.png" />
    </a>

    <template v-if="!loading">
      <div class='game-view'>
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

      <div class='screenshots'>
        <img v-for="screenshot in fields.screenshots" :src="screenshot.fields.file.url" />
      </div>

    </template>

    <div class='loading' v-else>
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

  methods: {
    // This uses history if it makes sense, otherwise just back to home page.
    back() {
      const startLocation   = this.$router.history._startLocation;
      const currentLocation = this.$route.path;

      startLocation == currentLocation ? this.$router.push("/") : this.$router.back();
    }
  },

  async asyncData({ params }) {
    const slug = params.slug;
    return { gameId: slug }
  },

  async fetch() {
    this.loading = true;

    this.entry = await client.getEntry(this.gameId);

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2em;
}

table {
  margin: 2em;
}

@media only screen and (max-width: 600px) {
  .grid {
    grid-template-columns: auto;
  }
}

.screenshots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  width:90%;
  grid-gap:10px;
  margin:auto;
}

.dpad {
  height: 50px;
  margin: auto;
  margin-top:2em;
}

.dpad-left {
  transform: rotate(90deg);
}

.ps-colours {
  @apply flex w-full;
  height: 60px;
  background: linear-gradient(110deg,
  #F3C300  25%,
  #00AC9F  25%,
  #00AC9F  50%,
  #DF0024  50%,
  #DF0024  75%,
  #2E6DB4  75%,
  #2E6DB4 100%
  );
}

.loading {
  text-align: center;
  font-size: 2em;
}
</style>
