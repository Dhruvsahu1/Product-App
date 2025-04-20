import ShoppingHeader from "./header";

import { Outlet } from "react-router-dom";


function ShoppingLayout(){
    return (
        <div className="flex flex-col h-screen bg-white text-black overflow-hidden">
            {/* {common header} */}
            <ShoppingHeader/>
            <main className="flex flex-col w-full">
                <Outlet/>
            </main>
        </div>
    )
}
export default ShoppingLayout;