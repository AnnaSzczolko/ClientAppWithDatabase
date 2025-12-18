import React from 'react'
import { use } from 'react'
import { UsersContex } from '../store/usersContex'

export default function UserItem({ user }) {
	const { deleteUser, changeUserData, getUserData } = use(UsersContex)

	const deleteUserHandler = id => {
		deleteUser(id)
	}
	const changeUserDataHandler = id => {
		getUserData(id)
	}

	return (
		
			<tr >
				<td>
					{user.name} {user.surname}
				</td>
				<td>{user.gender}</td>
				<td>{user.age}</td>
				<td>{user.occupation.join(', ')}</td>
				<td className="user-actions">
					<button className="button button-primary" onClick={() => deleteUserHandler(user.id)}>
						Delete
					</button>
					<button className="button button-primary" onClick={() => changeUserDataHandler(user.id)}>
						Edit
					</button>
				</td>
			</tr>
		

	)
}
