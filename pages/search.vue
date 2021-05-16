<template>

  <div>

    <!-- WIP search bar -->
    <div class='search ps-colours'>
      <input type="text" class="search" v-model="search" />
      <button @click="searchByTitle">search</button>
    </div>

    <div class='mt-2'>
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
      entries: {
        items: [],
        includes: {
          Asset: []
        }
      },
      loading: true,
      search: null,
    };
  },

  methods: {
    async searchByTitle() {
      const skip  = 0;
      const limit = 100;

      let entries = await client.getEntries({ skip, limit, content_type: 'game', order: 'fields.officialTitle', include: 2,
        'fields.officialTitle[match]': this.search,
      });

      this.entries = entries;

    },
  },

  created() {
    if (this.$route.query.s) {
      this.search = this.$route.query.s;
      this.searchByTitle();
    }
  },
}
</script>

<style>
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
