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
  Flex,
  Divider,
  Tag,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getRole } from '../api/roleApi'

const RoleDrawer = ({ data, isOpen, onClose, ref }) => {
  const { _id, name, createdAt } = data || {}

  const [role, setRole] = useState(null)
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
          const result = await getRole(_id)
          if (result) {
            setRole(result)
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
          Role
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
              <Stack spacing={2}>
                <Container>
                  <Text>Name:</Text>
                  <Text color={'gray.500'}>{name}</Text>
                </Container>
                <Divider />
                <Container>
                  <Text>Role ID:</Text>
                  <Text color={'gray.500'}>{_id}</Text>
                </Container>
                <Divider />
                <Container>
                  <Text>Created:</Text>
                  <Text color={'gray.500'}>
                    {new Date(createdAt).toLocaleDateString()}
                  </Text>
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
                    {role?.privileges?.length > 0 ? (
                      <Flex gap={2} alignItems={'center'}>
                        {role?.privileges?.map((item, index) => (
                          <Tag key={index} size={'sm'} colorScheme='orange'>
                            {item}
                          </Tag>
                        ))}
                      </Flex>
                    ) : (
                      <Text fontSize={'sm'}>Not available</Text>
                    )}
                  </TabPanel>
                  <TabPanel>
                    {role?.features?.length > 0 ? (
                      <Flex gap={2} alignItems={'center'}>
                        {role?.features?.map((item, index) => (
                          <Tag key={index} size={'sm'} colorScheme='teal'>
                            {item?.name}
                          </Tag>
                        ))}
                      </Flex>
                    ) : (
                      <Text fontSize={'sm'}>Not available</Text>
                    )}
                  </TabPanel>
                  <TabPanel>
                    {role?.locations?.length > 0 ? (
                      <Flex gap={2} alignItems={'center'}>
                        {role?.locations?.map((item, index) => (
                          <Tag key={index} size={'sm'} colorScheme='green'>
                            {item?.name}
                          </Tag>
                        ))}
                      </Flex>
                    ) : (
                      <Text fontSize={'sm'}>Not available</Text>
                    )}
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

export default RoleDrawer
