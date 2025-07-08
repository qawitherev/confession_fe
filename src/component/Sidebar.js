import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <>
            <div className='sidebar'>
                <ul>
                    <li><Link to="/confession">Confession</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;