<template>
  <form @submit="onSubmit">
    <div class="tp-login-input-wrapper">
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input
            id="email"
            type="text"
            placeholder="shofy@mail.com"
            v-bind="email"
          />
        </div>
        <div class="tp-login-input-title">
          <label for="email">Your Email</label>
        </div>
        <err-message :msg="errors.email" />
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
      <button type="submit" class="tp-login-btn w-100">{{ loginStatus ? 'Logging in...' : 'Login' }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useUserStore } from "@/pinia/useUserStore";
import { useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import * as yup from "yup";

const credentials = useCredential()
const { setUserData } = useUserStore();

let showPass = ref<boolean>(false);

interface IFormValues {
  email?: string | null;
  password?: string | null;
}
const { errors, handleSubmit, defineInputBinds, resetForm } =
  useForm<IFormValues>({
    validationSchema: yup.object({
      email: yup.string().required().label("Email"),
      password: yup.string().required().min(6).label("Password"),
    }),
  });

const onSubmit = handleSubmit((values) => {
  handleLogin(values);
});

const loginStatus = ref(false)

const handleLogin = async (values: IFormValues) => {
  if (loginStatus.value === false) {
    await $fetch(`${credentials.value.api_url}/api/backend/api/erp/login`,{
      method: 'POST',
      headers: credentials.value.api_key,
      body: {
        username: values.email,
        password: values.password,
      },
      onRequest(){
        loginStatus.value = true;
      },
      onResponse({response}){
        loginStatus.value = false
        if (response._data.code === 200) {
          localStorage.setItem('accessToken', response._data.data.access_token);
          setUserData(response._data.data)
          navigateTo('/')        
        } else if (response._data.code === 400 && response._data.message === 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง') {
          toast.error('อีเมลหรือหรัสผ่านไม่ถูกต้อง');
        } else {
          toast.error('เกิดข้อผิดพลาดลองใหม่อีกครั้งภายหลัง');
        }
      }
    })
  }
}

const togglePasswordVisibility = () => {
  showPass.value = !showPass.value;
};

const email = defineInputBinds("email");
const password = defineInputBinds("password");
</script>
