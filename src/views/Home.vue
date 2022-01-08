<template>
  <div>
    <Heard/>
    <div style="display: flex">
      <side/>
      <router-view style="flex: 1"/>
    </div>


  </div>

</template>

<script>
import Heard from "./Heard";
import Side from "./Side";

export default {
  name: "Home",
  components:{
    Heard,
    Side,
  },


}
</script>

<style scoped>

</style>
