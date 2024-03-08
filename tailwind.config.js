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
				accent: {
					light: '#F3F0DF',
					DEFAULT: '#F3B55A',
				},
			},
			backgroundColor: {
				glass: 'rgba(255, 255, 255, 0.55)',
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#747d78',
					'primary-content': '#ffffff',
					secondary: '#E6EBE9',
					accent: '#F3B55A',
					'accent-content': '#ffffff',
					neutral: '#f3f4f6',
					'base-100': '#ffffff',
					info: '#bae6fd',
					success: '#a7f3d0',
					warning: '#fef08a',
					error: '#fecdd3',
				},
			},
		],
	},
};
