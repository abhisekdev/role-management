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
  Flex,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { LuArrowUpDown } from 'react-icons/lu'
import { FaEllipsis, FaPlus } from 'react-icons/fa6'
import LocationModal from './LocationModal'
import { useAppContext } from '../context/AppContext'
import DeleteModal from './DeleteModal'
import { fetchLocations } from '../actions/appActions'
import { deleteLocations } from '../api/locationApi'
import LocationDrawer from './LocationDrawer'
import { useLocation } from 'react-router-dom'

const LocationTable = ({ data }) => {
  const toast = useToast()
  const location = useLocation()
  const { dispatch } = useAppContext()

  const [sorting, setSorting] = React.useState([
    {
      id: 'updatedAt',
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

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        header: 'name',
        accessorKey: 'name',
        cell: ({ getValue }) => getValue()
      },
      {
        header: 'level',
        accessorKey: 'level'
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
        accessorKey: 'updatedAt',
        header: 'Updated',
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
    [DELETE, EDIT, VIEW]
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
      const data = await deleteLocations(activeRow?._id)
      if (data?.message) {
        setError(data?.message)
      } else {
        await fetchLocations(dispatch)
        toast({
          position: 'bottom-right',
          title: 'Location deleted successfully',
          description: "We've deleted the location",
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
            hidden={location?.pathname === '/admin/locations'}
          >
            Recent Location List
          </Heading>
          <Input
            w={{ base: '250px', md: '300px' }}
            placeholder='Search name...'
            value={table?.getColumn('name')?.getFilterValue() ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            hidden={location?.pathname === '/admin/home'}
          />
          <Tooltip label='Add New Location' placement='left'>
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
                        minW={'160'}
                        key={header.id}
                        fontFamily={'inherit'}
                        textAlign={header?.column?.columnDef?.meta?.align}
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
                        textAlign={cell?.column?.columnDef?.meta?.align}
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
        <LocationModal
          data={activeRow}
          isOpen={EDIT.isOpen}
          onClose={EDIT.onClose}
        />
      )}

      {DELETE.isOpen && (
        <DeleteModal
          error={error}
          loading={loading}
          title='Delete Location'
          isOpen={DELETE.isOpen}
          onClose={DELETE.onClose}
          onConfirm={handleConfirm}
          description='Are you sure you want to delete this location? This action cannot be undone.'
        />
      )}

      {VIEW.isOpen && (
        <LocationDrawer
          data={activeRow}
          isOpen={VIEW.isOpen}
          onClose={VIEW.onClose}
        />
      )}
    </>
  )
}

export default LocationTable
