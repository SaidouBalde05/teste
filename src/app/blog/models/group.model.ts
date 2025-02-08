// import { User } from "../../auth/models/user";

// export interface GroupModel {
//     id?: number;
//     name: string;
//     description?: string;
//     createdAt: string;
//     members: User[];
//     admins: User[];
//   }
import { User } from "../../auth/models/user";
import { publishBlog } from "./publish-model";

export interface GroupModel {
    id?: number;
    name: string;
    description?: string;
    createdAt: string;
    members: User[];
    admins: User[];
    sharedBlogs: publishBlog[]; 
}
