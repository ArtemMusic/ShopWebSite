<template>
    <div class="min-h-full bg-gray-200 flex">
        <!--    Sidebar-->
        <Sidebar :class="{'-ml-[200px]': !sidebarOpened}"/>
        <!--/    Sidebar-->

        <div class="flex-1">
            <Navbar @toggle-sidebar="toggleSidebar"></Navbar>
            <!--      Content-->
            <main class="p-6">
                <router-view></router-view>
            </main>
            <!--      Content-->
        </div>
    </div>
</template>

<script setup>

import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import {ref, onMounted, onUnmounted} from 'vue'

const sidebarOpened = ref(false);

function toggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value;
}

function updateSidebarState() {
    sidebarOpened.value = window.outerWidth > 768;
}

onMounted(() => {
    updateSidebarState();
    window.addEventListener('resize', updateSidebarState)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateSidebarState)
})
</script>
