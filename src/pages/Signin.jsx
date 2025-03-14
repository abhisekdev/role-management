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
import bg from '../assets/bg.jpeg'

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
      const data = await login({
        email: formData?.email,
        password: formData?.password
      })
      if (data?.message) {
        setError(data?.message)
      } else if (data?.token) {
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
          <Heading fontSize={'2xl'}>
            Sign in to your account <br /> {'(Super Admin)'}
          </Heading>
          <Spacer />
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} w={'100%'}>
              {error && (
                <Alert status='error' fontSize={'sm'}>
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              {/* <FormControl id='username' isRequired>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input
                  type='text'
                  name='username'
                  value={formData?.username}
                  onChange={handleChange}
                />
              </FormControl> */}
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
                    placeholder='*******'
                    onChange={handleChange}
                    value={formData?.password}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement
                    cursor={'pointer'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
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
      <Flex flex={1} h={'100vh'} display={{ base: 'none', md: 'flex' }}>
        <Image
          width={'100%'}
          alt={'Login Image'}
          objectFit={'cover'}
          src={bg}
        />
      </Flex>
    </Stack>
  )
}

export default Signin
