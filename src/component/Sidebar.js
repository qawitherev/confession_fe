const Sidebar = () => {
    reutrn (
        <>
            <div classname = 'sidebar'>
                <ul>
                    <li><Link to="/confession">Confession</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                </ul>
            </div>
        </>
    );
}

module.exports = Sidebar;