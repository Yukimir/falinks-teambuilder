import { Specie } from '@pkmn/data';
import { StatsTable } from '@pkmn/types';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';

import { PokemonIcon } from '@/components/icons/PokemonIcon';
import { TypeIcon } from '@/components/icons/TypeIcon';
import Table from '@/components/table';
import { StoreContext } from '@/components/workspace/Contexts/StoreContext';
import { PresetsSubComponent } from '@/components/workspace/PokemonSpecies/PresetsSubComponent';
import DexSingleton from '@/models/DexSingleton';
import { Pokemon } from '@/models/Pokemon';
import { Usage } from '@/utils/Types';

function SpeciesTable() {
  const { teamState, tabIdx, focusedFieldState, focusedFieldDispatch, globalFilter, setGlobalFilter } = useContext(StoreContext);

  // table settings
  const [data, setData] = useState<Specie[]>(() => [...Array.from(DexSingleton.getGen().species)]);
  const { data: usages, error } = useSWR<Usage[]>(`/api/usages/format/${teamState.format}`, (u) => fetch(u).then((r) => r.json()), {
    fallbackData: [],
  });
  if (error) {
    toast.error(error);
  }
  const columns = useMemo<ColumnDef<Specie>[]>(() => {
    return [
      {
        id: 'expander',
        header: () => null,
        cell: ({ row, table }) => {
          return row.getCanExpand() ? (
            <button
              type="button"
              title="Show Presets"
              className="btn-ghost btn-xs btn cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                // Because `useSWR` is used in `PresetsSubComponent`,
                // only allow one row to be expanded at a time to avoid more hooks get re-rendered
                table.resetExpanded(false);
                // if closed, open it; otherwise, close all
                if (!row.getIsExpanded()) {
                  row.toggleExpanded();
                }
              }}
            >
              {row.getIsExpanded() ? '📖' : '📕'}
            </button>
          ) : null;
        },
        enableSorting: false,
        enableFiltering: false,
      },
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ getValue }) => (
          <span>
            <PokemonIcon speciesId={getValue<string>()} />
            {getValue<string>()}
          </span>
        ),
      },
      {
        header: 'Types',
        accessorKey: 'types',
        cell: (info) => (
          <span>
            {info.getValue<string[]>().map((typeName) => (
              <TypeIcon key={typeName} typeName={typeName} />
            ))}
          </span>
        ),
        enableSorting: false,
        filterFn: 'arrIncludes',
      },
      {
        header: 'Abilities',
        accessorKey: 'abilities',
        cell: (info) => Object.values(info.getValue<object>()).join('/'),
        enableSorting: false,
        filterFn: (row, columnId, filterValue) => {
          return Object.values(row.getValue<object>(columnId)).join(' ').toLowerCase().includes(filterValue.toLowerCase());
        },
      },
      {
        id: 'hp',
        header: 'HP',
        accessorFn: (row) => row.baseStats.hp,
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
      {
        id: 'atk',
        header: 'ATK',
        accessorFn: (row) => row.baseStats.atk,
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
      {
        id: 'def',
        header: 'DEF',
        accessorFn: (row) => row.baseStats.def,
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
      {
        id: 'spa',
        header: 'SPA',
        accessorFn: (row) => row.baseStats.spa,
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
      {
        id: 'spd',
        header: 'SPD',
        accessorFn: (row) => row.baseStats.spd,
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
      {
        id: 'spe',
        header: 'SPE',
        accessorFn: (row) => row.baseStats.spe,
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
      {
        id: 'total',
        header: 'Total',
        accessorFn: (row) => row.baseStats,
        cell: (info) => {
          return Object.values<number>(info.getValue<StatsTable>()).reduce((acc, curr) => acc + curr, 0);
        },
        enableColumnFilter: false,
        enableGlobalFilter: false,
        sortingFn: (a: Row<any>, b: Row<any>, columnId: string) =>
          Object.values<number>(a.getValue(columnId)).reduce((acc, curr) => acc + curr, 0) -
          Object.values<number>(b.getValue(columnId)).reduce((acc, curr) => acc + curr, 0),
      },
    ];
  }, []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // sorting by usages
  useEffect(() => {
    if (!usages || usages.length <= 0) {
      return;
    }
    const dataSorted = usages.flatMap((u) => DexSingleton.getGen().species.get(u.name) || []);
    dataSorted.push(...Array.from(DexSingleton.getGen().species).filter((s) => !dataSorted.includes(s)));
    setData(dataSorted);
  }, [usages]);

  // table instance
  const instance = useReactTable<Specie>({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
      sorting,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
  });

  // handle table events
  const handleRowClick = (specie?: Specie) => {
    if (!specie) return;
    teamState.splicePokemonTeam(tabIdx, 1, new Pokemon(specie.name, '', specie.requiredItem));
    focusedFieldDispatch({ type: 'next', payload: focusedFieldState });
  };

  // table render
  return <Table<Specie> instance={instance} handleRowClick={handleRowClick} enablePagination={true} renderSubComponent={PresetsSubComponent} />;
}

export default SpeciesTable;
