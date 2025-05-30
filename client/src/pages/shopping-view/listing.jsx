import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
  } from "@/components/ui/dropdown-menu"; 
  
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/Product-tiles";
import { createSearchParams, useSearchParams } from "react-router-dom";



function createSearchParamsHelper(filterParams){
    const queryParams = [];
    for(const[key,value] of Object.entries(filterParams)){
        if(Array.isArray(value) && value.length >0) {
            const paramValue = value.join(",");
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
        }
    }
    return queryParams.join("&");
}

function ShoppingListing(){
    const dispatch = useDispatch();
    const {productList} = useSelector(state=> state.shopProducts)
    const[filters,setFilters] = useState({});
    const[sort,setSort] = useState(null);   
    const[searchParams,setSearchParams] =useSearchParams();


    function handleSort(value){
        
        setSort(value);
    }

    function handleFilter(getSectionId,getCurrentOption){
        console.log(getSectionId,getCurrentOption);

        let cpyFilters = {...filters};
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
        if(indexOfCurrentSection === -1){
            cpyFilters = {...cpyFilters,[getSectionId]:[getCurrentOption]}
        }else{
            const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);
            if(indexOfCurrentOption === -1){
                cpyFilters[getSectionId].push(getCurrentOption)
            }else{
                cpyFilters[getSectionId].splice(indexOfCurrentOption,1);
            }
        }
        setFilters(cpyFilters);
        sessionStorage.setItem("filters",JSON.stringify(cpyFilters))
        
    }

    useEffect(()=>{
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
    },[])

    useEffect(() => {
        if (filters && sort) {
          const createQueryString = createSearchParamsHelper(filters);
          const fullQuery = `${createQueryString}&sortBy=${encodeURIComponent(sort)}`;
          setSearchParams(new URLSearchParams(fullQuery));
        }
      }, [filters, sort]);
      

      useEffect(() => {
        if (sort && filters) {
          dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
        }
      }, [dispatch, sort, filters]);
      

    console.log(filters);
    

    return <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter filters={filters} handleFilter={handleFilter} />
        <div className="bg-background w-full rounded-lg shadow-sm">
            <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-extrabold ">All Products</h2>
                <div className="flex items-center gap-3 ">
                    <span className="text-muted-foreground ">{productList?.length} products</span>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ArrowUpDownIcon className="h-4 w-4" />
                            <span>Sort by</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                            {
                                sortOptions.map(sortItem=><DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>)
                            }
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {
                    productList && productList.length > 0 ?
                    productList.map(productItem=> <ShoppingProductTile product={productItem} />):null
                }
            </div>
        </div>
    </div>

}

export default ShoppingListing;