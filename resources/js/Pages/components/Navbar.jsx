import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

function Navbar() {

    const { url } = usePage(); // current URL
    const isActive = (path) => url.startsWith(path); // check if URL starts with path

    return (
        <nav className="flex justify-between my-12 mx-auto w-6/12 text-xl *:cursor-pointer">
            <Link href="/dashboard" style={{ fontWeight: isActive('/dashboard') ? 'bold' : 'normal' }}
            >
                Dashboard
            </Link>
            <Link href="/semesters" style={{ fontWeight: isActive('/semesters') ? 'bold' : 'normal' }}
            >
                Semesters
            </Link>
            <Link href="/schedule" style={{ fontWeight: isActive('/schedule') ? 'bold' : 'normal' }}
            >
                Schedule
            </Link>
            <h2>Classes</h2>
            <h2>Friends</h2>
            <Link href="/assignments" style={{ fontWeight: isActive('/assignments') ? 'bold' : 'normal' }}
            >
                Assignments
            </Link>
            <h2>Grades</h2>
            <h2>Settings</h2>
        </nav>
    );
}

export default Navbar;