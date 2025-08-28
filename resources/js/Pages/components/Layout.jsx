import Header from "./Header";
import Footer from "./Footer";
import { usePage } from '@inertiajs/react';


function Layout(props) {
    const { flash_message } = usePage().props;

    return (
        <div className="text-[#111827]">
            {flash_message && <FlashMessage key={Date.now()} text={flash_message}></FlashMessage>}
            <Header></Header>
            {props.children}
            <Footer></Footer>
        </div>
    );
}

export default Layout;