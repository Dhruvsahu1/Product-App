import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/admin-view/layout"
import AdminDashboard from "./pages/admin-view/dashboard"
import AdminProduct from "./pages/admin-view/products"
import AdminOrder from "./pages/admin-view/orders"
import AdminFeature from "./pages/admin-view/features"
import ShoppingLayout from "./components/shopping-view/layout"
import NotFound from "./pages/not-found"
import ShoppingAccount from "./pages/shopping-view/account"
import ShoppingCheckout from "./pages/shopping-view/checkout"
import ShoppingListing from "./pages/shopping-view/listing"
import ShoppingHome from "./pages/shopping-view/home"
import CheckAuth from "./components/common/CheckAuth"
import UnauthPage from "./pages/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import { Skeleton } from "@/components/ui/skeleton"


function App() {
  
   const {user,isAuthenticated,isLoading} = useSelector((state) => state.auth)
   const dispatch = useDispatch();

   useEffect(()=>{
      dispatch(checkAuth());
   },[dispatch])

   if(isLoading){
      return(
         <Skeleton className="w-[100px] h-[20px] rounded-full" />
      )
   }

  return (
    <div className="flex flex-col w-screen overflow-hidden bg-white ">
       {/* {here we can render common components} */}
     

       <Routes>
         <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
               <AuthLayout />
            </CheckAuth>
         } >
            <Route path="login" element={<AuthLogin/>}/>
            <Route  path="register" element={<AuthRegister/>}/>
            
         </Route>
         <Route path="/admin" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
               <AdminLayout/>
            </CheckAuth>
         }>
            <Route path="dashboard" element={<AdminDashboard/>}/>
            <Route path="products" element={<AdminProduct/>}/>
            <Route path="orders" element={<AdminOrder/>}/>
            <Route path="features" element={<AdminFeature/>}/>
         </Route>
         <Route path="/shop" element= {
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
               <ShoppingLayout/>
            </CheckAuth>
         }>
            <Route path="account" element={<ShoppingAccount/>}/>
            <Route path="checkout" element={<ShoppingCheckout/>}/>
            <Route path="home" element={<ShoppingHome/>}/>
            <Route path="listing" element={<ShoppingListing/>}/>
         </Route>
         <Route path="unauth-page" element={<UnauthPage/>}></Route>
         <Route path="*" element={<NotFound/>}></Route>
         

       </Routes>
    </div>
  )
}

export default App
