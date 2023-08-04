import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import inspect from 'vite-plugin-inspect'
export default defineConfig({
	plugins: [inspect(),sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
