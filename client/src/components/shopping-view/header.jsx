import { Link } from "react-router-dom";
import { House, Menu, ShoppingCart, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom"; 
import { logoutUser } from "@/store/auth-slice";


function MenuItems() {
    return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row ">
        {
            shoppingViewHeaderMenuItems.map(menuItem => <Link className="text-sm font-medium text-black" key={menuItem.id} to={menuItem.path} >{menuItem.label}</Link>)
        }

    </nav>
}


function HeaderRightContent() {

    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout(){
        dispatch(logoutUser());
    }

    return <div className="flex lg:items-center lg:flex-row flex-col  gap-4">
        <Button variant="outline" size="icon">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only ">User Cart</span>
        </Button>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center">
                    <AvatarFallback className="rounded-full w-full h-full flex items-center justify-center text-white font-bold text-sm">
                        {user?.userName[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="right"
                align="end"
                className="w-56 bg-white border border-gray-200 rounded-md shadow-md p-2 mr-2"
            >
                <DropdownMenuLabel className="text-sm font-medium text-gray-700 px-2 py-2">
                    Logged in as {user?.userName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=> navigate("/shop/account")} className="flex items-center gap-2 p-3 cursor-pointer text-sm text-black">
                    <User className="mr-2 h-4 w-4 " />
                    Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 p-3 cursor-pointer text-sm text-black">
                    <LogOut className="h-4 w-4" />
                    Logout
                </DropdownMenuItem>


            </DropdownMenuContent>
        </DropdownMenu>

    </div>
}

function ShoppingHeader() {


    const { isAuthenticated, user } = useSelector(state => state.auth)
    console.log(user);

    return <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">

            <Link to="/shop/home" className="flex items-center gap-2">
                <House className="h-6 w-6 text-black" />
                <span className="font-bold text-black ">Retail Rocket</span>
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only"> Toggle Header menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs text-black">
                    <MenuItems />
                    <HeaderRightContent/>
                </SheetContent>
            </Sheet>
            <div className="hidden lg:block text-black ">
                <MenuItems />
            </div>
            
                 <div className="hidden lg:block"  >
                    <HeaderRightContent />
                </div> 
            

        </div>

    </header>
}

export default ShoppingHeader;