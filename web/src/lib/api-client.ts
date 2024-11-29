import { getCookie } from './cookies'

// NOTE: Supports cases where `content-type` is other than `json`
const getBody = <T>(c: Response | Request): Promise<T> => {
	const contentType = c.headers.get('content-type')

	if (contentType?.includes('application/json')) {
		return c.json()
	}

	if (contentType?.includes('application/pdf')) {
		return c.blob() as Promise<T>
	}

	return c.text() as Promise<T>
}

// NOTE: Update just base url
const getUrl = (contextUrl: string): string => {
	const url = new URL(contextUrl)
	const pathname = url.pathname
	const search = url.search
	const baseUrl = process.env.VITE_API_URL

	const requestUrl = new URL(`${baseUrl}${pathname}${search}`)

	return requestUrl.toString()
}

// NOTE: Add headers
const getHeaders = (headers?: HeadersInit): HeadersInit => {
	const token = getCookie('token')

	return {
		...headers,
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json',
	}
}

export const apiClient = async <T>(
	url: string,
	options: RequestInit
): Promise<T> => {
	const requestUrl = getUrl(url)
	const requestHeaders = getHeaders(options.headers)

	const requestInit: RequestInit = {
		...options,
		headers: requestHeaders,
	}

	const request = new Request(requestUrl, requestInit)
	const response = await fetch(request)
	const data = await getBody<T>(response)

	return { status: response.status, data, headers: response.headers } as T
}
