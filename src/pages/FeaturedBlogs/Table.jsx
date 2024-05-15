import React from 'react';
import {
  createColumnHelper,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.display({
    id: 'index',
    header: () => 'No',
    cell: info => info.row.index + 1,
  }),
  columnHelper.accessor('title', {
    header: () => 'Blog Title',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('ownerName', {
    header: () => 'Blog Owner',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('ownerProfile', {
    header: () => 'Owner Profile',
    cell: info => (
      <img className='rounded-full'
        src={info.getValue()}
        alt="Profile"
        style={{ width: '50px', height: '50px' }}
      />
    ),
  }),
];


const Table = ({ data }) => {
    const [sorting, setSorting] = React.useState([]);

    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });
  return (
    <div className='p-10'>
        <table className='w-full mx-auto'>
      <thead className='text-green-600'>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th className='border text-start py-4 pl-2 cursor-pointer' key={header.id} onClick={header.column.getToggleSortingHandler()}>
                {flexRender(header.column.columnDef.header, header.getContext())}
                <span>
                  {header.column.getIsSorted()
                    ? header.column.getIsSorted() === 'desc'
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr className='border' key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td className='pl-2' key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;