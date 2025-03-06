import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Select,
  Alert,
  AlertIcon,
  useToast,
  Textarea
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { fetchAssets } from '../actions/appActions'
import { useAppContext } from '../context/AppContext'
import { createAssets, updateAssets } from '../api/assetApi'

const AssetModal = ({ data, isOpen, onClose }) => {
  const toast = useToast()
  const { state, dispatch } = useAppContext()
  const { locations } = state || {}

  const { _id } = data || {}

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    locationId: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreate = async () => {
    try {
      setLoading(true)
      const data = await createAssets(formData)
      if (data?.name) {
        await fetchAssets(dispatch)
        toast({
          position: 'bottom-right',
          title: 'Asset created successfully',
          description: "We've created a new asset",
          status: 'success',
          duration: 9000,
          isClosable: true
        })
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
      onClose()
    }
  }

  const handleUpdate = async () => {
    try {
      setLoading(true)
      const data = await updateAssets({ assetId: _id, ...formData })
      if (data?.name) {
        await fetchAssets(dispatch)
        toast({
          position: 'bottom-right',
          title: 'Asset updated successfully',
          description: "We've updates the asset",
          status: 'success',
          duration: 9000,
          isClosable: true
        })
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
      onClose()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (data) {
      handleUpdate()
    } else {
      handleCreate()
    }
  }

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        name: data?.name,
        description: data?.description,
        locationId: data?.location?._id
      }))
    }
  }, [data])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Add Asset</ModalHeader>
          <ModalCloseButton mt={2} />
          <ModalBody>
            <Stack spacing={4}>
              {error && (
                <Alert status='error'>
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <FormControl isRequired>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input
                  name='name'
                  value={formData?.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='description'>Description</FormLabel>
                <Textarea
                  rows={4}
                  name='description'
                  value={formData?.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='locationId'>Location</FormLabel>
                <Select
                  name='locationId'
                  value={formData?.locationId}
                  onChange={handleChange}
                >
                  <option value=''>-- Select --</option>
                  {locations?.map((item) => (
                    <option key={item?._id} value={item?._id}>
                      {item?.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button variant='ghost' onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit' colorScheme='blue' isLoading={loading}>
                {data ? 'Update' : 'Save'}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AssetModal
