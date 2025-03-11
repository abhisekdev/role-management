import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue
} from '@chakra-ui/react'
import { FaBoxOpen, FaBurn, FaUsers, FaMap } from 'react-icons/fa'

import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer
} from 'recharts'
import UserTable from '../components/UserTable'
import LocationTable from '../components/LocationTable'

const lineData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 800 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 1200 },
  { name: 'May', value: 900 },
  { name: 'Jun', value: 1400 }
]

const pieData = [
  { name: 'A', value: 40 },
  { name: 'B', value: 30 },
  { name: 'C', value: 20 },
  { name: 'D', value: 10 }
]

const barData = [
  { name: 'Jan', value: 300 },
  { name: 'Feb', value: 700 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 1100 },
  { name: 'May', value: 800 },
  { name: 'Jun', value: 1300 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const StatsCard = (props) => {
  const { title, stat, icon, link } = props

  return (
    <Card>
      <Stat px={{ base: 2, md: 4 }} py={'5'} rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <Link to={link}>
              <StatLabel fontWeight={'medium'} isTruncated>
                {title}
              </StatLabel>
            </Link>
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
  const { state } = useAppContext()
  const { users, features, locations, assets, loading, error } = state

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
    <Stack spacing={{ base: 3, lg: 4 }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        spacing={{ base: 3, lg: 4 }}
      >
        <StatsCard
          title={'Users'}
          link='/admin/users'
          stat={users?.length}
          icon={<FaUsers size={'3em'} />}
        />
        <StatsCard
          title={'Features'}
          link='/admin/features'
          stat={features?.length}
          icon={<FaBurn size={'3em'} />}
        />
        <StatsCard
          title={'Locations'}
          link='/admin/locations'
          stat={locations?.length}
          icon={<FaMap size={'3em'} />}
        />
        <StatsCard
          title={'Assets'}
          link='/admin/assets'
          stat={assets?.length}
          icon={<FaBoxOpen size={'3em'} />}
        />
      </SimpleGrid>
      <SimpleGrid hidden columns={{ base: 1, md: 1, lg: 3 }} spacing={6}>
        <Card>
          <CardHeader as={Heading} size='sm' fontFamily={'inherit'}>
            Features
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='value'
                  stroke='#3182CE'
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
        <Card>
          <CardHeader as={Heading} size='sm' fontFamily={'inherit'}>
            Locations
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  fill='#8884d8'
                  dataKey='value'
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
        {/* Bar Chart */}
        <Card>
          <CardHeader as={Heading} size='sm' fontFamily={'inherit'}>
            Assets
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='value' fill='#82ca9d' />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 1, lg: 2 }}
        spacing={{ base: 3, lg: 4 }}
      >
        <UserTable data={users} />
        <LocationTable data={locations} />
      </SimpleGrid>
    </Stack>
  )
}

export default HomePage
