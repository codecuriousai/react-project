import { useContext } from 'react';
import './Navbar.css'; // Import the CSS file for styling
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserDetailsContext';

const Navbar = () => {
    const { userDetails, setUserDetails } = useContext(UserContext)
    const navigate = useNavigate();
    const logOutButtonHandler = () => {
        try {
            localStorage.removeItem('userLoggedIn');
            setUserDetails({ email: '', token: '' });
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    }

    const navigationHandler = (path: string) => {
        navigate(path)
    }

    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li><a href="/home/products" onClick={(e) => { e.preventDefault(); navigationHandler('/home/products'); }}>Home</a></li>
                <li><a href="/home/createproduct" onClick={(e) => { e.preventDefault(); navigationHandler('/home/createproduct'); }}>Create</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <Button lable='Logout' onButtonClick={logOutButtonHandler} />
            </ul>
        </nav>
    );
};

export default Navbar;