"use server"

import { auth } from "../../utils/auth";

export default async function userExists() {
    const session = await auth()
    
    if(!session?.user) {
        console.log(`session doesn't exists`);
        
        return null
    }
    console.log('log from getUser.tsx : ',session.user.name);
    return session
}

export async function userIfExists() {
    const session = await auth()
    
    if(!session?.user) {
        console.log(`session doesn't exists`);
        
        return null
    }
    console.log('log from getUser.tsx : ',session.user.name);
    return session.user.name
}