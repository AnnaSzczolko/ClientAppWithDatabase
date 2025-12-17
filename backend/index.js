import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'

async function loadUsers() {
	try {
		const dbFileData = await fs.readFile('./db.json')
		const parsedData = JSON.parse(dbFileData)
		return parsedData.users
	} catch (error) {
		return []
	}
}

async function initializeDB() {
	try{
		const users = await loadUsers
		if(users.length === 0){
			const defaultUsers = await fs.readFile('./initial.json')
			const parsedDefaultUsers = JSON.parse(defaultUsers)

			const defaultUsersWithId = parsedDefaultUsers.users.map(user => ({...user, id: uuidv4()}))

			const usersToSave = { users: defaultUsersWithId}
			await fs.writeFile('./db.json', JSON.stringify(usersToSave, null, 2))

			console.log('Lista użytkowników była pusta. Załadowano domyślnych użytkowników');
		}
	} catch (error){
		return []
	}
}

async function addUser(user) {
	const users = await loadUsers()
	const newUser = { id: uuidv4(), ...user }
	users.unshift(newUser)
	const usersToSave = { users }
	await fs.writeFile('./db.json', JSON.stringify(usersToSave), null, 2)
	return newUser
}

async function deleteUser(userID) {
	const users = await loadUsers()
	const newUsers = users.filter(user => user.id !== userID)

	const usersToSave = { users: newUsers }
	await fs.writeFile('./db.json', JSON.stringify(usersToSave), null, 2)
	return newUsers
}

async function updateUser(id, userData) {
	const users = await loadUsers()

	const index = users.findIndex(user => user.id === id)

	if (index === -1) {
		return null
	}

	const { name, surname, gender, age, occupation } = userData

	users[index] = { ...users[index], name, surname, gender, age, occupation }

	const usersToSave = { users }
	await fs.writeFile('./db.json', JSON.stringify(usersToSave), null, 2)
	return users[index]
}

const app = express()

app.use(
	cors({
		origin: 'https://client-app-with-database.vercel.app',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type'],
	})
)

app.use(express.json())

app.get('/users', async (req, res) => {
	try {
		const users = await loadUsers()
		res.json(users)
	} catch (error) {
		res.status(500).json({ error: 'Error loading users.' })
	}
})
app.get(`/users/:id`, async (req, res) => {
	const { id } = req.params
	try {
		const users = await loadUsers()
		const userDataIndex = users.findIndex(user => user.id === id)

		if (userDataIndex < 0) {
			res.status(404).json({ error: 'Error user data' })
		}

		const userData = users[userDataIndex]
		res.json(userData)
	} catch (error) {
		res.status(500).json({ error: 'Error loading user data.' })
	}
})

app.post('/users', async (req, res) => {
	const { name, surname, gender, age, occupation } = req.body

	try {
		const newUser = await addUser({ name, surname, gender, age, occupation })
		res.status(201).json(newUser)
	} catch (error) {
		res.status(500).json({ error: 'Error adding user.' })
	}
})

app.delete('/users/:id', async (req, res) => {
	const { id } = req.params

	try {
		const newUsers = await deleteUser(id)
		res.status(200).json(newUsers)
	} catch (error) {
		res.status(500).json({ error: 'Error deleting user.' })
	}
})

app.put('/users/:id', async (req, res) => {

	const { id } = req.params
	const updatedData = req.body

	try {
		const updatedUser = await updateUser(id, updatedData)

		if (!updatedUser) {
			res.status(404).json({ error: 'Updated User not found' })
		}

		res.status(200).json(updatedUser)
	} catch (error) {
		res.status(500).json({ error: 'Error updating user.' })
	}
})
initializeDB().then( ()=> {
	app.listen(5000, () => console.log('Serwer działa na porcie 5000'))

})
