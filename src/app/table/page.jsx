"use client";
import { getTableData } from "@/utils/getTableData";
import { FaArrowDownLong, FaCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios';

const Table = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [activeDeleteId, setActiveDeleteId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getTableData();
            setItems(result);
            setFilteredItems(result);
        };
        fetchData();
    }, []);

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split(' ');
        const monthIndex = new Date(Date.parse(month + " 1, 2024")).getMonth();
        return new Date(year, monthIndex, day);
    };

    const filterByRange = (range) => {
        const now = new Date();
        let filtered = [];

        if (range === '12 Months') {
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(now.getFullYear() - 1);
            filtered = items.filter(item => parseDate(item.date) >= oneYearAgo);
        } else if (range === '30 Days') {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(now.getDate() - 30);
            filtered = items.filter(item => parseDate(item.date) >= thirtyDaysAgo);
        } else if (range === '7 Days') {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(now.getDate() - 7);
            filtered = items.filter(item => parseDate(item.date) >= sevenDaysAgo);
        } else if (range === '24 Hours') {
            const oneDayAgo = new Date();
            oneDayAgo.setDate(now.getDate() - 1);
            filtered = items.filter(item => parseDate(item.date) >= oneDayAgo);
        }

        setFilteredItems(filtered);
    };

    const handleSelectDates = () => {
        if (startDate && endDate) {
            const filtered = items.filter(item => {
                const itemDate = parseDate(item.date);
                return itemDate >= startDate && itemDate <= endDate;
            });
            setFilteredItems(filtered);
            setShowCalendar(false);
            setCurrentPage(1);
        }
    };

    const handleSort = () => {
        const sortedItems = [...filteredItems].sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setFilteredItems(sortedItems);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };


 

    const lastPage = currentPage * itemsPerPage;
    const firstPage = lastPage - itemsPerPage;
    const records = filteredItems.slice(firstPage, lastPage);
    const numberOfPages = Math.ceil(filteredItems.length / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()].map(num => num + 1);

    return (
        <div className='w-11/12 mx-auto'>
            <div className=' flex justify-between'>
                <div className=' flex gap-6 items-center'>
                    <h2 className='font-bold text-2xl'> Recent Transaction</h2>
                    <h1>12 months(10 December 2023 - 9 December 2024)</h1>
                </div>
                <div className='flex gap-6 items-center'>
                    <div className="flex border-2 gap-4 font-semibold border-gray-400 shadow-sm rounded-xl p-1">
                        <button onClick={() => filterByRange('12 Months')} className="mr-2 border-r-2 border-gray-500 px-4">12 Months</button>
                        <button onClick={() => filterByRange('30 Days')} className="mr-2 border-r-2 border-gray-500 px-4">30 Days</button>
                        <button onClick={() => filterByRange('7 Days')} className="mr-2 border-r-2 border-gray-500 px-4">7 Days</button>
                        <button onClick={() => filterByRange('24 Hours')} className="mr-2">24 Hours</button>
                    </div>
                    <div className=''>
                        <button
                            className='rounded-xl border-2 gap-4 font-semibold border-gray-500 p-1'
                            onClick={() => setShowCalendar(!showCalendar)}
                        >
                            Select Dates
                        </button>
                    </div>
                </div>
            </div>

            {showCalendar && (
                <div className="absolute ml-[800px] z-10 mt-2 bg-white shadow-lg p-8 rounded-md">
                    <h3> Start Date</h3>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Start Date"
                    />
                    <h3> End Date</h3>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="End Date"
                    />
                    <button onClick={handleSelectDates} className="mt-2 p-2 bg-blue-500 text-white rounded">Filter</button>
                </div>
            )}

            <div className="">
                <table className="table">
                    <thead>
                        <tr>
                            <th className='flex items-center gap-2'>
                                <input type="checkbox" className="checkbox" />
                                Date
                                <button onClick={handleSort} className={`transition-transform duration-300 ${sortDirection === 'asc' ? '' : 'rotate-180'}`}>
                                    <FaArrowDownLong />
                                </button>
                            </th>
                            <th>Merchant Name</th>
                            <th>Description</th>
                            <th>Tnx Id</th>
                            <th>Transaction Type</th>
                            <th>Amount</th>
                            <th>Account</th>
                            <th>Status</th>
                            <th>Categories</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {records.map(item => (
                        <tbody key={item._id}>
                            <tr>
                                <td className='flex items-center gap-2'><input type="checkbox" className="checkbox" />
                                    <div className='flex flex-col'>
                                        <h2>{item.date}</h2> {item.time}
                                    </div>
                                </td>
                                <td className='capitalize font-semibold'>{item.merchant_name}</td>
                                <td className='capitalize font-semibold'>{item.description} <br /> <span className='text-xs text-gray-400'>{item.transaction_id}</span></td>
                                <td className='capitalize font-semibold'>{item.transaction_id}</td>
                                <td className={`capitalize flex gap-1 items-center text-center font-semibold
                                    ${item.transaction_type === 'income' ? 'text-success bg-green-100 w-24 h-8' : item.transaction_type === 'expense' ? 'text-warning bg-orange-100 w-24 h-8' : ''}`}>
                                    <FaCheck />{item.transaction_type}
                                </td>
                                <td className='capitalize font-semibold'>${item.amount}</td>
                                <td className='capitalize font-semibold'>${item.account}</td>
                                <td className={`capitalize font-semibold 
                                    ${item.account_status === 'in progress' ? 'text-blue-500' :
                                        item.account_status === 'pending' ? 'text-warning' :
                                            item.account_status === 'unreconciled' ? 'text-red-500' :
                                                item.account_status === 'reconciled' ? 'text-success' : ''}`}>
                                    {item.account_status}
                                </td>
                                <td className='capitalize text-center font-semibold'>{item.categories}</td>
                                <td className=''>
                                    <button  className='text-lg'><BsThreeDotsVertical /></button>
                                   
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
                <div className="pagination flex justify-end mr-12 gap-2 mt-4">
                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded 
                                ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Table;
