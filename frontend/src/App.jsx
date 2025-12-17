import React from 'react'
import Users from './components/Users'
import { UsersContexProvider } from './store/usersContex'

import Form from './components/Form'

export default function App() {
	return (
		<>
			<div>
				<UsersContexProvider>
					<Form></Form>
					<Users></Users>
				</UsersContexProvider>
			</div>
		</>
	)
}
