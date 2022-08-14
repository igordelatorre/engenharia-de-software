import { FormikErrors, FormikTouched } from 'formik'
import { Moment } from 'moment'

type Formik<Entity, Value> = {
	values: Entity
	errors: FormikErrors<Entity>
	touched: FormikTouched<Entity>
	setFieldValue: <Key extends keyof Entity>(
		field: Key,
		value: Value,
		shouldValidate?: boolean | undefined
	) => void
}

function string<Entity, Key extends keyof Entity>(
	formik: Formik<Entity, string | undefined>,
	field: Key
) {
	const handleChange = (value?: string) => {
		formik.setFieldValue(field, value)
	}

	return {
		onChange: handleChange,
		value: ((formik.values[field] as Entity[Key]) || '') as string,
		error: formik.errors[field],
		touched: formik.touched[field]
	}
}

function number<Entity, Key extends keyof Entity>(
	formik: Formik<Entity, number | undefined>,
	field: Key
) {
	const handleChange = (value?: string) => {
		formik.setFieldValue(field, parseFloat(value || ''))
	}

	return {
		onChange: handleChange,
		value: ((formik.values[field] as Entity[Key]) || '') as string,
		error: formik.errors[field],
		touched: formik.touched[field],
		type: 'number' as 'number'
	}
}

function select<Entity, Key extends keyof Entity, Option>(
	formik: Formik<Entity, Option | null>,
	options: Option[],
	field: Key
) {
	const handleChange = (value: Option | undefined) => {
		formik.setFieldValue(field, value || null)
	}

	return {
		onChange: handleChange,
		value: (formik.values[field] as Entity[Key]) || undefined,
		options,
		error: formik.errors[field],
		touched: formik.touched[field]
	}
}

function multiSelect<Entity, Key extends keyof Entity, Option>(
	formik: Formik<Entity, Option[]>,
	options: Option[],
	field: Key
) {
	const handleChange = (value: Option[]) => {
		formik.setFieldValue(field, value)
	}

	return {
		onChange: handleChange,
		value: formik.values[field] as Entity[Key],
		options,
		error: formik.errors[field],
		touched: formik.touched[field]
	}
}

function date<Entity, Key extends keyof Entity>(
	formik: Formik<Entity, Moment | null>,
	field: Key
) {
	const handleChange = (value: Moment | undefined) => {
		formik.setFieldValue(field, value || null)
	}

	return {
		onChange: handleChange,
		value: (formik.values[field] as Entity[Key]) || undefined,
		error: formik.errors[field],
		touched: formik.touched[field]
	}
}

export default {
	string,
	number,
	select,
	date,
	multiSelect
}
