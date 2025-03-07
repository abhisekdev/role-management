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
  useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { createUser, updateUser } from '../api/userApi'
import { fetchUsers } from '../actions/appActions'
import { useAppContext } from '../context/AppContext'

const UserModal = ({ data, isOpen, onClose }) => {
  const toast = useToast()
  const { state, dispatch } = useAppContext()
  const { roles } = state || {}
  const { _id } = data || {}

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    roleId: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreate = async () => {
    try {
      setLoading(true)
      const data = await createUser(formData)
      if (data) {
        await fetchUsers(dispatch)
        toast({
          position: 'bottom-right',
          title: 'User created successfully',
          description: "We've created a new user",
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
      const data = await updateUser({ userId: _id, ...formData })
      if (data) {
        await fetchUsers(dispatch)
        toast({
          position: 'bottom-right',
          title: 'User updated successfully',
          description: "We've updates the user",
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
        username: data?.username,
        email: data?.email,
        roleId: data?.role?._id
      }))
    }
  }, [data])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Add User</ModalHeader>
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
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input
                  name='username'
                  value={formData?.username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                  name='email'
                  value={formData?.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='roleId'>Role</FormLabel>
                <Select
                  name='roleId'
                  value={formData?.roleId}
                  onChange={handleChange}
                >
                  <option value=''>-- Select --</option>
                  {roles?.map((item) => (
                    <option key={item?.id} value={item?.id}>
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

export default UserModal
