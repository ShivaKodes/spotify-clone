import AccountContent from "@/components/AccountContent"
import Header from "@/components/Header"

const AccountPage=()=>{
    return(
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-hidden">
            <Header className="from-fuchsia-500" >

            <div className="mb-2 flex flex-col gap-y-6">
                <h1 className="text-white text-3xl font-semibold">
                    Account Settings
                </h1>
            </div>
            </Header >
            <AccountContent/>
        </div>
    )
}

export default AccountPage