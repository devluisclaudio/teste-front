<template>
  <div></div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { jwtStore } from "@/stores/jwt";
import router from "@/router";

const store = useUserStore();
const storeJwt = jwtStore();

if (store.user && storeJwt.jwt) router.push({ name: "dash" });
else router.push({ name: "login" });
</script>
