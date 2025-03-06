import { useEffect } from 'react'
import UserTable from '../components/UserTable'
import { useAppContext } from '../context/AppContext'
import { fetchUsers } from '../actions/appActions'
import { Card, CardHeader } from '@chakra-ui/react'

const UsersPage = () => {
  const { state, dispatch } = useAppContext()
  const { users, loading, error } = state

  useEffect(() => {
    fetchUsers(dispatch)
  }, [dispatch])

  if (loading)
    return (
      <Card>
        <CardHeader>Loading...</CardHeader>
      </Card>
    )

  if (error)
    return (
      <Card>
        <CardHeader>Error: {error}</CardHeader>
      </Card>
    )

  return (
    <>
      <UserTable data={users} />
    </>
  )
}

export default UsersPage
