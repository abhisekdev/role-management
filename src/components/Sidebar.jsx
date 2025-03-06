import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
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
  FiUser
} from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

const LinkItems = [
  { name: 'Home', icon: FiHome, link: '/admin/home' },
  { name: 'Users', icon: FiUser, link: '/admin/users' },
  { name: 'Features', icon: FiTrendingUp, link: '/admin/features' },
  { name: 'Locations', icon: FiCompass, link: '/admin/locations' },
  { name: 'Assets', icon: FiStar, link: '/admin/assets' },
  { name: 'Roles', icon: FiStar, link: '/admin/roles' }
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
        <Text fontSize='xl' fontFamily='monospace' fontWeight='bold'>
          Role Management
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Stack spacing={1}>
        {LinkItems.map((item) => (
          <NavItem key={item.name} icon={item.icon} link={item?.link}>
            {item.name}
          </NavItem>
        ))}
      </Stack>
    </Box>
  )
}

const NavItem = ({ icon, link, children, ...rest }) => {
  const location = useLocation()
  const { pathname } = location

  const isActive = pathname === link

  return (
    <Link to={link}>
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
          fontFamily='monospace'
          fontWeight='bold'
        >
          Role Management
        </Text>
      </Flex>

      <Flex gap={5} alignItems={'center'}>
        <IconButton icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Text
                  hidden
                  fontSize='sm'
                  display={{ base: 'none', md: 'block' }}
                >
                  Abhisek
                </Text>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </HStack>
            </MenuButton>
            <MenuList
              fontSize={'sm'}
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <Link to={'/auth/login'}>
                <MenuItem>Sign out</MenuItem>
              </Link>
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
