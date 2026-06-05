import { NavItems } from "@/app/types/type";

type Props= {
    onNavigate:(page:NavItems)=> void
}
export default function Posts({onNavigate}:Props) {
    return (
        <main>
            <div>
                <div>
                     <h1>Post Management</h1>
                    <p>Curate Your Stories aobout Lahan</p>
                </div>
                <div>
                    <button onClick={() => onNavigate("createPost")}>
                        Create Post
                    </button>
                </div>
            </div>

            
        </main>
    );
}