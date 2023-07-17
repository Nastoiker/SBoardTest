import axios from "axios";
import {api_url} from "@/domen.api";
import {IPost} from "@/types/User.interface";


export async  function getPosts(): Promise<IPost[]> {
        const res = await axios.get(api_url + '/post/');
        return res.data;
}
