import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "../ui/select"; 
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Commonform({ formControls, formData, setFormData, onSubmit, buttonText,isBtnDisabled }) {
    function renderInputsByComponentType(getControlItem) {
        const value = formData[getControlItem.name] || '';
        switch (getControlItem.componentType) {
            case 'input':
                return (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );

            case 'select':
                return (
                    <Select
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: value,
                            })
                        }
                        value={value}
                    >
                        <SelectTrigger className="w-full border-gray-300 hover:border-gray-500 transition duration-200 rounded-md p-2">
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>
                        <SelectContent className="border border-gray-200 rounded-md shadow-md">
                            {getControlItem.options?.map((optionItem) => (
                                <SelectItem
                                    key={optionItem.id}
                                    value={optionItem.id}
                                    className="hover:bg-gray-100 hover:text-gray-800 cursor-pointer transition duration-200 px-3 py-2 rounded-md"
                                >
                                    {optionItem.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case 'textarea':
                return (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );

            default:
                return null;
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {formControls.map((controlItem) => (
                <div className="grid w-full gap-1.5" key={controlItem.name}>
                    <Label className="mb-1 text-gray-700 hover:text-gray-900 transition duration-200">
                        {controlItem.label}
                    </Label>
                    {renderInputsByComponentType(controlItem)}
                </div>
            ))}
            <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
                {buttonText || 'Submit'}
            </Button>
        </form>
    );
}

export default Commonform;
