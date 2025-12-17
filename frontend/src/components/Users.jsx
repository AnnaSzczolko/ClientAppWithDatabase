import React from 'react'
// import { useContext } from 'react'
import { use } from 'react'
import { UsersContex } from '../store/usersContex'
import UserItem from './UserItem'


export default function Users() {

    const { users } = use(UsersContex)

  return (
    <div>
        <h2>Users</h2>
        { users && users.map(item => <UserItem key={item.id} data={item}></UserItem>)}
    </div>
  )
}
