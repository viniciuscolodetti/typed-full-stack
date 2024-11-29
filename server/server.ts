import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
	validatorCompiler,
	serializerCompiler,
	jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { routes } from './routes'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
	origin: '*',
})

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Live typed full-stack',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

app.register(routes)

app.listen({ port: 3333 }).then(() => {
	console.log('HTTP server running!')
})

app.ready().then(() => {
	const spec = app.swagger()

	writeFile(
		resolve(__dirname, 'swagger.json'),
		JSON.stringify(spec, null, 2),
		'utf8'
	)
})
