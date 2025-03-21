<template>
  <form @submit="onSubmit">
    <div class="tp-login-input-wrapper">
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input
            id="text"
            type="text"
            placeholder="shofy@mail.com"
            v-bind="username"
          />
        </div>
        <div class="tp-login-input-title">
          <label for="text">Your Username</label>
        </div>
        <err-message :msg="errors.username" />
      </div>
      <div class="tp-login-input-box">
        <div class="p-relative">
          <div class="tp-login-input">
            <input
              id="tp_password"
              :type="showPass ? 'text' : 'password'"
              name="password"
              placeholder="Min. 6 character"
              v-bind="password"
            />
          </div>
          <div class="tp-login-input-eye" id="password-show-toggle">
            <span class="open-eye" @click="togglePasswordVisibility">
              <template v-if="showPass">
                <svg-open-eye />
              </template>
              <template v-else>
                <svg-close-eye />
              </template>
            </span>
          </div>
          <div class="tp-login-input-title">
            <label for="tp_password">Password</label>
          </div>
        </div>
        <err-message :msg="errors.password" />
      </div>
    </div>
    <div
      class="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20"
    >
      <div class="tp-login-remeber">
        <input id="remeber" type="checkbox" />
        <label for="remeber">Remember me</label>
      </div>
      <div class="tp-login-forgot">
        <nuxt-link href="/forgot">Forgot Password?</nuxt-link>
      </div>
    </div>
    <div class="tp-login-bottom">
      <button type="submit" class="tp-login-btn w-100">{{ userStore.loading ? 'Logging in...' : 'Login'}}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

let showPass = ref<boolean>(false);

interface IFormValues {
  username?: string | null;
  password?: string | null;
}
const { errors, handleSubmit, defineInputBinds, resetForm } =
  useForm<IFormValues>({
    validationSchema: yup.object({
      username: yup.string().required().label("Username"),
      password: yup.string().required().min(6).label("Password"),
    }),
  });

const onSubmit = handleSubmit((values) => {
  userStore.loginUser(values)
});

const togglePasswordVisibility = () => {
  showPass.value = !showPass.value;
};

const username = defineInputBinds("username");
const password = defineInputBinds("password");

import { useUserStore } from '@/pinia/useUserStore';

const userStore = useUserStore()
</script>
