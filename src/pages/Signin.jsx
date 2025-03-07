import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Spacer,
  useToast,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { login } from '../api/authApi'

const Signin = () => {
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
      const data = await login({ ...formData })
      if (data?.token) {
        Cookies.set('token', data?.token, { expires: 7 })
        localStorage.setItem('user', JSON.stringify(data?.user))
        toast({
          position: 'bottom-right',
          title: 'Login Successful',
          description: 'Welcome back! You have successfully logged in.',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        window.location.href = '/admin/home'
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
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
                />
              </FormControl>
              <FormControl id='email' isRequired>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input
                  type='email'
                  name='email'
                  value={formData?.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id='password' isRequired>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup>
                  <Input
                    name='password'
                    onChange={handleChange}
                    value={formData?.password}
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
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
          <Flex
            hidden
            mt={4}
            gap={2}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Text fontSize={'sm'}>{`Don't have an account ?`}</Text>
            <Link to={`/auth/register`}>
              <Text fontSize='sm' color={'blue.500'}>
                Register
              </Text>
            </Link>
          </Flex>
        </Stack>
      </Flex>
      <Flex flex={1} display={{ base: 'none', md: 'flex' }}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  )
}

export default Signin
