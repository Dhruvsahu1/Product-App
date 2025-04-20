import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import Commonform from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, fetchAllProducts , editProduct ,deleteProduct} from "@/store/admin/products-slice";
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
    const [currentEditedId,setCurrentEditedId]  = useState(null);
    const {productList} = useSelector(state=>state.adminProduct)
    const dispatch = useDispatch();  
    const {toast} = useToast();


    function onSubmit(event) {
        event.preventDefault();

        currentEditedId !== null ? dispatch(editProduct({
            id : currentEditedId, formData
        })).then((data)=>{
            console.log(data,"edit");
            if(data?.payload?.success){
                dispatch(fetchAllProducts());
                setFormData(initialFormData);
                setOpenCreateProductsDialog(false);
                setCurrentEditedId(null);
            }
            
        }):
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

    function handleDelete(getCurrentProductId){
        dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllProducts());
                toast({
                    title: "Product deleted successfully",
                })
            }

        })
    }

    function isFormValid(){
        return Object.keys(formData).map(key=> formData[key]!== "").every((item)=>item)
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
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {
                    productList && productList.length > 0 ? productList.map(productItem => <AdminProductTile setFormData={setFormData} setOpenCreateProductsDialog={setOpenCreateProductsDialog} setCurrentEditedId={setCurrentEditedId} product={productItem} handleDelete={handleDelete} />) : null
                }
            </div>

           
            <Sheet open={openCreateProductsDialog} onOpenChange={()=>{
                setOpenCreateProductsDialog(false);
                setCurrentEditedId(null);
                setFormData(initialFormData);
            }}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>{currentEditedId !== null ? "Edit Product" : "Add New Product"}</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadImageUrl={uploadImageUrl} setUploadImageUrl={setUploadImageUrl} setImageLoadingState = {setImageLoadingState} imageLoadingState = {imageLoadingState} isEditMode = {currentEditedId !== null} />
                    <div className="py-6">
                        <Commonform
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={currentEditedId !== null ? "Save Changes" : "Add Product"} 
                            formControls={addProductFormElements}
                            isBtnDisabled={!isFormValid()}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProduct;
