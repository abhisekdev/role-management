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
  Alert,
  AlertIcon,
  useToast,
  Textarea
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchFeatures } from '../actions/appActions'
import { useAppContext } from '../context/AppContext'
import { createFeatures, updateFeatures } from '../api/featureApi'

const FeatureModal = ({ data, isOpen, onClose }) => {
  const toast = useToast()
  const { dispatch } = useAppContext()
  const { _id } = data || {}

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreate = async () => {
    try {
      setLoading(true)
      const data = await createFeatures(formData)
      if (data) {
        await fetchFeatures(dispatch)
        toast({
          position: 'bottom-right',
          title: 'Feature created successfully',
          description: "We've created a new feature",
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
      const data = await updateFeatures({ id: _id, ...formData })
      if (data) {
        await fetchFeatures(dispatch)
        toast({
          position: 'bottom-right',
          title: 'Feature updated successfully',
          description: "We've updates the feature",
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
        description: data?.description
      }))
    }
  }, [data])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Add Feature</ModalHeader>
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
                  maxLength={50}
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

export default FeatureModal
