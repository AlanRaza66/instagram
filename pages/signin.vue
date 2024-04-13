<script setup lang="ts">
import { createUserSchema, type CreateUserInput } from "../schema/user.schema";
const toast = useToast();
const { $client } = useNuxtApp();
const { users } = $client;
const state: CreateUserInput = reactive({
  email: "",
  fullName: "",
  username: "",
  password: "",
});

const titleErrorMessage: Ref<string> = ref("");
const isVisible = ref(false);
const fatalError: any = ref(null);
const signin = async () => {
  try {
    const user = await users.signin.mutate(state);
    toast.add({
      title: `Bienvenue sur instagram ${user?.username}!`,
      timeout: 5000,
      icon: "i-heroicons-check-circle",
      color: "green",
    });
  } catch (e: any) {
    if (e.message && !e.message.includes("[")) {
      titleErrorMessage.value = e.message;
      toast.add({
        title: e.message,
        timeout: 5000,
        icon: "i-heroicons-exclamation-circle",
        color: "red",
      });
    } else if (e.message.includes("[")) {
      titleErrorMessage.value = "Certaines données ne sont pas conformes!";
      fatalError.value = JSON.parse(e.message);
      toast.add({
        title: "Certaines données ne sont pas confrmes",
        timeout: 5000,
        icon: "i-heroicons-exclamation-circle",
        color: "red",
      });
    } else {
      fatalError.value = "Une erreur est survenu lors de la requête";
      toast.add({
        title: "Une erreur est survenu lors de la requête",
        timeout: 5000,
        icon: "i-heroicons-exclamation-circle",
        color: "red",
      });
    }
  }
};
</script>
<template>
  <div class="bg-white dark:bg-black h-screen w-full">
    <UContainer class="py-8 bg-white dark:bg-black flex flex-col items-center">
      <UCard
        class="max-w-[635px] w-full text-black dark:text-white bg-white dark:bg-black"
      >
        <template #header>
          <div class="w-full text-center">
            <h1 class="font-bold text-xl">
              Instagram
            </h1>
            <h2 class="text-gray-600 dark:text-gray-300">
              Inscrivez-vous pour voir les photos et vidéos de vos amis.
            </h2>
          </div>
        </template>
        <UAlert
          v-if="titleErrorMessage !== ''"
          :title="titleErrorMessage"
          icon="i-heroicons-exclamation-circle"
          color="red"
        >
          <template #description>
            <ul class="text-white">
              <li v-for="(message, field) in fatalError" :key="field">
                {{ message.path[0] + ": " + message["message"] }}
              </li>
            </ul>
          </template>
        </UAlert>
        <UForm :schema="createUserSchema" :state="state" @submit="signin">
          <UFormGroup label="Email" name="email" class="mt-2">
            <UInput v-model="state.email" type="email" color="cyan" />
          </UFormGroup>
          <UFormGroup
            label="Nom complet"
            name="fullName"
            class="mt-4"
            color="cyan"
          >
            <UInput v-model="state.fullName" color="cyan" />
          </UFormGroup>
          <UFormGroup label="Nom d'utilisateur" name="username" class="mt-4">
            <UInput v-model="state.username" color="cyan" />
          </UFormGroup>
          <UFormGroup label="Mot de passe" name="password" class="mt-4">
            <UInput
              v-model="state.password"
              :type="isVisible ? 'text' : 'password'"
              color="cyan"
            />
          </UFormGroup>
          <UButton type="submit" class="mt-4" size="lg" color="cyan" block>
            S'inscrire
          </UButton>
        </UForm><template #footer>
          <small
            class="text-gray-600 dark:text-gray-300 font-light text-center"
          >
            Les personnes qui utilisent notre service ont pu importer vos
            coordonnées sur Instagram. <br>

            En vous inscrivant, vous acceptez nos Conditions générales, notre
            Politique de confidentialité et notre Politique d’utilisation des
            cookies.
          </small>
        </template>
      </UCard>
      <UCard class="bg-white dark:bg-black mt-4 max-w-[635px] w-full">
        <p>Vous avez un compte?</p>
        <NuxtLink class="text-cyan-500 dark:text-cyan-300" to="/">
          Connectez-vous
        </NuxtLink>
      </UCard>
    </UContainer>
  </div>
</template>
