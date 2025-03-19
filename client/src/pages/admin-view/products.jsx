import ProductImageUpload from "@/components/admin-view/image-upload";
import Commonform from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
};

function AdminProduct() {
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile,setImageFile] = useState(null); 
    const [uploadImageUrl,setUploadImageUrl] = useState("");
    const [imageLoadingState,setImageLoadingState] = useState(false); 
    const {productList} = useSelector(state=>state.adminProduct)
    const dispatch = useDispatch();  
    const {toast} = useToast();
    function onSubmit(event) {
        event.preventDefault();
        dispatch(addNewProduct({
            ...formData,
            image:uploadImageUrl,
        })).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllProducts());
                setOpenCreateProductsDialog(false);
                setImageFile(null);
                setFormData(initialFormData);
                toast({
                    title: "Product added successfully",
                })
            }
        })
    }

    useEffect(()=>{
        dispatch(fetchAllProducts())
    },[dispatch])

    console.log(productList,'productList');

    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>

           
            <Sheet open={openCreateProductsDialog} onOpenChange={setOpenCreateProductsDialog}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>Add New Product</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadImageUrl={uploadImageUrl} setUploadImageUrl={setUploadImageUrl} setImageLoadingState = {setImageLoadingState} imageLoadingState = {imageLoadingState} />
                    <div className="py-6">
                        <Commonform
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText="Add"
                            formControls={addProductFormElements}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProduct;
