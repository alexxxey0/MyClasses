import { usePage } from '@inertiajs/react';

function Header() {
    const { user } = usePage().props;
    
    return(
        <header className="bg-[#34D399] py-4 flex items-center">
            <img src="images/myclasses_logo.png" alt="MyClasses logo" className="w-2/12"/>
            {user && <h1>Welcome, {user.name} {user.surname}!!!</h1>}
        </header>
    );
}

export default Header;