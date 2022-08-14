type Incomplete<Entity> = {
	[Key in keyof Entity]: Entity[Key] extends Function
		? Entity[Key]
		: Entity[Key] | undefined
}

export default Incomplete
