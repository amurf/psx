<template>

  <div>

    <!-- WIP search bar -->
    <div class='flex'>
      <input type="text" class="search" v-model="search" />
      <button class='bg-blue-100 p-1' @click="searchByTitle">search</button>
    </div>

    <GameGrid
      v-if="entries.items && entries.items.length"
      :games="entries.items"
      :assets="entries.includes.Asset" />

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
}
</script>

<style>

.search {
  @apply p-1 border;
}

</style>
