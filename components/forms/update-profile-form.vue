<template>
  <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-xxl-12 pb-25">
          <div class="profile__main-inner d-flex flex-wrap align-items-center">
            <div class="profile__main-thumb">
              <img src="/img/users/user-2.jpg" alt="">
              <div class="profile__main-thumb-edit">
                  <input id="profile-thumb-input" class="profile-img-popup" type="file">
                  <label for="profile-thumb-input"><i class="fa-light fa-camera"></i></label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-6 col-md-6">
            <div class="profile__input-box">
              <div class="profile__input">
                  <input type="text" placeholder="Enter your username" :value="userStore.userData.first_name_th">
                  <span>
                    <svg-user-3/>
                  </span>
              </div>
            </div>
        </div>
        <div class="col-xxl-6 col-md-6">
            <div class="profile__input-box">
              <div class="profile__input">
                  <input type="text" placeholder="Enter your username" :value="userStore.userData.last_name_th">
                  <span>
                    <svg-user-3/>
                  </span>
              </div>
            </div>
        </div>
        <div class="col-xxl-6 col-md-6">
            <div class="profile__input-box">
              <div class="profile__input">
                  <input type="text" placeholder="Enter your email" :value="userStore.userData.email">
                  <span>
                    <svg-email/>                                           
                  </span>
              </div>
            </div>
        </div>
        <div class="col-xxl-6 col-md-6">
            <div class="profile__input-box">
              <div class="profile__input">
                  <input type="text" placeholder="Enter your number" :value="userStore.userData.phone">
                  <span>
                    <svg-phone-2/>                                                                                      
                  </span>
              </div>
            </div>
        </div>
        <div class="col-xxl-12">
            <div class="profile__btn">
              <button type="submit" class="tp-btn">Update Profile</button>
            </div>
        </div>
      </div>
  </form>
</template>

<script setup lang="ts">
const changeHandler = (e: { value: string; text: string }, index: number) => {
  console.log(e);
};
const handleSubmit = () => {
  console.log('submitted')
}

import { useUserStore } from '@/pinia/useUserStore';

const userStore = useUserStore()
</script>

