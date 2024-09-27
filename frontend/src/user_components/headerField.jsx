export default function HeaderField({logout}){
    const handleLogout = (event) => {
        event.preventDefault();
        logout();
    }
    return(
        <header>
            <span className="title">IATD Student Expense Tracker</span>
            <button
                className="logout-button"
                onClick={handleLogout}
            >
                Log out
            </button>
        </header>
    )
}