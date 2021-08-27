<template>

  <div>
    <div class='search ps-colours'>
      <input  @keyup.enter="searchByTitle" type="text" class="search" v-model="search" />
      <button @click="searchByTitle">search</button>
    </div>

    <div v-if="entries.items.length" class='nav'>
      {{ entries.skip }}-{{ entries.skip + entries.items.length }} of {{ entries.total }}
      <div class='nav-buttons'>
        <button @click="prev" class="p-1 rounded shadow bg-blue-100" v-if="entries.skip != 0">prev</button>
        <button @click="next" class="p-1 rounded shadow bg-blue-100" v-if="entries.skip + entries.items.length != entries.total">next</button>
      </div>
    </div>

    <div v-if="loading"class="text-center text-lg">
      Loading..
    </div>

    <div v-else class='mt-2'>
      <GameGrid
          v-if="entries.items && entries.items.length"
          :games="entries.items"
          :assets="entries.includes.Asset" />
    </div>

  </div>

</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
  data() {
    return {
      limit: 3 * 7, // results per page, in data fot future enhancement potential
      loading: false,
      entries: {
        items: [],
        includes: {
          Asset: []
        }
      },
      search: undefined,
    };
  },

  methods: {
    async searchByTitle(skip = 0) {
      this.loading = true;

      let entries = await client.getEntries({ skip, limit: this.limit, content_type: 'game', order: 'fields.officialTitle', include: 2,
        'fields.officialTitle[match]': this.search,
      });

      this.entries = entries;
      this.loading = false;

      // s = search term, p = page
      this.$router.replace({ name: this.$route.name, query: {s: this.search, p: skip >= this.limit ? skip/this.limit : undefined } })
        .catch(err => {}); // stops duplicate nav console error, could check route is identical but not worth it imo
    },

    async next() {
      this.searchByTitle(this.entries.skip + this.limit);
    },

    async prev() {
      this.searchByTitle(this.entries.skip - this.limit);
    }
  },

  created() {
    if (this.$route.query.s) {
      this.search = this.$route.query.s;
    }

    let skip = 0;
    if (this.$route.query.p) {
      skip = this.$route.query.p * this.limit;
    }

    // By default with no query params, will search for all on load.
    this.searchByTitle(skip);
  },
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

.search {
  @apply flex w-full p-2 justify-center;
}

.search input {
  @apply p-2 w-1/4;
  border: 2px solid #6f706f;
  border-right: none;
}

.search button {
  @apply p-2;
  background: #bec1c0;
  border: 2px solid #6f706f;
  border-left: none;
}

.ps-colours {
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


</style>
