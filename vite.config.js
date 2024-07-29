import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'

// https://vitejs.dev/config/
export default ({mode}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        plugins: [vue()],

        server: {
            host: process.env.VITE_HOST,
            port: process.env.VITE_PORT
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        }
    });
}
