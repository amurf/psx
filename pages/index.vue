<template>

  <div>
    <div class='search ps-colours'>
      <input @keyup.enter="searchByTitle" type="text" class="search" ref="search" v-model="search" placeholder="Search.."/>
    </div>

    <div v-if="entries.items.length" class='nav'>
      <button @click="prev" class="dpad dpad-left" v-if="entries.skip != 0">
        <img class='dpad' src="~/assets/dpad-single.png" />
      </button>
      <div class='pagination-text'>
        {{ entries.skip }}-{{ entries.skip + entries.items.length }} of {{ entries.total }}
      </div>
      <button @click="next" class="dpad dpad-right" v-if="entries.skip + entries.items.length != entries.total">
        <img class='dpad' src="~/assets/dpad-single.png" />
      </button>
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

  fetch() {
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

  mounted() {
    this.$refs.search.focus();
  },
}
</script>

<style>
.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1em;
}

.search {
  @apply flex w-full p-2 justify-center;
}

.search input {
  @apply p-2;
  width: 80%;
  border: 2px solid #6f706f;
  border-right: none;
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

.dpad {
  height: 30px;
}

.dpad-left {
  transform: rotate(90deg);
}

.dpad-right {
  transform: rotate(270deg);
}

.pagination-text {
  padding: 0.5em;
}

</style>
