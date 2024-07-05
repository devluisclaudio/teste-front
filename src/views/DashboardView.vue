<template>
  <div class="mt-5">
    <h1 class="text-center">Bem Vindo, {{ username || "Usuário" }}!</h1>
    <v-row class="mt-5">
      <v-col cols="6" offset="3">
        <v-card variant="tonal">
          <v-card-title class="text-center"> Meus Dados</v-card-title>
          <v-card-text class="text-center py-3">
            Email: <strong class="pl-3">{{ emailProfile }}</strong></v-card-text
          >
          <v-card-text class="text-center py-3">
            Código Usuário: <strong class="pl-3">{{ idProfile }}</strong>
          </v-card-text>
          <v-card-text class="text-center py-3">
            Entrou no sistema dia :
            <strong class="pl-3">{{ convertDate(createdAtProfile) }}</strong>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn
              color="teal-accent-4"
              text="Logout"
              variant="text"
              @click="logout()"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import authApi from "@/services/auth";
import { jwtStore } from "@/stores/jwt";
import { useUserStore } from "@/stores/user";
import { computed, onMounted } from "vue";
import { ref } from "vue";
const store = useUserStore();
const storeJwt = jwtStore();

const username = computed(() => (typeof store.user === "string" ? "" : store.user?.name));

const emailProfile = ref("");
const idProfile = ref("");
const createdAtProfile = ref("");

const getProfile = () => {
  authApi.me().then(({ data: { email, id, createdAt } }) => {
    emailProfile.value = email;
    idProfile.value = id;
    createdAtProfile.value = createdAt;
  });
};

onMounted(getProfile);

const convertDate = (value: string) => {
  const originalDate = new Date(value);
  return originalDate.toLocaleDateString("en-GB");
};

const logout = async () => {
  await storeJwt.jwtLogout();
  router.push('/')
};
</script>
