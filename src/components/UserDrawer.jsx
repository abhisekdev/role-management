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
  AlertIcon
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getUser } from '../api/userApi'

const UserDrawer = ({ data, isOpen, onClose, ref }) => {
  const { _id, username } = data || {}

  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const ListItem = ({ label, value }) => {
    return (
      <Stack spacing={0}>
        <Text fontWeight={'medium'}>{label}</Text>
        <Text color={'gray.800'}>{value?.join(', ') || 'Not available'}</Text>
      </Stack>
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
          {username}
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
            <Stack mt={2} spacing={5}>
              <ListItem label={'Privileges'} value={user?.role?.privileges} />
              <ListItem
                label={'Features'}
                value={user?.role?.features?.map((item) => item?.name)}
              />
              <ListItem
                label={'Locations'}
                value={user?.role?.locations?.map((item) => item?.name)}
              />
            </Stack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default UserDrawer
