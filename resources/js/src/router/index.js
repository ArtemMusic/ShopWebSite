import {createRouter, createWebHistory} from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import requestPassword from "../views/RequestPassword.vue";
import resetPassword from "../views/ResetPassword.vue";
import NotFound from "../views/NotFound.vue";
import AppLayout from "../components/AppLayout.vue";
import Products from "../views/Products.vue";
import Registration from "../views/Registration.vue";
import axios from "axios";

const routes = [
    {
        path: '/',
        redirect: '/test'
    },
    {
        path: '/app',
        name: 'app',
        redirect: '/app/dashboard',
        component: AppLayout,
        children: [
            {
                path: 'dashboard',
                name: 'app.dashboard',
                component: Dashboard
            },
            {
                path: 'products',
                name: 'app.products',
                component: Products
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    },
    {
        path: '/request-password',
        name: 'request-password',
        component: requestPassword
    },
    {
        path: '/reset-password/:token',
        name: 'reset-password',
        component: resetPassword
    },
    {
        path: '/test',
        name: 'test',
        component: Dashboard
    },
    {
        path: '/:pathMatch(.*)',
        name: 'notfound',
        component: NotFound,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('x-xsrf-token');

    if (!token) {
        if (to.name === 'login' || to.name === 'registration') {
            return next();
        } else {
            return next({
                name: 'login'
            })
        }
    }

    if ((to.name === 'login' || to.name === 'registration') && token) {
        return next({
            name: 'app.dashboard'
        })
    }

    // Проверяем роль администратора и разрешаем доступ к /app только админам
    if (to.name === "app.dashboard" || to.name === "app.products") {
        // Выполняем асинхронный запрос к API для получения информации о пользователе
        const response = await axios.get("/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const user = response.data;

        if (!user.is_admin) {
            return next({
                name: "test",
            });
        }
    }

    next();
});

export default router;
