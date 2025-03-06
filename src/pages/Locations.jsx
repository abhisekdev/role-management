import React, { useEffect, useState } from 'react'
import FeatureTable from '../components/FeatureTable'
import { getLocations } from '../api/locationApi'
import LocationTable from '../components/LocationTable'

const LocationsPage = () => {
  const [loactions, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getLocations()
        setLocations(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <LocationTable data={loactions} setUsers={setLocations} />
    </>
  )
}

export default LocationsPage
