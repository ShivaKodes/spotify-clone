import getUserDetail from "@/actions/getUserDetail";
import AccountContent from "@/components/AccountContent"
import Header from "@/components/Header"


export const revalidate = 0;
const AccountPage=async ()=>{
    const user = await getUserDetail();
    return(
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-hidden">
            <Header className="from-fuchsia-500" >

            <div className="mb-2 flex flex-col gap-y-6">
                <h1 className="text-white text-3xl font-semibold">
                    Profile
                </h1>
            </div>
            </Header >
            <AccountContent userData={user!}/>
        </div>
    )
}

export default AccountPage