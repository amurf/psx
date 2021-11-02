<template>
  <div class="games">
    <NuxtLink
      :to="'/game/' + game.sys.id"
      v-for="game in games"
      class="game-link"
      :key="game.sys.id"
    >
      <img
        v-if="game.fields.cover"
        :src="
          assets.find((item) => item.sys.id == game.fields.cover.sys.id).fields
            .file.url
        "
      />
      <div v-else class="placeholder-image border">No cover</div>

      <span class="game-link-serial">{{ game.fields.serialNumber }}</span>
      <span class="game-link-title">{{ game.fields.officialTitle }}</span>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    games: Array,
    assets: Array,
  },
};
</script>

<style>
.games {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  margin: 0 auto 30px;
  max-width: 80vw;
}

.game-link {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-link img {
  width: 100%;
  height: 250px;
  object-fit: contain;
}
</style>
