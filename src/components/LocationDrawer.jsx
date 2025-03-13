import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Stack,
  Flex,
  Tag,
  Box
} from '@chakra-ui/react'

const LocationDrawer = ({ data, isOpen, onClose, ref }) => {
  const { _id, name, level, children } = data || {}

  return (
    <Drawer
      size={'md'}
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={ref}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton mt={1} />
        <DrawerHeader fontSize={'md'} borderBottom={'1px solid lightgray'}>
          Location
        </DrawerHeader>
        <DrawerBody>
          <Stack mt={2} spacing={5}>
            <Stack spacing={1}>
              <Text>{name}</Text>
              <Flex gap={2} alignItems={'center'}>
                <Tag size={'sm'} colorScheme='blue'>
                  Level {level}
                </Tag>
                <Text fontSize={'sm'} color={'gray.500'}>
                  {_id}
                </Text>
              </Flex>
            </Stack>
            <Stack spacing={1}>
              <Text fontWeight='medium'>Child locations:</Text>
              {children?.length > 0 ? (
                <Stack spacing={0}>
                  {children?.map((item) => (
                    <Stack
                      spacing={1}
                      pl={6}
                      py={2}
                      pos={'relative'}
                      key={item?._id}
                      fontSize={'sm'}
                      borderLeft={'1px solid #CBD5E0'}
                    >
                      <Box
                        pos={'absolute'}
                        top={'50%'}
                        left={'0'}
                        w={'15px'}
                        h={'1px'}
                        bg={'gray.300'}
                      />
                      <Text>{item?.name}</Text>
                      <Flex gap={2} alignItems={'center'}>
                        <Tag size={'sm'} colorScheme='blue'>
                          Level {item?.level}
                        </Tag>
                        <Tag size={'sm'}>{item?.assets?.length} Asset</Tag>
                      </Flex>
                    </Stack>
                  ))}
                </Stack>
              ) : (
                <Text color={'gray.500'}>Not available</Text>
              )}
            </Stack>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default LocationDrawer
