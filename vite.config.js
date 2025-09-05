import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
		vuetify({autoImport: {labs: true}})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		},
	},
	server: {
		port: 5001,
		host: '0.0.0.0',
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3000',
			}
		}
	},
})
