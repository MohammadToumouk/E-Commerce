import { useState } from 'react'
import "./StoreCombobox.css"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from '@/components/ui/button'
import { ChevronDown, LucidePlusCircle, Store as StoreIcon } from "lucide-react"
import { Command, CommandList, CommandInput, CommandEmpty, CommandItem, CommandSeparator } from '../ui/command'
import { CommandGroup } from 'cmdk'

const StoreCombobox = () => {
  const [open, setOpen] = useState(false)

  const onStoreSelect = (store) => {
    setOpen(false)
  }

  return (
    <Popover className="store-container" open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
            <>
                <Button className="store-button" variant="ghost" size="sm" aria-haspopup="combobox" aria-expanded={open} aria-label="Select a Store">
                    <StoreIcon className="store-icon mr-2 h-4 w-3" size={24} />
                    <span className="store-name">EMAzing Store</span>
                    {/* <ChevronDown className="store-chevron" size={18} /> */}
                </Button>
            </>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start" width="full" height="full">
            <Command>
                <CommandList>
                        <CommandInput placeholder="Search for a store" className="store-search" />
                        <CommandEmpty>No stores found</CommandEmpty>
                        <CommandGroup title="Stores">
                            <CommandItem 
                              className="store-item"
                              onSelect={() => onStoreSelect("EMAzing Store")}
                            >
                                <div className="flex justify-center items-center">
                                    <StoreIcon className="store-icon mr-2 h-4 w-3" size={24} />
                                    <span className="store-namepopover">EMAzing Store</span>
                                </div>
                            </CommandItem>
                        </CommandGroup>
                </CommandList>
                <CommandSeparator />
                <CommandList>
                   <CommandGroup title="Actions">
                    <CommandItem className="store-item" onSelect={() => setOpen(false)}>
                        <LucidePlusCircle className="store-icon mr-2 h-4 w-3" size={24} />
                        <div className="flex justify-center items-center">
                            <span className="store-namepopover">Create a new store</span>
                        </div>
                    </CommandItem>
                     </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
    )
 
}

export default StoreCombobox
