import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react'

const DeleteModal = ({
  isOpen,
  error,
  loading,
  onClose,
  onConfirm,
  title = 'Delete Item',
  description = 'Are you sure you want to delete this item? This action cannot be undone.'
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            {error && (
              <Alert status='error' fontSize={'sm'}>
                <AlertIcon />
                {error}
              </Alert>
            )}
            <Text>{description}</Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant='ghost'>
            Cancel
          </Button>
          <Button
            ml={3}
            colorScheme='red'
            onClick={onConfirm}
            isLoading={loading}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal
