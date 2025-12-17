import React from 'react'
import { use } from 'react'
import { UsersContex } from '../store/usersContex'

export default function UserItem({ data }) {
  const {deleteUser, changeUserData, getUserData} = use(UsersContex)


  const deleteUserHandler = (id) => {

    deleteUser(id)
  }
  const changeUserDataHandler = (id) => {

    getUserData(id)
  }

	return (

		<div>
			<div>{data.name}</div>
			<p>{data.surname}</p>
			<p>{data.gender}</p>
			<p>{data.age}</p>
			<ul>
				{data.occupation.map(occ => (
					<li key={occ}>{occ}</li>
				))}
			</ul>
      <button onClick={() => deleteUserHandler(data.id)}>Delete</button>
      <button onClick={() => changeUserDataHandler(data.id)}>Change Data</button>
		</div>
	)
}
