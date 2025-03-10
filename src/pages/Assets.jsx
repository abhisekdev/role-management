import React, { useEffect } from 'react'
import AssetsTable from '../components/AssetTable'
import { fetchAssets } from '../actions/appActions'
import { Card, CardHeader } from '@chakra-ui/react'
import { useAppContext } from '../context/AppContext'

const AssetsPage = () => {
  const { state, dispatch } = useAppContext()
  const { assets, loading, error } = state

  useEffect(() => {
    fetchAssets(dispatch)
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
      <AssetsTable data={assets} />
    </>
  )
}

export default AssetsPage
