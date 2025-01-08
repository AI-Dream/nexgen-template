<template>
    <nav>
        <div class="border-bottom">
            <div class="container">
                <ul class="d-flex list-unstyled py-2 justify-content-center">
                    <li class="me-2">
                        <p @click="savePackage('S')" class="fs-6 cursor-pointer mb-0" :class="{ 'text-primary': selectedPackage === 'S' }">Package S</p>
                    </li>
                    <li class="me-2">|</li>
                    <li class="me-2">
                        <p @click="savePackage('M')" class="fs-6 cursor-pointer mb-0" :class="{ 'text-primary': selectedPackage === 'M' }">Package M</p>
                    </li>
                    <li class="me-2">|</li>
                    <li>
                        <p @click="savePackage('L');" class="fs-6 cursor-pointer mb-0" :class="{ 'text-primary': selectedPackage === 'L' }">Package L</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="border-bottom">
            <div>
                <div class="d-flex justify-content-center">
                    <p class="fs-6 mb-0 py-1" :class="{'text-success': selectedPackage === 'L', 'text-danger': selectedPackage !== 'L'}">{{ selectedPackage === 'L' ? 'Add custom functions' : 'No add-on function'}}</p>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
const selectedPackage = usePackage();

const savePackage = (packageName) => {
    selectedPackage.value = packageName;
    navigateTo('/')
};
</script>