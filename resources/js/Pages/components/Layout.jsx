import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { createContext, useState } from "react";
import { usePage } from "@inertiajs/react";

export const selectedSemesterIdContext = createContext();
export const selectedClassContext = createContext();


function Layout(props) {
    //const { flash_message } = usePage().props;
    const { user_semesters } = usePage().props;
    console.log(user_semesters);
    const [selectedSemesterId, setSelectedSemesterId] = useState(user_semesters.length > 0 ? user_semesters[0].id : null);
    const [selectedClass, setSelectedClass] = useState(null);

    return (
        <div>
            <div className={selectedClass !== null ? 'fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40' : ''}></div>

            <div className="text-[#111827] bg-[#FEFEDA] min-h-screen flex flex-col">
                <selectedClassContext.Provider value={{ selectedClass, setSelectedClass }}>
                    <selectedSemesterIdContext.Provider value={{ selectedSemesterId, setSelectedSemesterId }}>
                        {/* {flash_message && <FlashMessage key={Date.now()} text={flash_message}></FlashMessage>} */}
                        <Header></Header>
                        <Navbar></Navbar>
                        <div className="flex-grow mx-32">
                            {props.children}
                        </div>
                        <Footer></Footer>
                    </selectedSemesterIdContext.Provider>
                </selectedClassContext.Provider>
            </div>
        </div>
    );
}

export default Layout;