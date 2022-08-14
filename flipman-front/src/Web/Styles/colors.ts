type PrimaryColors = {
	green: string
	blue: string
	darkGray: string
	white: string
	black: string
}

type SecondaryColors = {
	red: string
	yellow: string
	gray: string
	orange: string
	green: string
	blue: string
	purple: string
	purple2: string
}

type TimetekHourStatusColors = {
	red: string
	yellow: string
	green: string
}

type StatusColors = {
	allocated: string
	maintenance: string
	available: string
	inactive: string
	waitingMaintenance: string
	unavailable: string
	reserved: string
	textColor: string
}

type ExpenseStatusColors = {
	approved: string
	paid: string
	pending: string
	processing: string
	rejected: string
}

type CategoriesColors = {
	red: string
	orange: string
	blue: string
	green: string
	lila: string
}

type DeallocateButton = {
	textColor: string
	background: string
}

type ExpenseActionsColors = {
	approve: string
	reject: string
	revert: string
	paid: string
}

type Colors = {
	primary: PrimaryColors
	secondary: SecondaryColors
	timetekHourStatus: TimetekHourStatusColors
	statusColors: StatusColors
	expenseStatusColors: ExpenseStatusColors
	categoriesColors: CategoriesColors
	deallocateButton: DeallocateButton
	expenseActionsColors: ExpenseActionsColors
}

const primaryColors: PrimaryColors = {
	green: '#48b96f',
	blue: '#164560',
	darkGray: '#4d4f5c',
	white: '#FFFFFF',
	black: '#43425D'
}
const secondaryColors: SecondaryColors = {
	red: '#FF93A2',
	yellow: '#FFEA98',
	gray: '#A9A9A9',
	orange: '#FFB55F',
	green: '#92DFB5',
	blue: '#A5C8F1',
	purple: '#D983FF',
	purple2: '#B1A5F1'
}

const timetekHourStatus: TimetekHourStatusColors = {
	red: '#FFE2E8',
	yellow: '#FFF3E5',
	green: '#CCF4E3'
}

const statusColors: StatusColors = {
	allocated: '#C3D1FF',
	maintenance: '#D9D9D9',
	available: '#9BC6A2',
	inactive: '#E3BFFF',
	waitingMaintenance: '#FED4A3',
	unavailable: '#F4B8C0',
	reserved: '#FCF29A',
	textColor: '#282828'
}

const expenseStatusColors: ExpenseStatusColors = {
	approved: '#9BC6A2',
	pending: '#FCF29A',
	rejected: '#F4B8C0',
	processing: '#D9D9D9',
	paid: '#E3BFFF'
}

const categoriesColors: CategoriesColors = {
	red: '#F4B8C0',
	orange: '#FED4A3',
	blue: '#C3D1FF',
	green: '#9BC6A2',
	lila: '#E3BFFF'
}

const deallocateButton: DeallocateButton = {
	textColor: '#282828',
	background: '#F4B8C0'
}

const expenseActionsColors: ExpenseActionsColors = {
	approve: '#48B96F',
	reject: '#FF4D4F',
	revert: '#FED4A3',
	paid: '#E3BFFF'
}

export const color: Colors = {
	primary: primaryColors,
	secondary: secondaryColors,
	timetekHourStatus: timetekHourStatus,
	statusColors: statusColors,
	expenseStatusColors: expenseStatusColors,
	categoriesColors: categoriesColors,
	deallocateButton: deallocateButton,
	expenseActionsColors: expenseActionsColors
}
