import { styled as styledIcon } from '@material-ui/core/styles'
import {
	SettingsBackupRestore,
	Clear,
	Add,
	AddCircleOutlineOutlined,
	DeveloperMode,
	Forum,
	Favorite,
	PictureAsPdf,
	CloudUpload,
	Search,
	ExpandMore,
	AccountCircle,
	PersonAdd,
	People,
	ExpandLess,
	Close,
	CloudDownload,
	Today,
	ListAltOutlined,
	MemoryOutlined,
	DeviceHubOutlined,
	BrightnessAutoOutlined,
	CheckCircle,
	Cancel,
	ChevronRight,
	ChevronLeft,
	EditOutlined,
	MoreVert,
	SaveAlt,
	HomeRounded,
	Fingerprint,
	Schedule,
	LocationCityOutlined,
	Timeline,
	TrendingDown,
	TrendingUp,
	InfoOutlined,
	CalendarToday,
	PieChart,
	Dehaze,
	ArrowBack,
	Warning,
	AttachMoney,
	BeachAccess,
	Lock,
	Build,
	RemoveCircle,
	WatchLater,
	Autorenew,
	LinkOff,
	Create,
	MonetizationOnOutlined,
	FileCopy,
	Assessment,
	Announcement,
	DeleteOutline,
	DriveEta,
	LocationOn,
	FitnessCenterRounded,
	Flight,
	HomeWork,
	Theaters,
	MenuBook,
	ChildFriendly,
	Devices,
	Restaurant,
	EmojiSymbols,
	Print,
	Label,
	Public,
	SwapHorizontalCircle,
	ArrowBackIos,
	ArrowForwardIos,
	PersonOutlined,
	QueryBuilder,
	DoubleArrow
} from '@material-ui/icons'
import { color } from './colors'

export { styledIcon }

const xsmallSize = '1.8rem'
const smallSize = '2rem'
const mediumSize = '2.4rem'
const largeSize = '3.5rem'
const xlargeSize = '4rem'
const xxlargeSize = '6rem'

export const IconEdit = styledIcon(EditOutlined)({
	color: 'var(--primary-dark-gray)',
	fontSize: mediumSize,
	cursor: 'pointer',
	padding: '0.1rem'
})

export const IconEditing = styledIcon(EditOutlined)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer',
	padding: '0.1rem'
})

export const IconRestore = styledIcon(SettingsBackupRestore)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconRemove = styledIcon(Clear)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconAddCircleOutline = styledIcon(AddCircleOutlineOutlined)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconAddCross = styledIcon(Add)({
	color: 'var(--secondary-gray)',
	fontSize: largeSize,
	cursor: 'pointer'
})

export const IconTechnicalSkills = styledIcon(DeveloperMode)({
	color: 'var(--primary-green)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconLanguageSkills = styledIcon(Forum)({
	color: 'var(--primary-blue)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconSoftSkills = styledIcon(Favorite)({
	color: 'var(--light-purple)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconPDF = styledIcon(PictureAsPdf)({
	color: 'var(--primary-blue)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconCloudUpload = styledIcon(CloudUpload)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconCloudUploadLarger = styledIcon(CloudUpload)({
	color: 'var(--border)',
	fontSize: xxlargeSize
})

export const IconCloudDownload = styledIcon(CloudDownload)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconXSmallCloudDownloadWhite = styledIcon(CloudDownload)({
	color: 'var(--primary-white)',
	fontSize: xsmallSize,
	cursor: 'pointer'
})

export const IconCloudDownloadLarger = styledIcon(CloudDownload)({
	color: 'var(--primary-white)',
	fontSize: xxlargeSize,
	cursor: 'pointer'
})

export const IconSaveAlt = styledIcon(SaveAlt)({
	color: color.primary.darkGray,
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconSearch = styledIcon(Search)({
	backgroundColor: 'var(--primary-white)',
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconExpandMore = styledIcon(ExpandMore)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconExpandMoreNavy = styledIcon(ExpandMore)({
	color: 'var(--primary-blue)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconExpandMoreWhite = styledIcon(ExpandMore)({
	color: 'var(--primary-white)',
	fontSize: largeSize,
	cursor: 'pointer'
})

export const IconExpandLess = styledIcon(ExpandLess)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconExpandLessNavy = styledIcon(ExpandLess)({
	color: 'var(--primary-blue)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconExpandLessWhite = styledIcon(ExpandLess)({
	color: 'var(--primary-white)',
	fontSize: largeSize,
	cursor: 'pointer'
})

export const IconChevronRight = styledIcon(ChevronRight)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconChevronLeft = styledIcon(ChevronLeft)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconAccountCircle = styledIcon(AccountCircle)({
	color: 'var(--light-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconMobileAvatar = styledIcon(AccountCircle)({
	color: color.primary.white,
	fontSize: xlargeSize
})

export const IconAddPerson = styledIcon(PersonAdd)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconPeople = styledIcon(People)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconClose = styledIcon(Close)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconToday = styledIcon(Today)({
	color: 'var(--primary-white)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconClock = styledIcon(Schedule)({
	color: 'var(--primary-dark-gray)',
	fontSize: mediumSize
})

export const Iconitems = styledIcon(ListAltOutlined)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})
export const IconComponents = styledIcon(MemoryOutlined)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})
export const IconTypes = styledIcon(DeviceHubOutlined)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})
export const IconAttributes = styledIcon(BrightnessAutoOutlined)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconCheckCircle = styledIcon(CheckCircle)({
	color: color.expenseActionsColors.approve,
	fontSize: mediumSize
})

export const IconCancelCircle = styledIcon(Cancel)({
	color: color.expenseActionsColors.reject,
	fontSize: mediumSize
})

export const IconMoreVert = styledIcon(MoreVert)({
	color: color.secondary.gray,
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconHomeSmall = styledIcon(HomeRounded)({
	color: 'var(--primary-dark-gray)',
	fontSize: xsmallSize
})

export const IconFingerprintSmall = styledIcon(Fingerprint)({
	color: 'var(--primary-dark-gray)',
	fontSize: smallSize
})

export const IconClockSmall = styledIcon(Schedule)({
	color: 'var(--primary-dark-gray)',
	fontSize: smallSize
})

export const IconBuildingSmall = styledIcon(LocationCityOutlined)({
	color: 'var(--primary-dark-gray)',
	fontSize: xsmallSize
})
export const IconDeleted = styledIcon(Cancel)({
	color: 'var(--primary-dark-gray)',
	fontSize: xsmallSize
})
export const IconTimeline = styledIcon(Timeline)({
	color: color.primary.darkGray,
	fontSize: mediumSize,
	cursor: 'pointer'
})
export const IconTrendingDown = styledIcon(TrendingDown)({
	color: 'var(--secondary-red)',
	fontSize: mediumSize,
	cursor: 'pointer'
})
export const IconTrendingUp = styledIcon(TrendingUp)({
	color: 'var(--secondary-green)',
	fontSize: mediumSize,
	cursor: 'pointer'
})
export const IconInfoOutlined = styledIcon(InfoOutlined)({
	color: color.primary.black,
	fontSize: mediumSize
})

export const IconCalendarToday = styledIcon(CalendarToday)({
	color: color.secondary.gray,
	fontSize: xlargeSize,
	padding: '0.5rem'
})

export const IconPieChart = styledIcon(PieChart)({
	color: color.secondary.gray,
	fontSize: xlargeSize
})

export const IconDehaze = styledIcon(Dehaze)({
	color: color.primary.white,
	fontSize: '3.2rem'
})

export const IconArrowBack = styledIcon(ArrowBack)({
	color: color.primary.black,
	fontSize: mediumSize
})

export const IconWarning = styledIcon(Warning)({
	color: color.secondary.orange,
	fontSize: mediumSize
})
export const IconMoney = styledIcon(AttachMoney)({
	color: color.primary.black,
	fontSize: xsmallSize
})

export const IconVacation = styledIcon(BeachAccess)({
	color: color.primary.black,
	fontSize: xsmallSize
})

export const IconItemAvailable = styledIcon(CheckCircle)({
	color: color.statusColors.textColor,
	fontSize: smallSize
})

export const IconItemReserved = styledIcon(Lock)({
	color: color.statusColors.textColor,
	fontSize: smallSize
})

export const IconItemMaintenance = styledIcon(Build)({
	color: color.statusColors.textColor,
	fontSize: smallSize,
	transform: `rotateY(180deg)`
})

export const IconItemUnavailable = styledIcon(RemoveCircle)({
	color: color.statusColors.textColor,
	fontSize: smallSize
})

export const IconItemInactive = styledIcon(Cancel)({
	color: color.statusColors.textColor,
	fontSize: smallSize
})

export const IconItemWaitingMaintencance = styledIcon(WatchLater)({
	color: color.statusColors.textColor,
	fontSize: smallSize
})

export const IconItemAllocated = styledIcon(AccountCircle)({
	color: color.statusColors.textColor,
	fontSize: smallSize
})

export const IconAddInventoryItem = styledIcon(Autorenew)({
	color: color.primary.white,
	fontSize: smallSize
})

export const IconDeallocateCollaborator = styledIcon(LinkOff)({
	color: color.deallocateButton.textColor,
	fontSize: smallSize
})

export const IconEditItem = styledIcon(Create)({
	color: color.primary.white,
	fontSize: smallSize
})

export const MonetizationOutlined = styledIcon(MonetizationOnOutlined)({
	color: color.primary.white,
	fontSize: largeSize
})

export const IconFileCopy = styledIcon(FileCopy)({
	color: color.primary.white,
	fontSize: smallSize
})

export const IconXSmallFileCopyWhite = styledIcon(FileCopy)({
	color: color.primary.white,
	fontSize: xsmallSize
})

export const IconAssessment = styledIcon(Assessment)({
	color: color.primary.white,
	fontSize: smallSize
})

export const IconCategoryCarRental = styledIcon(DriveEta)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconCategoryCourses = styledIcon(MenuBook)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconCategoryDaycare = styledIcon(ChildFriendly)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconCategoryFood = styledIcon(Restaurant)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconCategoryItEquipment = styledIcon(Devices)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconCategoryLanguageClasses = styledIcon(Public)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconCategoryMealsAndEntretainment = styledIcon(Theaters)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconCategoryHomeOffice = styledIcon(HomeWork)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconCategoryOfficeSupplies = styledIcon(Print)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconCategoryOthers = styledIcon(EmojiSymbols)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconCategorySports = styledIcon(FitnessCenterRounded)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconCategoryTransport = styledIcon(LocationOn)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconCategoryTravel = styledIcon(Flight)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconCategoryDefault = styledIcon(Label)({
	color: color.primary.black,
	fontSize: smallSize
})

export const IconSmallCloudDownload = styledIcon(CloudDownload)({
	color: 'var(--secondary-gray)',
	fontSize: smallSize,
	cursor: 'pointer'
})

export const IconAnnouncement = styledIcon(Announcement)({
	color: 'var(--secondary-gray)',
	fontSize: smallSize
})

export const IconTrash = styledIcon(DeleteOutline)({
	color: 'var(--secondary-gray)',
	fontSize: smallSize,
	cursor: 'pointer'
})

export const IconEditAction = styledIcon(Create)({
	color: 'var(--secondary-gray)',
	fontSize: smallSize,
	cursor: 'pointer'
})

export const IconRevertAction = styledIcon(SwapHorizontalCircle)({
	color: color.expenseActionsColors.revert,
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconPersonOutline = styledIcon(PersonOutlined)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer',
	marginRight: '1.5rem'
})

export const IconQueryBuilder = styledIcon(QueryBuilder)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer',
	marginRight: '1.5rem'
})

export const IconMonetizationOnOutlined = styledIcon(MonetizationOnOutlined)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer',
	marginRight: '1.5rem'
})

export const IconDoubleArrow = styledIcon(DoubleArrow)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer',
	position: 'absolute',
	bottom: 0
})

export const IconRemoveFiltered = styledIcon(Clear)({
	color: 'var(--almost-black)',
	fontSize: xsmallSize,
	cursor: 'pointer'
})
export const IconLeftArrow = styledIcon(ArrowBackIos)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconRightArrow = styledIcon(ArrowForwardIos)({
	color: 'var(--secondary-gray)',
	fontSize: mediumSize,
	cursor: 'pointer'
})

export const IconApprove = styledIcon(CheckCircle)({
	color: 'var(--primary-white)',
	fontSize: mediumSize
})

export const IconReject = styledIcon(Cancel)({
	color: 'var(--primary-white)',
	fontSize: mediumSize
})

export const IconRevert = styledIcon(SwapHorizontalCircle)({
	color: 'var(--primary-white)',
	fontSize: mediumSize
})
