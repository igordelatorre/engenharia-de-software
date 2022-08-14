import { css, SimpleInterpolation } from 'styled-components'

export const desktop = (content: SimpleInterpolation) => css`
	@media (max-width: 1600px) {
		${content}
	}
`
export const notebook = (content: SimpleInterpolation) => css`
	@media (max-width: 1200px) {
		${content}
	}
`
export const tablet = (content: SimpleInterpolation) => css`
	@media (max-width: 992px) {
		${content}
	}
`
export const cellphone = (content: SimpleInterpolation) => css`
	@media (max-width: 480px) {
		${content}
	}
`
