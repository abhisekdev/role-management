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
import { useEffect } from 'react'
import { FaBoxOpen, FaBurn, FaUsers, FaMap } from 'react-icons/fa'

import {
  fetchAssets,
  fetchFeatures,
  fetchLocations,
  fetchRoles,
  fetchUsers
} from '../actions/appActions'
import { useAppContext } from '../context/AppContext'

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
  const { state, dispatch } = useAppContext()
  const { users, features, locations, assets, loading, error } = state

  useEffect(() => {
    fetchUsers(dispatch)
    fetchFeatures(dispatch)
    fetchLocations(dispatch)
    fetchAssets(dispatch)
    fetchRoles(dispatch)
  }, [dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 1, lg: 4 }}>
      <StatsCard
        title={'Users'}
        stat={users?.length}
        icon={<FaUsers size={'3em'} />}
      />
      <StatsCard
        title={'Features'}
        stat={features?.length}
        icon={<FaBurn size={'3em'} />}
      />
      <StatsCard
        title={'Locations'}
        stat={locations?.length}
        icon={<FaMap size={'3em'} />}
      />
      <StatsCard
        title={'Assets'}
        stat={assets?.length}
        icon={<FaBoxOpen size={'3em'} />}
      />
    </SimpleGrid>
  )
}

export default HomePage
