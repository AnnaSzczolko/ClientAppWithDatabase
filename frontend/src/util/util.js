export const isNotEmpty = value => {
	return value.trim() !== ''
}
export const isChecked = value => {
	return value === 'on'
}
export const isNotEmptyArray = value => {
	return value.length > 0
}