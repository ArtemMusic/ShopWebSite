<template>
    <guest-layout title="Sign in to your account">
        <div class="space-y-6">
            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                    <input v-model='email' id="email" name="email" type="email" autocomplete="email" required=""
                           class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="text-sm">
                        <router-link :to="{name: 'request-password'}"
                                     class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?
                        </router-link>
                    </div>
                </div>
                <div class="mt-2">
                    <input v-model='password' id="password" name="password" type="password"
                           autocomplete="current-password" required=""
                           class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>

            <div>
                <button type="submit" @click.prevent="login"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Sign in
                </button>
            </div>
        </div>
    </guest-layout>
</template>

<script setup>
import GuestLayout from "../components/GuestLayout.vue";
import axios from "axios";
import {ref} from "vue";
import router from "../router/index.js";

let email = ref(null);
let password = ref(null);

function login() {
    axios.get('/sanctum/csrf-cookie').then(() => {
        axios.post('/login', {email: email.value, password: password.value})
            .then((data) => {
                localStorage.setItem('x-xsrf-token', data.config.headers['X-XSRF-TOKEN']);
                let token = localStorage.getItem('x-xsrf-token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                router.push({name:'app.dashboard'})
            })
            .catch(error=>{
                console.log(error.response.data.message);
            })
    })
}
</script>

