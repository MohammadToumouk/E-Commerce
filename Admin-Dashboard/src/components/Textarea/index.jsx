import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function TextareaWithLabel({label, className}) {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">{label}</Label>
      <Textarea className={className} placeholder="Type your product description here." id="message" />
    </div>
  )
}
