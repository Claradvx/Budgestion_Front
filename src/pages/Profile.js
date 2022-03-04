import { useParams } from 'react-router-dom';
import { UserFooter } from '../components/Footer';
import ShowProfile from '../components/ShowProfile';
import '../styles/Profile.css';

const Profile = () => {

    const params = useParams();
    const id_user = params.id_user;

    return (
        <>
            <h1>Mes données personnelles</h1>

            <ShowProfile />

            <UserFooter iduser={id_user} />
    
        </>
    )
}

export default Profile;