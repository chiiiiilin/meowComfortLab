// https://nuxt.com/docs/api/configuration/nuxt-config
import * as path from 'path';

export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
});
