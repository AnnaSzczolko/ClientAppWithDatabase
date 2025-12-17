import { createContext, useEffect, useState } from 'react'

export const UsersContex = createContext({
	users: null,
	addUser: userData => {},
	deleteUser: id => {},
	changeUserData: userData => {},
	getUserData: id => {},
    user : [],
    resetUser : () => {}

})

export function UsersContexProvider({ children }) {
	const [users, setUsers] = useState([])
	const [user, setUser] = useState([])

	useEffect(() => {
		getUsers()
	}, [])

	const getUsers = async () => {
		const response = await fetch('http://localhost:5000/users')
		const data = await response.json()
		setUsers(data)
	}

	async function addUser(userData) {
		const response = await fetch('http://localhost:5000/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		})

		if (!response.ok) {
			return
		}

		const savedUser = await response.json()
		setUsers(prevUsers => [savedUser, ...prevUsers])
	}

	async function deleteUser(id) {
		const response = await fetch(`http://localhost:5000/users/${id}`, {
			method: 'DELETE',
		})

		if (!response.ok) {
			return
		}

		const newUsers = await response.json()
		setUsers(newUsers)
	}

	async function changeUserData(id, userData) {

		const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		})

        
		if (!response.ok) {
            return
		}


		const updatedUser = await response.json()

		setUsers(prevUsers => prevUsers.map(user => (user.id === id ? updatedUser : user)))
	}

	async function getUserData(id) {
		const response = await fetch(`http://localhost:5000/users/${id}`)

		if (!response.ok) {
			return
		}

		const userData = await response.json()
        setUser(userData)
	}

    const resetUser = () => {
        setUser([])
    }

	const contexValue = {
		users,
		addUser,
		deleteUser,
		changeUserData,
        getUserData,
        user,
        resetUser
	}

	return <UsersContex value={contexValue}>{children}</UsersContex>
}
