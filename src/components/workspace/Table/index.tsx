import { flexRender, Table } from '@tanstack/react-table';
import { Key } from 'react';

import Header from '@/components/workspace/Table/Header';
import Paginator from '@/components/workspace/Table/Paginator';

type TableProps<D> = {
  instance: Table<any>;
  handleRowClick: (d?: D) => void;
  enablePagination?: boolean;
};

function TableWrapper<D>({ instance, handleRowClick, enablePagination }: TableProps<D>) {
  return (
    <>
      <table className="table-compact relative table w-full">
        <Header instance={instance} />
        <tbody>
          {instance.getRowModel().rows.map((row: { id?: Key; original?: D; getVisibleCells: () => any[] }) => (
            <tr key={row.id} className="hover" onClick={() => handleRowClick(row.original)}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}> {flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {enablePagination && (
        <>
          <div className="h-2" />
          <Paginator instance={instance} />
        </>
      )}
    </>
  );
}

export default TableWrapper;
