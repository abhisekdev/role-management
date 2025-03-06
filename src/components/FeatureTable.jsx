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
  Tr,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react'
import { LuArrowUpDown } from 'react-icons/lu'
import FeatureModal from './FeatureModal'
import { FaEllipsis, FaPlus } from 'react-icons/fa6'

const FeatureTable = ({ data }) => {
  const [sorting, setSorting] = React.useState([])
  const [activeRow, setActiveRow] = React.useState(null)
  const [columnFilters, setColumnFilters] = React.useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        header: 'name',
        accessorKey: 'name',
        cell: ({ row }) => {
          return (
            <Stack>
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
            onOpen()
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
                    <MenuItem fontSize='sm' onClick={handleEdit}>
                      Edit
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Flex>
          )
        }
      }
    ],
    [onOpen]
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
    onOpen()
  }

  return (
    <>
      <Card>
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
          <Tooltip label='Add New Feature' placement='left'>
            <IconButton
              colorScheme='blue'
              icon={<FaPlus />}
              onClick={handleCreate}
            />
          </Tooltip>
        </CardHeader>

        {/* Table */}
        <CardBody>
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

      {isOpen && (
        <FeatureModal data={activeRow} isOpen={isOpen} onClose={onClose} />
      )}
    </>
  )
}

export default FeatureTable
