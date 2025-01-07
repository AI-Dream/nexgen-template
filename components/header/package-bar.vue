<template>
    <nav>
        <div class="container">
            <ul class="d-flex list-unstyled p-0">
                <li class="me-2">
                    <a href="#" @click="savePackage('S')" :class="{ 'fw-bold': selectedPackage === 'S' }"
                        style="transition: none;">Package S</a>
                </li>
                <li class="me-2">
                    <a href="#" @click="savePackage('M')" :class="{ 'fw-bold': selectedPackage === 'M' }"
                        style="transition: none;">Package M</a>
                </li>
                <li>
                    <a href="#" @click="savePackage('L')" :class="{ 'fw-bold': selectedPackage === 'L' }"
                        style="transition: none;">Package L</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
const selectedPackage = usePackage();
const savePackage = (packageName) => {
    selectedPackage.value = packageName;
};
</script>