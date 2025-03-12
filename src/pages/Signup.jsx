import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Image,
  Spacer,
  useToast,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { register } from '../api/authApi'
import bg from '../assets/bg.jpeg'

const Signup = () => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = await register({ ...formData })
      if (data?.message) {
        toast({
          position: 'bottom-right',
          title: 'Registration Successful',
          description: 'Your account has been created successfully!',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        window.location.href = '/auth/login'
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1} h={'100vh'} display={{ base: 'none', md: 'flex' }}>
        <Image
          src={bg}
          width={'100%'}
          alt={'Login Image'}
          objectFit={'cover'}
        />
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign up to your account</Heading>
          <Spacer />
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} w={'100%'}>
              {error && (
                <Alert status='error'>
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <FormControl id='username' isRequired>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input
                  type='text'
                  name='username'
                  value={formData?.username}
                  onChange={handleChange}
                  placeholder='anikanaik'
                />
              </FormControl>
              <FormControl id='email' isRequired>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input
                  type='email'
                  name='email'
                  value={formData?.email}
                  onChange={handleChange}
                  placeholder='abc@example.com'
                />
              </FormControl>
              <FormControl id='password' isRequired>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup>
                  <Input
                    name='password'
                    onChange={handleChange}
                    value={formData?.password}
                    placeholder='**********'
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type='submit'
                  colorScheme='blue'
                  isLoading={loading}
                  loadingText='Submitting'
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </form>
          <Flex mt={4} gap={2} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={'sm'}>{`Already a user ?`}</Text>
            <Link to={`/auth/login`}>
              <Text fontSize='sm' color={'blue.500'}>
                Login
              </Text>
            </Link>
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  )
}

export default Signup
