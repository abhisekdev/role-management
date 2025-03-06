import React, { useEffect } from 'react'
import FeatureTable from '../components/FeatureTable'
import { useAppContext } from '../context/AppContext'
import { fetchFeatures } from '../actions/appActions'
import { Card, CardHeader } from '@chakra-ui/react'

const FeaturesPage = () => {
  const { state, dispatch } = useAppContext()
  const { features, loading, error } = state

  useEffect(() => {
    fetchFeatures(dispatch)
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
      <FeatureTable data={features} />
    </>
  )
}

export default FeaturesPage
