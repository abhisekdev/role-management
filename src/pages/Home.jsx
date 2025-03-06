import {
  Box,
  Card,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaBoxOpen, FaBurn, FaUsers, FaMap } from 'react-icons/fa'
import { getUsers } from '../api/userApi'
import { getFeatures } from '../api/featureApi'
import { getLocations } from '../api/locationApi'
import { getAssets } from '../api/assetApi'

const StatsCard = (props) => {
  const { title, stat, icon } = props
  return (
    <Card>
      <Stat px={{ base: 2, md: 4 }} py={'5'} rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.400', 'gray.200')}
            alignContent={'center'}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    </Card>
  )
}

const HomePage = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalFeatures, setTotalFeatures] = useState(0)
  const [totalLocations, setTotalLocations] = useState(0)
  const [totalAssets, setTotalAssets] = useState(0)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const users = await getUsers()
        setTotalUsers(users?.length)
        const features = await getFeatures()
        setTotalFeatures(features?.length)
        const locations = await getLocations()
        setTotalLocations(locations?.length)
        const assets = await getAssets()
        setTotalAssets(assets?.length)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 1, lg: 4 }}>
      <StatsCard
        title={'Users'}
        stat={totalUsers}
        icon={<FaUsers size={'3em'} />}
      />
      <StatsCard
        title={'Features'}
        stat={totalFeatures}
        icon={<FaBurn size={'3em'} />}
      />
      <StatsCard
        title={'Locations'}
        stat={totalLocations}
        icon={<FaMap size={'3em'} />}
      />
      <StatsCard
        title={'Assets'}
        stat={totalAssets}
        icon={<FaBoxOpen size={'3em'} />}
      />
    </SimpleGrid>
  )
}

export default HomePage
