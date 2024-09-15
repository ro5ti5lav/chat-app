/** @type {import('next').NextConfig} */
const nextConfig = {
    // Если ваш проект находится в корне репозитория, оставьте пустым
    basePath: '/chat-app',
    assetPrefix: '/chat-app/', // Используется для корректного размещения ресурсов на GitHub Pages
    trailingSlash: true, // Добавляет косую черту в конце всех URL
};

export default nextConfig;
