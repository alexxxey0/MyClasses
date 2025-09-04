import { usePage } from '@inertiajs/react';
import { Link } from "@inertiajs/react";
import { useContext } from 'react';
import { selectedSemesterIdContext } from './Layout';

function Header() {
    const { user } = usePage().props;
    const { user_semesters } = usePage().props;
    const { selectedSemesterId, setSelectedSemesterId } = useContext(selectedSemesterIdContext);

    return (
        <header className="bg-[#34D399] py-4 flex justify-between items-center">
            <div className='w-2/12 flex items-center gap-x-4'>
                <img src="/images/myclasses_logo.png" alt="MyClasses logo" />
                {user_semesters.length > 0 && <select name="selected_semester" className='rounded-md border-2 p-2 shadow-md bg-[#FEFEDA]'
                    onChange={(e) => setSelectedSemesterId(Number(e.target.value))}>
                    {user_semesters.map((semester) => (
                        <option key={semester.id} value={semester.id}>
                            {semester.educational_institution} - {semester.year} - {semester.type}
                        </option>
                    ))}
                </select>}
            </div>
            {user &&
                <div className='w-6/12 flex flex-col items-end mr-8 text-xl'>
                    <div className='flex items-center gap-x-4 justify-end'>
                        <img className='w-[8%] rounded-full border-2'
                            src={user.profile_picture_path ? user.profile_picture_path : '/storage/profile_pictures/default_profile_picture.jpg'}
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