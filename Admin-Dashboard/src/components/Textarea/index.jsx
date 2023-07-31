import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function TextareaWithLabel({ label, className, placeholder, onChange }) {
  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (event) => {
    const newValue = event.target.value;
    setTextareaValue(newValue);

    // If you want to pass the value to the parent component as well,
    // you can call the onChange prop with the new value.
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">{label}</Label>
      <Textarea className={className} placeholder={placeholder} id="message" value={textareaValue} onChange={handleTextareaChange} />
    </div>
  )
}
