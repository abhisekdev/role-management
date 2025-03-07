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
  useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchRoles } from '../actions/appActions'
import { useAppContext } from '../context/AppContext'
import ReactSelect from 'react-select'
import { useSelect } from '../hooks/useSelect'
import { createRoles, updateRoles } from '../api/roleApi'

const RoleModal = ({ data, isOpen, onClose }) => {
  const toast = useToast()
  const { style } = useSelect()
  const { state, dispatch } = useAppContext()
  const { features, locations } = state || {}

  const { _id } = data || {}

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [featureItems, setFeatureItems] = useState([])
  const [privilegesItems, setPrivilegesItems] = useState([])
  const [locationItems, setLocationItems] = useState([])
  const [name, setName] = useState('')

  const featureOptions = features?.map((item) => ({
    value: item?._id,
    label: item?.name
  }))
  const locationOptions = locations?.map((item) => ({
    value: item?._id,
    label: item?.name
  }))
  const previlgeOptions = [
    { label: 'SuperUser', value: 'SuperUser' },
    { label: 'User', value: 'User' },
    { label: 'Admin', value: 'Admin' }
  ]

  const handleChange = (e) => {
    setName(e.target.value)
    setError('')
  }

  const onSelectFeature = (value) => {
    setFeatureItems(value)
  }

  const onSelectPrevilege = (value) => {
    setPrivilegesItems(value)
  }

  const onSelectLocation = (value) => {
    setLocationItems(value)
  }

  const handleCreate = async () => {
    try {
      setLoading(true)
      const features = featureItems?.map((item) => item?.value)
      const privileges = privilegesItems?.map((item) => item?.value)
      const locations = locationItems?.map((item) => item?.value)
      const data = await createRoles({
        name,
        features,
        privileges,
        locations
      })
      if (data) {
        await fetchRoles(dispatch)
        toast({
          position: 'bottom-right',
          title: 'Role created successfully',
          description: "We've created a new role",
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
      const features = featureItems?.map((item) => item?.value)
      const privileges = privilegesItems?.map((item) => item?.value)
      const locations = locationItems?.map((item) => item?.value)
      const data = await updateRoles({
        roleId: _id,
        name,
        features,
        privileges,
        locations
      })
      if (data) {
        await fetchRoles(dispatch)
        toast({
          position: 'bottom-right',
          title: 'Role updated successfully',
          description: "We've updates the role",
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
      setName(data?.name)
      const filterAssets = featureOptions?.filter((item) =>
        data?.features?.find((asset) => asset === item?.value)
      )
      setFeatureItems(filterAssets)
      const filterPrevileges = previlgeOptions?.filter((item) =>
        data?.privileges?.find((asset) => asset === item?.value)
      )
      setPrivilegesItems(filterPrevileges)
      const filterLocations = locationOptions?.filter((item) =>
        data?.locations?.find((location) => location?._id === item?.value)
      )
      setLocationItems(filterLocations)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Add Role</ModalHeader>
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
                  maxLength={20}
                  value={name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='features'>Features</FormLabel>
                <ReactSelect
                  name='features'
                  isMulti={true}
                  styles={style}
                  value={featureItems}
                  isClearable={true}
                  isSearchable={true}
                  options={featureOptions}
                  onChange={onSelectFeature}
                  placeholder={'-- Select --'}
                  components={{
                    ClearIndicator: () => null,
                    IndicatorSeparator: () => null
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='privileges'>Privileges</FormLabel>
                <ReactSelect
                  name='privileges'
                  isMulti={true}
                  styles={style}
                  value={privilegesItems}
                  isClearable={true}
                  isSearchable={true}
                  options={previlgeOptions}
                  onChange={onSelectPrevilege}
                  placeholder={'-- Select --'}
                  components={{
                    ClearIndicator: () => null,
                    IndicatorSeparator: () => null
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='locations'>Locations</FormLabel>
                <ReactSelect
                  name='locations'
                  isMulti={true}
                  styles={style}
                  value={locationItems}
                  isClearable={true}
                  isSearchable={true}
                  options={locationOptions}
                  onChange={onSelectLocation}
                  placeholder={'-- Select --'}
                  components={{
                    ClearIndicator: () => null,
                    IndicatorSeparator: () => null
                  }}
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

export default RoleModal
