import styled, { css } from 'styled-components'


type ActionProps = {
	amount?: number
}

export const TableActions = styled.div<ActionProps>`
	display: flex;
	gap: 20px;
	padding-top: 20px;
`

export const ActionContainer = styled.div`
	cursor: pointer;
`
