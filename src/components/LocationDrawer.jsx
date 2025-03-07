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
import { getLocation } from '../api/locationApi'

const LocationDrawer = ({ data, isOpen, onClose, ref }) => {
  const { _id, name } = data || {}

  const [location, setLocation] = useState(null)
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
      const fetchLocation = async () => {
        try {
          setLoading(true)
          const result = await getLocation(_id)
          if (result) {
            setLocation(result)
          }
        } catch (error) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }

      fetchLocation()
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
          {name}
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
              <ListItem
                label={'Assets'}
                value={location?.overalldata?.assetsArray}
              />
              <ListItem
                label={'Levels'}
                value={location?.overalldata?.levelunder}
              />
              <ListItem
                label={'Connections'}
                value={location?.overalldata?.childrenArray}
              />
            </Stack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default LocationDrawer
