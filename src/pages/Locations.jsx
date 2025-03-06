import React, { useEffect } from 'react'
import LocationTable from '../components/LocationTable'
import { fetchLocations } from '../actions/appActions'
import { Card, CardHeader } from '@chakra-ui/react'
import { useAppContext } from '../context/AppContext'

const LocationsPage = () => {
  const { state, dispatch } = useAppContext()
  const { locations, loading, error } = state

  useEffect(() => {
    fetchLocations(dispatch)
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
      <LocationTable data={locations} />
    </>
  )
}

export default LocationsPage
