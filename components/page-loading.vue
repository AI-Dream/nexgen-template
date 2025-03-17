<template>
  <div class="loader-container">
    <div class="loader"></div>
  </div>
</template>

<style>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
  z-index: 9999;
}

.loader {
  width: 24px;
  aspect-ratio: 1;
  background: #3FB8AF;
  position: relative;
  animation: l8-0 2.5s infinite linear alternate;
}

.loader:before {
  content: "";
  position: absolute;
  inset: 0;
  background: #FF3D7F;
  transform: translate(100%);
  transform-origin: top left;
  animation: l8-1 .5s infinite alternate;
}

@keyframes l8-0 {
  0% ,19.9%,
  80%,100%  {transform: scale(1,1)}
  20%,39.9% {transform: scale(-1,1)}
  40%,59.9% {transform: scale(-1,-1)}
  60%,79.9% {transform: scale(1,-1)}
}

@keyframes l8-1 {
   0%,20%   {transform: translate(100%) rotate(0)}
   80%,100% {transform: translate(100%) rotate(-180deg)}
}
</style>