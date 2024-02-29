import './table.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'


function Table({ medicine, deletemedicine, currentPage, recordsPerPage }) {

    const navigate = useNavigate();

    async function editmedicine(id) {
        navigate("/editmedicine/" + id);
    }

    async function viewmedicine(id) {
        navigate("/view/" + id);
    }

    const pageno = (currentPage * recordsPerPage) - recordsPerPage + 1;
    return (
        <div>
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
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td className='d-none d-md-table-cell text-center'>{item.company}</td>
                            <td className='text-center'>{item.expiry_date}</td>

                            <td className='text-center'>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" onClick={() => editmedicine(item.id)} className="btn btn-secondary"><FontAwesomeIcon icon={faPenToSquare} /></button>
                                    <button type="button" onClick={() => viewmedicine(item.id)} className="btn btn-secondary"><FontAwesomeIcon icon={faEye} /></button>
                                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#modal_${item.id}`}><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            {medicine.map((item) => (
                <div key={item.id} className="modal fade" id={`modal_${item.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete {item.name}?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-tertiary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={()=>{deletemedicine(item.id)}}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Table;
