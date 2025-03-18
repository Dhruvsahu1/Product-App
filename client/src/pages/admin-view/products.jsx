import ProductImageUpload from "@/components/admin-view/image-upload";
import Commonform from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, useState } from "react"; 

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
    function onSubmit() {
        console.log("Form Submitted", formData);
    }

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
                    <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadImageUrl={uploadImageUrl} setUploadImageUrl={setUploadImageUrl} setImageLoadingState = {setImageLoadingState} />
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
