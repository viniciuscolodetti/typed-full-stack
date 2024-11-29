import { defineConfig } from 'orval'

export default defineConfig({
	api: {
		input: '../server/swagger.json',
		output: {
			clean: true,
			target: './src/http/generated/api.ts',
			mode: 'tags-split',
			httpClient: 'fetch',
			client: 'react-query',
			baseUrl: process.env.VITE_API_URL,
			biome: true,
			override: {
				mutator: {
					path: 'src/lib/api-client.ts',
					name: 'apiClient',
				},
			},
		},
	},
})
