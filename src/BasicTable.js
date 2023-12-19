import { useMemo} from 'react'
import { useTable, useSortBy } from 'react-table'
import { RankingColumns } from './Columns'
 
function BasicTable({tableData, type}) {

    console.log(type)
    console.log(tableData)

    let columns = useMemo(() => RankingColumns, [])
    let data = useMemo(() => tableData, [])

    if (type != 'rankings') {

        columns = useMemo(() => {
            if (tableData.length > 0) {
                let colDef = [];
                for (const [key, value] of Object.entries(tableData[0])) {
                    colDef.push({Header:key, accessor:key})
                }
                return colDef;
            }
            return []
        }, [])
    }
     
    const tableInstance = useTable({ columns, data }, useSortBy);
    
    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow} = tableInstance
  return (
    <table {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        // Aplicamos las propiedades de ordenación a cada columna
                        <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className={
                            column.isSorted
                            ? column.isSortedDesc
                                ? "desc"
                                : "asc"
                            : ""
                        }
                        >
                        {column.render("Header")}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>
                        {cell.render('Cell')}</td>
                            })}
                    </tr>
                    )
                })
            }
        </tbody>
    </table>   
  )
}
 
export default BasicTable