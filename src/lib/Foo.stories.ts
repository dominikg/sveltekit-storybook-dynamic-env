import type { Meta, StoryObj } from '@storybook/svelte';
import Foo from './Foo.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
	title: 'Foo',
	component: Foo
} satisfies Meta<Foo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Standard: Story = {
	args: {}
};
