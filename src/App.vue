<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Notifications } from '@kyvg/vue3-notification';
</script>

<template>
  <RouterView />
  <Notifications classes="vue-notification" style="margin-top: 70px;"/>
</template>

<style lang="scss">

html{
  overflow: auto;
}

.v-checkbox .v-selection-control{
  min-height: 10px !important;
}

.v-application{
  background: #FCEEDE !important;
}


</style>