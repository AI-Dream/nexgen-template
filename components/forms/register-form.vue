<template>
  <form @submit="onSubmit">
    <div class="tp-login-input-wrapper">
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input id="name" type="text" placeholder="Benjamin1999" v-bind="name" />
        </div>
        <div class="tp-login-input-title">
          <label for="name">Username</label>
        </div>
        <err-message :msg="errors.name" />
      </div>
      <div class="tp-login-input-box">
        <div class="p-relative">
          <div class="tp-login-input">
          <input
            id="tp_password"
            :type="showPass?'text':'password'"
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
      <div class="tp-login-input-box">
        <div class="p-relative">
          <div class="tp-login-input">
          <input
            id="tp_confirm_password"
            type="password"
            name="confirmPassword"
            placeholder="Min. 6 character"
            v-bind="confirmPassword"
          />
        </div>
        <div class="tp-login-input-title">
          <label for="tp_confirm_password">Re - Password</label>
        </div>
      </div>
      <err-message :msg="errors.confirmPassword" />
      </div>
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input id="email" type="email" placeholder="phasit.p@adv-iservice.co.th" v-bind="email" />
        </div>
        <div class="tp-login-input-title">
          <label for="email">Email</label>
        </div>
        <err-message :msg="errors.email" />
      </div>
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input id="text" type="text" placeholder="Min. 10 character" v-bind="phone" />
        </div>
        <div class="tp-login-input-title">
          <label for="text">Phone</label>
        </div>
        <err-message :msg="errors.phone" />
      </div>
    </div>
    <div class="tp-login-bottom mt-30">
      <button type="submit" class="tp-login-btn w-100">{{ registerLoading ? 'Signing up...' : 'Sign up'}}</button>
    </div>
  </form>
</template>

<script setup lang="ts"> 
import { useUserStore } from '@/pinia/useUserStore';
import { useForm } from 'vee-validate';
import { toast } from 'vue3-toastify';
import * as yup from 'yup';

const credentials = useCredential();

let showPass = ref<boolean>(false);

interface IFormValues {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
}

const { errors, handleSubmit, defineInputBinds,resetForm } = useForm<IFormValues>({
  validationSchema: yup.object({
    email: yup.string().required().email().label("Email"),
    phone: yup.string().required().matches(/^[0-9]+$/, "Phone number must be digits only").min(10).max(10).label("Phone"),
    name: yup.string().required().matches(/^(?=.*[0-9])[a-zA-Z0-9]+$/, "Username must be alphanumeric, contain at least one number, and without spaces").min(8).label("Username"),
    password: yup.string().required().min(6).label("Password"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required().min(6).label("Re - Password"),
  }),
});

const onSubmit = handleSubmit(values => {
  createUser(values)
});

const registerLoading = ref(false);

const createUser = async (values :any) => {
  await $fetch(`${credentials.value.api_url}/api/backend/api/erp/register`,{
    method: 'POST',
    headers: credentials.value.api_key,
    body: {
      'username': values.name,
      'password': values.password,
      're_password': values.confirmPassword,
      'email': values.email,
      'phone': values.phone,
    },
    onRequest({}){
      registerLoading.value = true
    },
    onResponse({response}){
      registerLoading.value = false
      if (response._data.data.code === 200) {
        navigateTo('/login')
      } else {
        toast.error('สมัครสมาชิคไม่สำเร็จ')
      }
    }
  })
}

const togglePasswordVisibility = () => {
  showPass.value = !showPass.value;
};

const name = defineInputBinds('name');
const email = defineInputBinds('email');
const phone = defineInputBinds('phone');
const password = defineInputBinds('password');
const confirmPassword = defineInputBinds('confirmPassword');
</script>
