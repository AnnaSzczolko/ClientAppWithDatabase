import React from 'react'
// import { useContext } from 'react'
import { use } from 'react'
import { UsersContex } from '../store/usersContex'
import UserItem from './UserItem'


export default function Users() {

    const { users } = use(UsersContex)

  return (
    <div className='users'>
        <h2 className='users-title'>Users</h2>
        <div className='users-list'>

        { users && users.map(item => <UserItem key={item.id} data={item}></UserItem>)}
        </div>
    </div>
  )
}
