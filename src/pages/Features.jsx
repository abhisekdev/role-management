import React, { useEffect, useState } from 'react'
import FeatureTable from '../components/FeatureTable'
import { getFeatures } from '../api/featureApi'

const FeaturesPage = () => {
  const [features, setFeatures] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getFeatures()
        setFeatures(data)
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
      <FeatureTable data={features} setUsers={setFeatures} />
    </>
  )
}

export default FeaturesPage
