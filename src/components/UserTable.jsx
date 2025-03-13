import React, { useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Portal,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { LuArrowUpDown, LuCheck, LuFilter } from 'react-icons/lu'
import { FaEllipsis, FaPlus } from 'react-icons/fa6'
import UserModal from './UserModal'
import DeleteModal from './DeleteModal'
import { deleteUser } from '../api/userApi'
import { fetchUsers } from '../actions/appActions'
import { useAppContext } from '../context/AppContext'
import UserDrawer from './UserDrawer'
import { useLocation } from 'react-router-dom'

const UserTable = ({ data }) => {
  const toast = useToast()
  const location = useLocation()
  const { state, dispatch } = useAppContext()
  const { roles } = state || {}
  const user = JSON.parse(localStorage.getItem('user'))

  const [sorting, setSorting] = React.useState([
    {
      id: 'createdAt',
      desc: true
    }
  ])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [activeRow, setActiveRow] = React.useState(null)
  const [columnFilters, setColumnFilters] = React.useState([])

  const VIEW = useDisclosure()
  const EDIT = useDisclosure()
  const DELETE = useDisclosure()

  const filterRoles = columnFilters.find((f) => f.id === 'role')?.value || []

  const onFilterRole = (value) => {
    setColumnFilters((prev) => {
      const roles = prev.find((filter) => filter?.id === 'role')?.value
      if (!roles) {
        return prev.concat({
          id: 'role',
          value: [value]
        })
      }

      return prev.map((f) =>
        f.id === 'role'
          ? {
              ...f,
              value: filterRoles.includes(value)
                ? roles.filter((s) => s !== value)
                : roles.concat(value)
            }
          : f
      )
    })
  }

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'username',
        header: ({ column }) => {
          return (
            <Flex
              gap={2}
              cursor={'pointer'}
              onClick={() => column.toggleSorting()}
            >
              <Text>Username</Text>
              <LuArrowUpDown />
            </Flex>
          )
        }
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Role',
        accessorKey: 'role',
        cell: ({ getValue }) => (
          <Text w={{ base: '200px', md: 'auto' }}>
            {getValue()?.name || 'N/A'}
          </Text>
        ),
        enableColumnFilter: true,
        filterFn: (row, columnId, filterRoles) => {
          if (filterRoles.length === 0) return true
          const role = row.getValue(columnId)
          return filterRoles.includes(role?.name)
        }
      },
      {
        header: 'Privileges',
        accessorKey: 'role.privileges',
        cell: ({ getValue }) => (
          <Text w={{ base: '140px', md: 'auto' }}>
            {getValue()?.join(', ') || 'N/A'}
          </Text>
        )
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
        meta: {
          align: 'right'
        }
      },
      {
        accessorKey: 'actions',
        header: () => 'Action',
        cell: ({ row }) => {
          const handleEdit = () => {
            setActiveRow(row?.original)
            EDIT.onOpen()
          }
          const handleView = () => {
            setActiveRow(row?.original)
            VIEW.onOpen()
          }
          const handleDelete = () => {
            setActiveRow(row?.original)
            DELETE.onOpen()
          }
          return (
            <Flex justifyContent={'flex-end'}>
              <Menu>
                <MenuButton
                  size={'sm'}
                  variant='none'
                  as={IconButton}
                  icon={<FaEllipsis />}
                />
                <Portal>
                  <MenuList>
                    <MenuItem fontSize='sm' onClick={handleView}>
                      View
                    </MenuItem>
                    <MenuItem fontSize='sm' onClick={handleEdit}>
                      Edit
                    </MenuItem>
                    <MenuItem
                      fontSize='sm'
                      color={'red.500'}
                      onClick={handleDelete}
                      hidden={row?.original?._id === user?.id}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Flex>
          )
        },
        meta: {
          align: 'right'
        }
      }
    ],
    [DELETE, EDIT, VIEW, user?.id]
  )

  // Initialize the table
  const table = useReactTable({
    data,
    columns,
    enableSorting: true,
    initialState: {
      pagination: {
        pageSize: 20
      },
      columnVisibility: {
        username: location?.pathname === '/admin/home' ? false : true,
        actions: location?.pathname === '/admin/home' ? false : true
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  })

  const handleCreate = () => {
    setActiveRow(null)
    EDIT.onOpen()
  }

  const handleConfirm = async () => {
    try {
      setLoading(true)
      const data = await deleteUser(activeRow?._id)
      if (data?.message) {
        setError(data?.message)
      } else {
        await fetchUsers(dispatch)
        toast({
          position: 'bottom-right',
          title: 'User deleted successfully',
          description: "We've deleted the user",
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        DELETE.onClose()
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card w={'100%'} overflow={'hidden'}>
        <CardHeader
          as={Flex}
          gap={2}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Heading
            size={'sm'}
            fontFamily={'inherit'}
            hidden={location?.pathname === '/admin/users'}
          >
            Recent User List
          </Heading>
          <Flex gap={2} alignItems={'center'}>
            <Input
              w={{ base: '250px', md: '300px' }}
              placeholder='Search name...'
              hidden={location?.pathname === '/admin/home'}
              value={table?.getColumn('username')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table.getColumn('username')?.setFilterValue(event.target.value)
              }
            />
            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                fontSize={'sm'}
                colorScheme='blue'
                fontWeight={'normal'}
                leftIcon={<LuFilter />}
                hidden={true}
              >
                Role
              </MenuButton>
              <Portal>
                <MenuList minWidth='240px'>
                  {roles?.map((item) => (
                    <MenuItem
                      fontSize={'sm'}
                      key={item?._id}
                      value={item?.name}
                    >
                      <Checkbox
                        size={'sm'}
                        isChecked={filterRoles.includes(item?.name)}
                        onChange={() => onFilterRole(item?.name)}
                      >
                        {item?.name}
                      </Checkbox>
                    </MenuItem>
                  ))}
                </MenuList>
              </Portal>
            </Menu>
          </Flex>
          <Tooltip label='Add New User' placement='left'>
            <IconButton
              colorScheme='blue'
              icon={<FaPlus />}
              onClick={handleCreate}
              hidden={location?.pathname === '/admin/home'}
            />
          </Tooltip>
        </CardHeader>

        {/* Table */}
        <CardBody overflowX={{ base: 'scroll', md: 'auto' }}>
          <Table>
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th
                        minW={'160px'}
                        key={header.id}
                        fontFamily={'inherit'}
                        style={{
                          textAlign: header?.column?.columnDef?.meta?.align
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </Th>
                    )
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <Tr
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <Td
                        key={cell.id}
                        fontSize={'sm'}
                        style={{
                          textAlign: cell.column.columnDef.meta?.align
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td py={'6'} colSpan={columns.length} textAlign={'center'}>
                    There is no record to display
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </CardBody>

        {/* Pagination Controls */}
        <CardFooter
          as={Flex}
          gap={2}
          w={'100%'}
          alignItems={'center'}
          justifyContent={'space-between'}
          hidden={location?.pathname === '/admin/home'}
        >
          <Flex gap={2} alignItems={'center'}>
            <Button
              fontWeight={'normal'}
              variant={'solid'}
              colorScheme='blue'
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
            >
              Prev
            </Button>
            <Button
              fontWeight={'normal'}
              variant={'solid'}
              colorScheme='blue'
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </Flex>
          <Flex alignItems={'center'}>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </Flex>
        </CardFooter>
      </Card>

      {EDIT.isOpen && (
        <UserModal
          data={activeRow}
          isOpen={EDIT.isOpen}
          onClose={EDIT.onClose}
        />
      )}

      {DELETE.isOpen && (
        <DeleteModal
          error={error}
          loading={loading}
          title='Delete User'
          isOpen={DELETE.isOpen}
          onClose={DELETE.onClose}
          onConfirm={handleConfirm}
          description='Are you sure you want to delete this user? This action cannot be undone.'
        />
      )}

      {VIEW.isOpen && (
        <UserDrawer
          data={activeRow}
          isOpen={VIEW.isOpen}
          onClose={VIEW.onClose}
        />
      )}
    </>
  )
}

export default UserTable
