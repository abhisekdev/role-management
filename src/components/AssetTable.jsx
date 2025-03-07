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
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
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
import AssetModal from './AssetModal'
import { useAppContext } from '../context/AppContext'
import { deleteAssets } from '../api/assetApi'
import { fetchAssets } from '../actions/appActions'
import DeleteModal from './DeleteModal'

const AssetsTable = ({ data }) => {
  const toast = useToast()
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
        cell: ({ row }) => {
          return (
            <Stack w={{ base: '400px', md: 'auto' }}>
              <Text>{row?.original?.name}</Text>
              <Text color={'gray.500'}>{row?.original?.description}</Text>
            </Stack>
          )
        }
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => {
          return (
            <Flex
              gap={2}
              cursor={'pointer'}
              onClick={() => column.toggleSorting()}
            >
              <Text>Created At</Text>
              <LuArrowUpDown />
            </Flex>
          )
        },
        cell: ({ getValue }) => (
          <Text w={'200px'}>{new Date(getValue()).toLocaleDateString()}</Text>
        )
      },
      {
        accessorKey: 'updatedAt',
        header: ({ column }) => {
          return (
            <Flex
              gap={2}
              cursor={'pointer'}
              onClick={() => column.toggleSorting()}
            >
              <Text>Updated At</Text>
              <LuArrowUpDown />
            </Flex>
          )
        },
        cell: ({ getValue }) => (
          <Text w={'200px'}>{new Date(getValue()).toLocaleDateString()}</Text>
        )
      },
      {
        accessorKey: 'actions',
        header: () => <Text textAlign={'right'}>Action</Text>,
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
                    <MenuItem hidden fontSize='sm' onClick={handleView}>
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
      const data = await deleteAssets(activeRow?._id)
      if (data) {
        await fetchAssets(dispatch)
        toast({
          position: 'bottom-right',
          title: 'Asset deleted successfully',
          description: "We've deleted the asset",
          status: 'success',
          duration: 9000,
          isClosable: true
        })
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
      DELETE.onClose()
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
          <Input
            w={'300px'}
            placeholder='Search name...'
            value={table?.getColumn('name')?.getFilterValue() ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
          />
          <Tooltip label='Add New Asset' placement='left'>
            <IconButton
              colorScheme='blue'
              icon={<FaPlus />}
              onClick={handleCreate}
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
                      <Th key={header.id} fontFamily={'inherit'}>
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
                      <Td key={cell.id} fontSize={'sm'}>
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
        <AssetModal
          data={activeRow}
          isOpen={EDIT.isOpen}
          onClose={EDIT.onClose}
        />
      )}

      {DELETE.isOpen && (
        <DeleteModal
          error={error}
          loading={loading}
          title='Delete Asset'
          isOpen={DELETE.isOpen}
          onClose={DELETE.onClose}
          onConfirm={handleConfirm}
          description='Are you sure you want to delete this asset? This action cannot be undone.'
        />
      )}
    </>
  )
}

export default AssetsTable
