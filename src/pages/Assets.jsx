import React, { useEffect, useState } from 'react'
import { getAssets } from '../api/assetApi'
import AssetsTable from '../components/AssetTable'

const AssetsPage = () => {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAssets()
        setAssets(data)
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
      <AssetsTable data={assets} setUsers={setAssets} />
    </>
  )
}

export default AssetsPage
