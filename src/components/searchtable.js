import React from 'react';
import './table.css';


function searchTable({medicine,currentPage,recordsPerPage}) {



    const pageno=(currentPage*recordsPerPage)-recordsPerPage+1
    return (
        <div>
        <h2 className='text-light'><b>🔍search results....</b></h2>
        <table className="table table-responsive mx-auto border border-3 shadow">
            <thead className="table-dark rounded">
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th className='d-none d-md-table-cell text-center'>COMPANY</th>
                    <th className='text-center'>EXPIRY DATE</th>
                </tr>
            </thead>
            <tbody>
                {medicine.map((item,i) => (
            <tr key={i}>
            <td>{pageno+i}</td>               {/* Renders the index */}
            <td>{item.name}</td>       {/* Renders the item's name */}
            <td className='d-none d-md-table-cell text-center'>{item.company}</td>   {/* Renders the item's category */}
            <td className='text-center'>{item.expiry_date}</td>      {/* Renders the item's price */}
        </tr>
    ))}
</tbody>

        </table>
        </div>
    );
}

export default searchTable;
