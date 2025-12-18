import React from 'react'
// import { useContext } from 'react'
import { use } from 'react'
import { UsersContex } from '../store/usersContex'
import UserItem from './UserItem'

export default function Users() {
	const { users } = use(UsersContex)

	return (
		<div className="users">
			<h2 className="users-title">Users</h2>

			<table className="user-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Gender</th>
						<th>Age</th>
						<th>Occupation</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>{users && users.map(item => <UserItem key={item.id} data={item}></UserItem>)}</tbody>
			</table>
		</div>
	)
}
