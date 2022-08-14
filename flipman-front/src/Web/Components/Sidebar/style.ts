import { Drawer as AntdDrawer } from 'antd'
import styled, { css } from 'styled-components'
import { color } from '../../Styles/colors'
import {Sidebar} from './Sidebar'

type DrawerProps = {
	padding: string
}

export const Drawer = styled(AntdDrawer)<DrawerProps>`
	.ant-drawer-body {
		padding-top: 0rem;
		display: flex;
		flex-direction: column;
		overflow: unset;
	}

	.ant-drawer-close {
		padding: 0;
		margin: 2rem;

		svg {
			font-size: 3rem;
		}
	}
`

export const HeaderContainer = styled.div`
	font-size: 3rem;
	font-family: 'Montserrat';
	font-weight: 500;
	color: ${color.primary.black};
	margin-top: 20px;
	margin-bottom: 20px;

`

export const ChildrenContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

export const SidebarPlayer = styled(Sidebar)`
	.ant-drawer-body {
		padding: 3.2rem;
		padding-top: 0rem;
		display: flex;
		flex-direction: column;
		overflow: unset;
	}
	.calendar-addon {
		height: 3.2rem;
		padding: 0.8rem;
	}
`
