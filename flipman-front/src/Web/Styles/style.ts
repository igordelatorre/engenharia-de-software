import styled, { css } from 'styled-components'
import { tablet } from './responsive'
import { Pagination } from 'antd'
import Input from '../Components/Input/Input'

type ActionProps = {
	amount?: number
}

export const TableActions = styled.div<ActionProps>`
	display: flex;
	gap: 20px;
`

export const PageContainer = styled.div`
	position: relative;
	bottom: 0;
	top: 0;
	left: 0;
	right: 0;
	background-color: var(--background);
	overflow: auto;
	padding: 3rem 3rem 3rem 3rem;

	&::-webkit-scrollbar-thumb {
		background-color: #b2b2b2;
		border: 2px solid #fff;
		border-radius: 5px;
	}
	${tablet(
		css`
			padding: 0 0 5rem 0;
			top: 5.5rem;
			&::-webkit-scrollbar-thumb {
				border: 1px solid #fff;
			}
			background: white;

			.ant-card-bordered {
				border: none;
			}
		`
	)}

	&::-webkit-scrollbar {
		width: 8px;
	}
`

export const PageTitleContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-bottom: 2rem;

	${tablet(
		css`
			margin: 3rem 2.4rem 0rem 2.4rem;
			> div:nth-child(2) {
				width: 100%;
			}
		`
	)}
`

export const PageTitle = styled.span`
	font-family: Montserrat;
	font-style: normal;
	font-weight: bold;
	font-size: 18px;
	line-height: 22px;
	letter-spacing: -0.01em;
	text-transform: capitalize;
	width: 100%;
`

export const Label = styled.span`
	font-family: Montserrat;
	font-style: normal;
	font-size: 15px;
	line-height: 15px;
	letter-spacing: -0.01em;
	text-transform: capitalize;
	width: 100%;
`
export const NameSearch = styled(Input)`
	width: 30rem;
`


export const SearchFilter = styled(Input)`
	height: 3.2rem;
`

export const ClearAllButton = styled.div`
	color: var(--primary-gray);
	font-family: 'Montserrat';
	letter-spacing: -0.01em;
	font-size: 1.2rem;
	text-decoration: underline;
	white-space: nowrap;
	line-height: 3rem;
	cursor: pointer;

	&:hover {
		color: var(--primary-blue);
	}

	${tablet(
		css`
			text-align: end;
			padding-right: 1rem;
		`
	)}
`

export const PageButtonContainer = styled.div`
	position: absolute;
	top: 2.4rem;
	right: 2.4rem;

	${tablet(
		css`
			position: fixed;
			left: 50%;
			right: unset;
			transform: translate(-50%, 0);
			top: calc(100% - 5.5rem);
			z-index: 3;
			box-shadow: 0px 3px 6px var(--button-shadow);
		`
	)}
`

export const NewPageButtonContainer = styled.div`
	position: absolute;
	top: 9.5rem;
	right: 2.4rem;

	${tablet(
		css`
			position: fixed;
			left: 50%;
			right: unset;
			transform: translate(-50%, 0);
			top: calc(100% - 5.5rem);
			z-index: 3;
			box-shadow: 0px 3px 6px var(--button-shadow);
		`
	)}
`

export const AlignedPageButtonContainer = styled.div`
	position: absolute;
	top: -5.6rem;
	right: 0rem;

	${tablet(
		css`
			position: fixed;
			left: 50%;
			right: unset;
			transform: translate(-50%, 0);
			top: calc(100% - 5.5rem);
			z-index: 3;
			box-shadow: 0px 3px 6px var(--button-shadow);
		`
	)}
`

export const SidebarButtonContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: flex-end;
	margin-top: 2rem;

	button:not(:last-child) {
		margin-right: 1rem;
	}
`

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
`

export const ContentMenu = styled.div`
	width: 100%;
	${tablet(
		css`
			margin-left: 0rem;
			margin-top: 0.5rem;
			overflow-x: hidden;
		`
	)}
`

export const CenteredContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

export const HorizontalCenteredContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`
