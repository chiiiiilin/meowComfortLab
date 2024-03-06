/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#E6EBE9',
					dark: '#747D78',
				},
			},
		},
	},
	plugins: [require('daisyui')],
};
