import './table.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare,faEye,faTrash} from '@fortawesome/free-solid-svg-icons'


function Table({medicine,deletemedicine,currentPage,recordsPerPage}) {

    const navigate=useNavigate()

    async function editmedicine(id)
    {
    navigate("/editmedicine/"+id)
    }

    async function viewmedicine(id)
    {
      navigate("/view/"+id)
    }

    const pageno=(currentPage*recordsPerPage)-recordsPerPage+1
    return (
        <table className="table table-responsive mx-auto border border-3 shadow">
            <thead className="table-dark rounded">
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th className='d-none d-md-table-cell text-center'>COMPANY</th>
                    <th className='text-center'>EXPIRY DATE</th>
                    <th className="text-center">ACTION</th>
                </tr>
            </thead>
            <tbody>
                {medicine.map((item) => (
            <tr key={item.id}>
            <td>{item.id}</td>               {/* Renders the index */}
            <td>{item.name}</td>       {/* Renders the item's name */}
            <td className='d-none d-md-table-cell text-center'>{item.company}</td>   {/* Renders the item's category */}
            <td className='text-center'>{item.expiry_date}</td>      {/* Renders the item's price */}

            <td className='text-center'><div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" onClick={()=>editmedicine(item.id)} class="btn btn-secondary"><FontAwesomeIcon icon={faPenToSquare} /></button>
                <button type="button" onClick={()=>viewmedicine(item.id)} class="btn btn-secondary"><FontAwesomeIcon icon={faEye} /></button>
                <button type="button" onClick={()=>deletemedicine(item.id)} class="btn btn-secondary"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
            </td>
        </tr>
    ))}
</tbody>

        </table>
    );
}

export default Table;
