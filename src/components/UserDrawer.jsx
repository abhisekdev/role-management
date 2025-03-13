import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Stack,
  Alert,
  AlertIcon,
  Avatar,
  Flex,
  Tag,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getUser } from '../api/userApi'

const UserDrawer = ({ data, isOpen, onClose, ref }) => {
  const { _id, username, email, role, createdAt } = data || {}

  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const Container = ({ children }) => {
    return (
      <Flex
        gap={2}
        fontSize={'sm'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}
      >
        {children}
      </Flex>
    )
  }

  useEffect(() => {
    if (_id && isOpen) {
      const fetchRoles = async () => {
        try {
          setLoading(true)
          const result = await getUser(_id)
          if (result) {
            setUser(result)
          }
        } catch (error) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }

      fetchRoles()
    }
  }, [_id, isOpen])

  return (
    <Drawer
      size={'md'}
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={ref}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton mt={1} />
        <DrawerHeader fontSize={'md'} borderBottom={'1px solid lightgray'}>
          User
        </DrawerHeader>
        <DrawerBody>
          {error && (
            <Alert status='error'>
              <AlertIcon />
              {error}
            </Alert>
          )}
          {loading ? (
            <Text mt={2}>Loading...</Text>
          ) : (
            <Stack mt={2} spacing={6}>
              <Flex gap={3} fontSize={'sm'} alignItems={'center'}>
                <Avatar size={'sm'} name={username || 'Test'} />
                <Stack spacing={0}>
                  <Text>{username}</Text>
                  <Text color={'gray.500'}>{email}</Text>
                </Stack>
              </Flex>
              <Stack spacing={2}>
                <Container>
                  <Text>User ID:</Text>
                  <Text color={'gray.500'}>{_id}</Text>
                </Container>
                <Divider />
                <Container>
                  <Text>Created:</Text>
                  <Text color={'gray.500'}>
                    {new Date(createdAt).toLocaleDateString()}
                  </Text>
                </Container>
                <Divider />
                <Container>
                  <Text>Role:</Text>
                  <Tag size={'sm'} colorScheme={'blue'}>
                    {role?.name || 'N/A'}
                  </Tag>
                </Container>
              </Stack>
              <Tabs variant='enclosed'>
                <TabList>
                  {['Privileges', 'Features', 'Locations']?.map(
                    (item, index) => (
                      <Tab key={index} fontSize={'sm'}>
                        {item}
                      </Tab>
                    )
                  )}
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Tag size={'sm'} colorScheme='orange'>
                      {user?.role?.privileges?.join(', ') || 'N/A'}
                    </Tag>
                  </TabPanel>
                  <TabPanel>
                    <Tag size={'sm'} colorScheme='teal'>
                      {user?.role?.features
                        ?.map((item) => item?.name)
                        ?.join(', ') || 'N/A'}
                    </Tag>
                  </TabPanel>
                  <TabPanel>
                    <Tag size={'sm'} colorScheme='green'>
                      {user?.role?.locations?.join(', ') || 'N/A'}
                    </Tag>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default UserDrawer
