import React, { useActionState } from 'react'
import { isNotEmpty, isNotEmptyArray, isChecked } from '../util/util'
import { use } from 'react'
import { UsersContex } from '../store/usersContex'

export default function Form() {
	const { addUser, changeUserData, user, resetUser } = use(UsersContex)

	const resetHandler = () => {
		formAction(null)
		resetUser()
	}

	const singupAction = (prevFormState, formData) => {
		if (formData === null) {
			return { errors: null }
		}

		const name = formData.get('name')
		const surname = formData.get('surname')
		const gender = formData.get('gender')
		const age = formData.get('age')
		const occupation = formData.getAll('occupation')
		const terms = formData.get('terms')

		let errors = []



		if (!isNotEmpty(name)) {
			errors.push('Invalid name, please enter a name again')
		}
		if (!isNotEmpty(surname)) {
			errors.push('Invalid surname, please enter a surname again')
		}
		if (!isNotEmpty(gender)) {
			errors.push('Invalid gender, please enter a gender again')
		}
		if (!isNotEmpty(age)) {
			errors.push('Invalid age, please enter an age again')
		}
		if (!isNotEmptyArray(occupation)) {
			errors.push('You must check at least one occupation')
		}

		if (!isChecked(terms)) {
			errors.push('You must accept the terms')
		}

		if (errors.length > 0) {
			return {
				errors,
				enteredValues: {
					name,
					surname,
					gender,
					age,
					occupation,
					terms,
				},
			}
		}

		if (user.name) {
			changeUserData(user.id, { name, surname, gender, age, occupation, terms })
		} else {
			addUser({ name, surname, gender, age, occupation, terms })
		}

		resetUser()

		return { errors: null }
	}
	const [formState, formAction, pending] = useActionState(singupAction, { errors: null })


	return (
		<form action={formAction} className="form">
			<h2 className="form-title">Welcome on board!</h2>
			<p className="form-subtitle">Please provide your personal data so we can register you in our database.</p>

			<div className="form-container">
				<label htmlFor="name">Name</label>
				<input type="text" name="name" id="name" defaultValue={ user?.name ?? formState.enteredValues?.name } />
			</div>
			<div className="form-container">
				<label htmlFor="surname">Surname</label>
				<input
					type="text"
					name="surname"
					id="surname"
					defaultValue={ user?.surname ?? formState.enteredValues?.surname}
				/>
			</div>
			<div className="form-container">
				<label htmlFor="gender">Chose your gender</label>
				<select
					name="gender"
					id="gender"
					defaultValue={user?.gender ?? formState.enteredValues?.gender}
					key={formState.enteredValues?.gender}>
					<option value="female">Female</option>
					<option value="male">Male</option>
				</select>
			</div>
			<div className="form-container">
				<label htmlFor="age">Enter your age</label>
				<input
					type="number"
					name="age"
					id="age"
					step="1"
					min={1}
					defaultValue={ user?.age ?? formState.enteredValues?.age}
				/>
			</div>
			<fieldset className="form-fieldset">
				<legend>What are you doing?</legend>
				<div className="checkbox">
					<input className='checkbox-item'
						type="checkbox"
						id="working"
						value="working"
						name="occupation"
						defaultChecked={
							user.occupation?.includes('working') ?? formState.enteredValues?.occupation.includes('working')
						}
						key={user.occupation?.includes('working') & formState.enteredValues?.occupation.includes('working')}
					/>
					<label htmlFor="working">Working</label>
				</div>
				<div className="checkbox">
					<input
						type="checkbox"
						id="studying"
						value="studying"
						name="occupation"
						defaultChecked={
							user.occupation?.includes('studying') ?? formState.enteredValues?.occupation.includes('studying')
						}
						key={user.occupation?.includes('studying') & formState.enteredValues?.occupation.includes('studying')}
					/>
					<label htmlFor="studying">Studying</label>
				</div>
				<div className="checkbox">
					<input
						type="checkbox"
						id="other"
						value="other"
						name="occupation"
						defaultChecked={
							 user.occupation?.includes('other') ?? formState.enteredValues?.occupation.includes('other')
						}
						key={user.occupation?.includes('other') & formState.enteredValues?.occupation.includes('other')}
					/>
					<label htmlFor="other">Other</label>
				</div>
			</fieldset>

			<div className="form-container terms">
				<label htmlFor="terms">I agree to terms and conditions</label>
				<input type="checkbox" id="terms" name="terms" defaultChecked={formState.enteredValues?.terms} />
			</div>

			{formState.errors && (
				<ul className="error-list">
					{formState.errors.map(err => (
						<li key={err}>{err}</li>
					))}
				</ul>
			)}
			<div className="actions">
				<button className="button button-secondary" type="reset" onClick={resetHandler}>
					Reset
				</button>
				{user.name ? (
					<button className="button button-primary" disabled={pending}>{pending ? 'Please wait...' : 'Change user Data'}</button>
				) : (
					<button className="button button-primary" disabled={pending}>
						{pending ? 'Please wait...' : 'Sing up'}
					</button>
				)}
			</div>
		</form>
	)
}
