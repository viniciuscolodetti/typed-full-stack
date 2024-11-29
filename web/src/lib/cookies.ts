// Setar um cookie
export const setCookie = (key: string, value: string, days?: number) => {
	const expires = days
		? `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}`
		: ''
	document.cookie = `${key}=${value || ''}${expires}; path=/`
}

// Obter um cookie
export const getCookie = (key: string): string | null => {
	const nameEQ = `${key}=`
	const ca = document.cookie.split(';')
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0) === ' ') c = c.substring(1, c.length)
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
	}
	return null
}

// Remover um cookie
export const removeCookie = (key: string) => {
	document.cookie = `${key}=; Max-Age=-99999999;`
}
