import { usePage } from '@inertiajs/react';
import { Link } from "@inertiajs/react";

function Header() {
    const { user } = usePage().props;

    return (
        <header className="bg-[#34D399] py-4 flex justify-between items-center">
            <img src="images/myclasses_logo.png" alt="MyClasses logo" className="w-2/12" />
            {user &&
            <div className='w-6/12 flex flex-col items-end mr-8 text-xl'>
                <div className='flex items-center gap-x-4 justify-end'>
                    <img className='w-[8%] rounded-full border-2' 
                    src={user.profile_picture_path ? user.profile_picture_path : 'storage/profile_pictures/default_profile_picture.jpg'} 
                    alt="User's profile picture" />
                    <p className='font-bold'>Welcome, {user.name} {user.surname}!</p>
                </div>
                <Link href="/logout" className='underline font-bold'>Log out</Link>
            </div>
            }
        </header>
    );
}

export default Header;