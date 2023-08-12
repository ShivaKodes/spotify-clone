import { UserDetails } from "@/types"


interface ProfileProps{
    user:UserDetails[]
}

const ProfileForm = ({user}:ProfileProps)=>{

    console.log( "user",user)
    return(
        <div className="mt-5 flex flex-col text-white">
            <p>Fullname</p>
            <p>{user[0].full_name!==null ?user[0].full_name:"No name"}</p>
        </div>
    )
}

export default ProfileForm