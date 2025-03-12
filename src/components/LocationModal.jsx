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
import { fetchLocations } from '../actions/appActions'
import { useAppContext } from '../context/AppContext'
import ReactSelect from 'react-select'
import { useSelect } from '../hooks/useSelect'
import {
  createLocations,
  getParentLocations,
  updateLocations
} from '../api/locationApi'

const LocationModal = ({ data, isOpen, onClose }) => {
  const toast = useToast()
  const { style } = useSelect()
  const { state, dispatch } = useAppContext()
  const { assets } = state || {}

  const { _id } = data || {}

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [locations, setLocations] = useState([])
  const [assetItems, setAssetItems] = useState([])
  const [formData, setFormData] = useState({
    name: null,
    level: null,
    parentId: null
  })

  const assetOptions = assets?.map((item) => ({
    value: item?._id,
    label: item?.name
  }))

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value || null }))
    setError(null)
  }

  const onSelectAsset = (value) => {
    setAssetItems(value)
    setError(null)
  }

  const handleCreate = async () => {
    try {
      setLoading(true)
      const assets = assetItems?.map((item) => item?.value)
      const data = await createLocations({ ...formData, assets: assets })
      if (data?.message) {
        setError(data?.message)
      } else {
        await fetchLocations(dispatch)
        toast({
          position: 'bottom-right',
          title: 'Location created successfully',
          description: "We've created a new location",
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        onClose()
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    try {
      setLoading(true)
      const assets = assetItems?.map((item) => item?.value)
      const data = await updateLocations({
        locationId: _id,
        ...formData,
        assets
      })
      if (data?.message) {
        setError(data?.message)
      } else {
        await fetchLocations(dispatch)
        toast({
          position: 'bottom-right',
          title: 'Location updated successfully',
          description: "We've updates the location",
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        onClose()
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
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
      const fetchParentLocations = async () => {
        const res = await getParentLocations(data?._id)
        res && setLocations(res)
      }
      fetchParentLocations()
      setFormData((prev) => ({
        ...prev,
        name: data?.name,
        level: data?.level,
        parentId: data?.parent?._id
      }))
      const filterAssets = assetOptions?.filter((item) =>
        data?.assets?.find((asset) => asset === item?.value)
      )
      setAssetItems(filterAssets)
    } else {
      setLocations(state?.locations)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Add Location</ModalHeader>
          <ModalCloseButton mt={2} />
          <ModalBody>
            <Stack spacing={4}>
              {error && (
                <Alert status='error' fontSize={'sm'}>
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
                <FormLabel htmlFor='level'>Level</FormLabel>
                <Select
                  name='level'
                  value={formData?.level}
                  onChange={handleChange}
                >
                  <option value=''>-- Select --</option>
                  {[1, 2, 3, 4, 5]?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='parentId'>Parent</FormLabel>
                <Select
                  name='parentId'
                  value={formData?.parentId}
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
              <FormControl>
                <FormLabel htmlFor='assets'>Assets</FormLabel>
                <ReactSelect
                  name='assets'
                  isMulti={true}
                  styles={style}
                  value={assetItems}
                  isClearable={true}
                  isSearchable={true}
                  options={assetOptions}
                  onChange={onSelectAsset}
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

export default LocationModal
