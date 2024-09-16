<template>
  <div class="container">
    <H5WebView src="http://sec.gushi.com/nxStock.html?dt_from=web&webviewType=userActivitesType&dt_page_type=11&installBar=h"></H5WebView>
    <H5WebView src="http://sec.gushi.com/hushenStock.html?dt_from=web&installBar=h"></H5WebView>
    <H5WebView src="https://privi.gushi.com/activities/kuakuaGroup.html?dt_from=web&sceneCodeH5=41&installBar=h"></H5WebView>
    <H5WebView src="http://privi.gp932.com/fundsDataDesc.html?dt_from=app&installBar=h"></H5WebView>
    <H5WebView src="http://privi.gushi.com/activities/activityNewTraders.html?dt_from=web"></H5WebView>
    <H5WebView src="http://privi.gushi.com/activities/activityQianKun.html?dt_from=app"></H5WebView>
    <H5WebView src="http://privi.gushi.com/activities/level2RiskEvaluation.html?dt_from=web&installBar=h"></H5WebView>
  </div>
</template>
<script setup lang="ts">
import H5WebView from '../../components/H5WebView/index.vue'

</script>

<style scoped>
.container {
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
