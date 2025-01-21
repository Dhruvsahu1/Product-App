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


function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white ">
       {/* {here we can render common components} */}


       <Routes>
         <Route path="/auth" element={<AuthLayout />} >
            <Route path="login" element={<AuthLogin/>}/>
            <Route  path="register" element={<AuthRegister/>}/>
         </Route>
         <Route path="/admin" element={<AdminLayout/>}>
            <Route path="dashboard" element={<AdminDashboard/>}/>
            <Route path="products" element={<AdminProduct/>}/>
            <Route path="orders" element={<AdminOrder/>}/>
            <Route path="features" element={<AdminFeature/>}/>
         </Route>
         <Route path="/shop" element= {<ShoppingLayout/>}>
            <Route path="account" element={<ShoppingAccount/>}/>
            <Route path="checkout" element={<ShoppingCheckout/>}/>
            <Route path="home" element={<ShoppingHome/>}/>
            <Route path="listing" element={<ShoppingListing/>}/>
         </Route>
         <Route path="*" element={<NotFound/>}></Route>

       </Routes>
    </div>
  )
}

export default App