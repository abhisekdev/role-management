import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiMenu,
  FiBell,
  FiUser,
  FiPenTool
} from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

const LinkItems = [
  { name: 'Home', icon: FiHome, link: '/admin/home' },
  { name: 'Roles', icon: FiPenTool, link: '/admin/roles' },
  { name: 'Users', icon: FiUser, link: '/admin/users' },
  { name: 'Features', icon: FiTrendingUp, link: '/admin/features' },
  { name: 'Locations', icon: FiCompass, link: '/admin/locations' },
  { name: 'Assets', icon: FiStar, link: '/admin/assets' }
]

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='lg' fontWeight='semibold'>
          Role Management
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Stack spacing={1}>
        {LinkItems.map((item) => (
          <NavItem
            key={item.name}
            onClose={onClose}
            icon={item.icon}
            link={item?.link}
          >
            {item.name}
          </NavItem>
        ))}
      </Stack>
    </Box>
  )
}

const NavItem = ({ icon, onClose, link, children, ...rest }) => {
  const location = useLocation()
  const { pathname } = location

  const isActive = pathname === link

  return (
    <Link to={link} onClick={onClose}>
      <Flex
        align='center'
        px='4'
        py={'3'}
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{ bg: isActive ? 'blue.500' : 'gray.100' }}
        color={isActive ? 'gray.100' : 'inherit'}
        bg={isActive ? 'blue.500' : 'inherit'}
        {...rest}
      >
        {icon && <Icon mr='4' fontSize='16' as={icon} />}
        <Text fontSize={14}>{children}</Text>
      </Flex>
    </Link>
  )
}

const MobileNav = ({ onOpen, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    Cookies.remove('token')
    localStorage.clear()
    window.location.href = '/auth/login'
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <Flex gap={5} alignItems={'center'}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant='outline'
          aria-label='open menu'
          icon={<FiMenu />}
        />

        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize='lg'
          fontWeight='semibold'
        >
          Role Management
        </Text>
      </Flex>

      <Flex gap={5} alignItems={'center'}>
        <IconButton hidden size={'sm'} icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <Flex gap={2} alignItems={'center'}>
                <Text
                  hidden
                  fontSize='sm'
                  display={{ base: 'none', md: 'block' }}
                >
                  {user?.name || 'Test'}
                </Text>
                <Avatar size={'sm'} name={user?.name || 'Test'} />
              </Flex>
            </MenuButton>
            <MenuList
              fontSize={'sm'}
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem as={Stack} spacing={0} alignItems={'flex-start'}>
                <Text>{user?.name || ''}</Text>
                <Text color={'gray.500'}>{user?.email || ''}</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  )
}

const SidebarWithHeader = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box>
    </Box>
  )
}

export default SidebarWithHeader
