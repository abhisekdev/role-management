import { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { fetchRoles } from '../actions/appActions'
import { Card, CardHeader } from '@chakra-ui/react'
import RoleTable from '../components/RoleTable'

const RolesPage = () => {
  const { state, dispatch } = useAppContext()
  const { roles, loading, error } = state

  useEffect(() => {
    fetchRoles(dispatch)
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
      <RoleTable data={roles} />
    </>
  )
}

export default RolesPage
