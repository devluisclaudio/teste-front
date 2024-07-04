<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height style="height: 100%" class="body-login">
        <v-layout align-center justify-center style="height: 100%">
          <v-row align-content="center" justify="center" class="mb-0">
            <v-col cols="4" sm="10" md="4">
              <v-card class="elevation-12">
                <v-card-text>
                  <form @submit.prevent="isRegister ? register() : login()">
                    <v-text-field
                      v-model="email"
                      name="email"
                      label="Email"
                      type="text"
                      placeholder="Email"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="username"
                      name="username"
                      label="Username"
                      type="text"
                      placeholder="Username"
                      required
                      v-if="isRegister"
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      name="password"
                      label="Senha"
                      type="password"
                      placeholder="Senha"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-if="isRegister"
                      v-model="confirmPassword"
                      name="confirmPassword"
                      label="Confirmação de senha"
                      type="password"
                      placeholder="Confirmação de senha"
                      required
                    ></v-text-field>
                    <div class="red--text">{{ errorMessage }}</div>
                    <v-btn type="submit" class="mt-4" size="x-large" width="100%" color="#1D2D60" value="log in">{{
                      isRegister ? stateObj.register.name : stateObj.login.name
                    }}</v-btn>
                    <div class="grey--text mt-4 text-center cursor-pointer" v-on:click="isRegister = !isRegister">
                      {{ toggleMessage }}
                    </div>
                  </form>
                </v-card-text>
              </v-card>
            </v-col>
            <v-overlay :model-value="overlay" class="align-center justify-center">
              <v-progress-circular
                color="primary"
                size="64"
                indeterminate
              ></v-progress-circular>
            </v-overlay>
          </v-row>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import router from "@/router";
import { computed } from "vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { jwtStore } from "@/stores/jwt";
import authApi from "@/services/auth";

const store = useUserStore();
const storeJwt = jwtStore();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isRegister = ref(false);
const errorMessage = ref("");
const overlay = ref<boolean>(false);

const stateObj = ref({
  register: {
    name: "Cadastr-se",
    message: "Você já tem conta? Faça seu Login.",
  },
  login: {
    name: "Login",
    message: "Não tem login? Cadastre-se",
  },
});

const login = () => {
  overlay.value = true;
  authApi
    .login(email.value, password.value)
    .then(({ data: { jwt, user } }) => {
      store.setUser(user);
      storeJwt.setJwt(jwt);
      router.push("dashboard");
    })
    .catch(() => {
      errorMessage.value = "Credenciais não encontradas!";
    })
    .finally(() => (overlay.value = false));
};
const register = () => {
  if (password.value == confirmPassword.value) {
    overlay.value = true;
    authApi
      .register(username.value, email.value, password.value)
      .then(({ data: { jwt, user } }) => {
        store.setUser(user);
        storeJwt.setJwt(jwt);
        isRegister.value = false;
        errorMessage.value = "";
        reset();
        router.push("dashboard");
      })
      .catch(() => {
        errorMessage.value = "Falha ao cadastrar!";
      })
      .finally(() => (overlay.value = false));
  } else {
    errorMessage.value = "Senhas não coincidem!";
  }
};

const reset = () => {
  username.value = password.value = confirmPassword.value = email.value = "";
};

const toggleMessage = computed(() => {
  return isRegister.value
    ? stateObj.value.register.message
    : stateObj.value.login.message;
});
</script>

<style lang="css" scoped>
.red--text {
  color: red;
}
.body-login{
  background: url('../assets/background-login.webp');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.img-login{
  height: 97px;
  margin-bottom: 40px;
}
</style>
