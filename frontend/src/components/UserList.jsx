import React, {useState, useEffect} from 'react';
import axios from "axios";

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);        // current page
    const [limit, setLimit] = useState(10);     // limit baris per page
    const [pages, setPages] = useState(0);      // total page
    const [rows, setRows] = useState(0);        // total row
    const [keyword, setKeyword] = useState(''); // keyword pencarian

    // memanggil tampungan data user agar tidak re-render pada perubahan page & keyword
    useEffect(() => {
      getUsers();
    }, [page, keyword])
    
    // menampung response data user
    const getUsers = async () => {
        const response = await axios.get(
            `http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`
            );
            setUsers(response.data.result);
            setPage(response.data.page);
            setPages(response.data.totalPage);
            setRows(response.data.totalRows);

    }

    return (
        <div className="container mt-5">
            <div className='columns'>
                <div className="column is-centered">
                <form>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input 
                                type="text" 
                                className="input" 
                                placeholder='Find something here ...' 
                            />
                            
                        </div>
                        <div className="control">
                            <button type='submit' className='button is-info'>Search</button>
                        </div>
                    </div>
                </form>
                
                <table className='table is-striped is-bordered is-fullwidth mt-2'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                </div>
            </div>
        </div>
    )
}

export default UserList