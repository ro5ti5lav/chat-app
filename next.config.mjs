/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/chat-app',
    assetPrefix: '/chat-app/', // Используется для корректного размещения ресурсов на GitHub Pages
    trailingSlash: true, // Добавляет косую черту в конце всех URL
};

export default nextConfig;
