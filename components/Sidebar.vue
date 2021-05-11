<template>
    <div class="side-logo">
      <span class='psx-logo-border'>
        <img class='psx-logo' src="~/assets/psx.png" />
      </span>
      <span class='region-indicator'>PAL</span>
      <span class='flip'>PlayStation</span>
    </div>
</template>

<style>

.side-logo {
  position: fixed;
  width: 75px;
  height: 100vh;
  top: 0;
  padding-top: 1em;
  background-color: black;
  text-align:center;
}

.flip {
  margin-top: 0.3em;
  color: white;
  transform: scale(-1);
  writing-mode: vertical-rl;
  text-align: right;
  font-size: 2.5em;
  font-family: 'Zrnic';
  background-color: black;
}

.region-indicator {
  background-color: white;
  font-weight: bold;
  font-family: 'ZRNIC';
  border-radius: 5px;
  width: 60px;
  display: inline-block;
  margin-top: 0.5em;
  font-size: 0.8em;
}

.psx-logo-border {
  border: 1px solid white;
  padding: 5px;
  z-index: 222;
  height: 60px;
  display: inline-block;
  width: 65px;

}
.psx-logo {
  height: 50px;
  width: 50px;
  display: inline;
}

</style>
