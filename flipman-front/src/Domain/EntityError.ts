type EntityError<Entity> = Partial<
	{
		[Key in keyof Entity]: Entity[Key] extends Function ? undefined : string
	}
>

export default EntityError
