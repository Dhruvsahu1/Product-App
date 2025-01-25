import { SelectContent, SelectItem, SelectTrigger } from "@radix-ui/react-select";
import { SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";





function Commonform({ formControls, formData, setFormData, onSubmit, buttonText }) {
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
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {getControlItem.options?.map((optionItem) => (
                                <SelectItem key={optionItem.id} value={optionItem.id}>
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
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {formControls.map((controlItem) => (
                    <div className="grid w-full gap-1.5" key={controlItem.name}>
                        <Label className="mb-1">{controlItem.label}</Label>
                        {renderInputsByComponentType(controlItem)}
                    </div>
                ))}
            </div>
            <Button type="submit" className="mt-2 w-full">
                {buttonText || 'Submit'}
            </Button>
        </form>
    );
}

export default Commonform;
