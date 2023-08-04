import type { StorybookConfig } from '@storybook/sveltekit';
import fakeEnvPlugin from './fake-env-plugin';
import injectKitGlobalsPlugin from "./inject-kit-globals-plugin";
const config: StorybookConfig = {
	stories: ['../src/**/*.stories.ts'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	},
	viteFinal(config) {
		config.plugins = config.plugins ?? [];
		// add this makeshift plugin to resolve the env modules on load
		// config.plugins.unshift(fakeEnvPlugin())

		// add this plugin to inject the env global instead of a resolved module
		//config.plugins.unshift(injectKitGlobalsPlugin())
		return config;
	}
};
export default config;
