import Header from "./Header";
import Footer from "./Footer";
import { usePage } from '@inertiajs/react';


function Layout(props) {
    const { flash_message } = usePage().props;

    return (
        <div className="text-[#111827] bg-[#FEFEDA] min-h-screen flex flex-col">
            {flash_message && <FlashMessage key={Date.now()} text={flash_message}></FlashMessage>}
            <Header></Header>
            <div className="flex-grow">
                {props.children}
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Layout;