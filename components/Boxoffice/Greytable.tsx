import Link from 'next/link'
import React from 'react'

export type GreytableRow = {
    rank: number
    rating: string
    genre: string
    link: string
    title: string
    total: string
    weekly_gross: string
    weekend_gross: string
    release_date: string
    distributor_name: string
    distributor_link: string
}

type GreytableProps = {
    data?: GreytableRow[]
    selectedFilter: 'Last Weekend' | 'Last Week' | 'This Quarter' | 'This Year'
}

const Greytable: React.FC<GreytableProps> = ({ data = [], selectedFilter }) => {
    let total_title = '';
    switch (selectedFilter) {
        case 'Last Weekend':
            total_title = 'Total Weekend';
            break;
        case 'Last Week':
            total_title = 'Total Week';
            break;
        case 'This Quarter':
            total_title = 'Total Quarter';
            break;
        case 'This Year':
            total_title = 'Total Year';
            break;
        default:
            total_title = 'Total Weekend';
            break;
    }
    return (
        <div className="overflow-x-auto rounded-2xl overflow-hidden">
            <div className="w-full rounded-lg overflow-hidden shadow-sm bg-white sm:min-w-[1000px]">
                <table className="w-full text-left border-collapse">
                    <thead className="hidden sm:table-header-group">
                        <tr className="bg-neutral-200 text-gray-800 text-sm font-bold capitalize tracking-wide">
                            <th className="px-4 py-1.5 w-24 border-r border-gray-300/50 text-center">Rank</th>
                            <th className="px-4 py-1.5 border-r border-gray-300/50">Title</th>
                            <th className="px-4 py-1.5 w-32 border-r border-gray-300/50 text-center">Rating</th>
                            <th className="px-4 py-1.5 border-r border-gray-300/50">Distributor</th>
                            {/* <th className="px-4 py-1.5 w-40 border-r border-gray-300/50 text-center">Release Date</th> */}
                            <th className="px-4 py-1.5 w-40">Primary Genre</th>
                            <th className="px-4 py-1.5 w-40 text-right">{total_title}</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm block sm:table-row-group">
                        {data.length ? (
                            data.map((row, index) => (
                                <tr
                                    key={index}
                                    data-title={row.title}
                                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border border-b border-gray-200 hover:bg-gray-100 transition-colors block sm:table-row mb-3 sm:mb-0 rounded-lg `}
                                >
                                    <td data-title="Rank" className="px-4 py-1.5 sm:border-r border-gray-200 sm:table-cell flex justify-between border-b text-center">
                                        <span className="font-bold block sm:hidden">Rank</span>
                                        {index + 1}</td>
                                    <td data-title="Movie" className="px-4 py-1.5 sm:border-r border-gray-200 font-medium sm:table-cell flex justify-between border-b">
                                        <span className="font-bold block sm:hidden">Title</span>
                                        <Link href={row.link || '#'}>
                                            <span className="text-gray-800 hover:text-gray-600">{row.title}</span>
                                        </Link>
                                    </td>
                                    <td data-title="Rating" className="px-4 py-1.5 sm:border-r border-gray-200 sm:table-cell flex justify-between border-b text-center">
                                        <span className="font-bold block sm:hidden">Rating</span>
                                        {row.rating}
                                    </td>
                                    <td data-title="Distributor" className="px-4 py-1.5 sm:border-r border-gray-200 font-medium sm:table-cell flex justify-between border-b">
                                        <span className="font-bold block sm:hidden">Distributor</span>
                                        <Link href={row.distributor_link || '#'}>
                                            <span className="text-gray-800 hover:text-gray-600">{row.distributor_name}</span>
                                        </Link>
                                    </td>
                                    {/* <td data-title="Year" className="px-4 py-1.5 sm:border-r border-gray-200 sm:table-cell flex justify-between border-b text-center">
                                        <span className="font-bold block sm:hidden">Release Date</span>
                                        {row.release_date}
                                    </td> */}
                                    <td data-title="Genre" className="px-4 py-1.5 items-center sm:table-cell flex justify-between">
                                        <span className="font-bold block sm:hidden">Genre</span>
                                        <div className="flex justify-between items-center gap-2">
                                            <span>{row.genre}</span>
                                        </div>
                                    </td>
                                    <td data-title="Total" className="px-4 py-1.5 sm:border-r border-gray-200 sm:table-cell flex justify-between border-b text-right">
                                        <span className="font-bold block sm:hidden">Total</span>
                                        ${row.total ? parseInt(row.total).toLocaleString() : row.weekly_gross ? parseInt(row.weekly_gross).toLocaleString() : row.weekend_gross ? parseInt(row.weekend_gross).toLocaleString() : '-'}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                                    No data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Greytable

