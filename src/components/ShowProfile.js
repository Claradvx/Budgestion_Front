import '../styles/Forms.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ShowProfile = () => {

    const params = useParams(); 
    const id_user = params.id_user;

    const [user, setUser] = useState([[]]);

    const getUser = async () => {
        const {data} = await axios.get("http://localhost:8090/user/" + id_user);
        setUser(data);
    }

    useEffect( () => {
        getUser();
    }, []);

    return (
        <> 
            <div className='showbox'>
                <form>

                    <div className = 'field'>
                        <label htmlFor = 'firstname' >Firstname</label>
                        <p className='data'>{user.firstname}</p>
                    </div>
                    <div className = 'field'>
                        <label htmlFor = 'lastname' >Lastname</label>
                        <p className='data'>{user.name}</p>
                    </div>
                    <div className = 'field'>
                        <label htmlFor = 'email' >Email</label>y
                        <p className='data'>{user.username}</p>
                    </div>
                    <div className = 'field'>
                        <label htmlFor = 'age' >Âge</label>
                        <p className='data'>{user.age}</p>
                    </div>

                </form>
            </div>
        </>
    )
}

export default ShowProfile;