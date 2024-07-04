<template>
  <div class="mt-3">
    <h1>Bem Vindo, Tutor(a) {{ username }}!</h1>
    <v-row class="mt-5">
      <v-col cols="3">
        <v-card variant="tonal">
          <v-card-title class="text-center"> Meus Pets </v-card-title>
          <v-card-text class="text-center"> {{ totalPetsUser }} </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card variant="tonal">
          <v-card-title class="text-center"> Créditos Disponíveis </v-card-title>
          <v-card-text class="text-center"> 1 </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import { ref } from "vue";
const store = useUserStore();

const username = computed(() =>
  typeof store.user === "string" ? "" : store.user?.username
);

const totalPetsUser = ref(0);
</script>
