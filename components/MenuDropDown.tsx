import { MoreHorizontal, Pencil } from "lucide-react"
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"

interface MenuDropDownProps{
    handleEditProfile:()=>void;
    handleChangePassowrd:()=>void;
}

const MenuDropDown=({handleEditProfile,handleChangePassowrd}:MenuDropDownProps)=>{
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-transparent w-min border-none" >
                    <MoreHorizontal className="text-white"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-neutral-800/50 backdrop-blur-sm border-none text-white">
                <DropdownMenuLabel >Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleEditProfile}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Edit Profile</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleChangePassowrd}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Change Password</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MenuDropDown;