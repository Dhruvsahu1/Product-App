import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";


function ProductFilter({filters,handleFilter}) {
    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-bold">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {Object.keys(filterOptions).map((keyItem) => (
                    <Fragment key={keyItem}>
                        <div>
                            <h3 className="text-base font-semibold capitalize">{keyItem}</h3>
                            <div className="grid gap-2 mt-2">
                                {filterOptions[keyItem].map((option) => (
                                    <Label
                                        key={option.value}
                                        htmlFor={option.value}
                                        className="flex items-center gap-2 text-sm font-medium text-black"
                                    >
                                        <Checkbox checked={filters && Object.keys(filters).length > 0 && filters[keyItem]&& filters[keyItem].indexOf(option.id)>-1} onCheckedChange={()=>handleFilter(keyItem,option.id)}
                                            id={option.value}
                                            className="
                                                w-3 h-3 
                                                border border-gray-400 
                                                bg-white 
                                                text-black 
                                                data-[state=checked]:bg-black 
                                                data-[state=checked]:border-black 
                                                data-[state=checked]:text-white 
                                                rounded-sm
                                            "
                                        />
                                        {option.label}
                                    </Label>
                                ))}
                            </div>
                        </div>
                        <Separator/> 
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default ProductFilter;
