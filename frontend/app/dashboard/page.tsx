import Image from "next/image";

export default function DashboardPage(){
    return(
        <div className="min-h-screen  flex  bg-gray-100">
            <div > 
                <div className="flex items-center justify-center  gap-4">
                    <div>
                        <Image src="/images/logo-removebg-preview.png" alt="logo" width={64} height={64} />
                    </div>
                    <div>
                        <h1>DashBoard</h1>
                        <p>Welcome to the dashboard page.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}