import React from 'react'
import { use } from 'react'
import { UsersContex } from '../store/usersContex'

export default function UserItem({ data }) {
	const { deleteUser, changeUserData, getUserData } = use(UsersContex)

	const deleteUserHandler = id => {
		deleteUser(id)
	}
	const changeUserDataHandler = id => {
		getUserData(id)
	}

	return (
		<>
			<tr key={user.id}>
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
		</>

		// 	<div className='user'>
		// 		<div className="user-main">
		// 		<p>{data.name} {data.surname}</p>

		// 		</div>

		// 		<p>{data.gender}</p>
		// 		<p>{data.age}</p>
		// 		<ul className='occupation-list'>
		// 			{data.occupation.map(occ => (
		// 				<li className='occupation' key={occ}>{occ}</li>
		// 			))}
		// 		</ul>
		// 		<div className="user-actions">
		//   <button className='button' onClick={() => deleteUserHandler(data.id)}>Delete</button>
		//   <button className='button button-primary' onClick={() => changeUserDataHandler(data.id)}>Change Data</button>

		// 		</div>
		// 	</div>
	)
}
