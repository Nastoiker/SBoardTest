import {notFound} from "next/navigation";
import {IPost} from "@/types/User.interface";
import axios from "axios";
import {api_url} from "@/domen.api";
import {getPosts} from "@/actions/api";
// import {Metadata} from "next";

interface PageProps {
    params: { postId: string },
};
export const dynamicParams = true;
// export async function generateMetadata({ params }: { params: { postId: string } }): Promise<Metadata> {
//     const page = await getPost(params.postId);
//     return {
//         title: page?.title,
//     }
// }

 async  function getPost(postId: string): Promise<IPost | null>  {
        const res = await axios.get(api_url + '/post/' + postId);
        return  res.data;

}
 async function getStaticProps(): Promise<{ postId: string }[]> {
    const menu = await getPosts();
    return menu.map(page => ({ postId: page.id.toString() }));
}
async function PostPage({ params }: PageProps) {
    const postId = params.postId;
    const post = await getPost(postId);
    if(!post) {
        return notFound();
    }
    return (
        <section className={"grid  "}>
            <div className={"flex max-w-[980px] mx-auto flex-col mt-20 gap-2"}  >
                <div className="space-y-4">
                    <h1 className="inline-block text-4xl font-extrabold tracking-tight  lg:text-5xl">
                        {post.title}
                    </h1>
                    <p className="text-2xl">
                        {post.content}
                    </p>
                </div>
                <hr className="my-4 border-slate-200" />
                <h1 className="inline-block text-lg font-bold tracking-tight" >

                    {post.user?.firstName}<br/>
                    {post.user?.lastName}
                </h1>
                <div>


                </div>
            </div>
        </section>
    )
}
export default PostPage;