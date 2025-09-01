import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { createContext, useState } from "react";
import { usePage } from "@inertiajs/react";

export const selectedSemesterContext = createContext();


function Layout(props) {
    //const { flash_message } = usePage().props;
    const { user_semesters } = usePage().props;
    const [selectedSemester, setSelectedSemester] = useState(user_semesters.length > 0 ? user_semesters[0].id : []);

    return (
        <div className="text-[#111827] bg-[#FEFEDA] min-h-screen flex flex-col">
            <selectedSemesterContext.Provider value={{selectedSemester, setSelectedSemester}}>
                {/* {flash_message && <FlashMessage key={Date.now()} text={flash_message}></FlashMessage>} */}
                <Header></Header>
                <Navbar></Navbar>
                <div className="flex-grow mx-16">
                    {props.children}
                </div>
                <Footer></Footer>
            </selectedSemesterContext.Provider>
        </div>
    );
}

export default Layout;