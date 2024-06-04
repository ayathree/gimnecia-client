import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
// import useAxiosPublic from "../hook/useAxiosPublic";

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const[user, setUser]= useState(null)
    const[loading,setLoading]=useState(true)
    const[reload, setReload ]=useState(false)
    const googleProvider = new GoogleAuthProvider()
    // const axiosPublic = useAxiosPublic()

    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)

    }

    const signIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const loggedOut=()=>{
        setLoading(true)
        return signOut(auth)
    }

    const updateUser = (name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName:name, photoURL:photo
        })
    }

    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            
            // if (currentUser) {
            //     const userInfo = {email:currentUser.email}
            //     axiosPublic.post('/jwt', userInfo )
            //     .then(res=>{
            //         if (res.data.token) {
            //             localStorage.setItem('access-token', res.data.token)
            //             setLoading(false)
                        
            //         }
            //     })
                
            // }
            // else{
            //     localStorage.removeItem('access-token')
            //     setLoading(false)

            // }
            console.log('current-user', currentUser)
            setLoading(false)
           
        });
        return ()=>{
            return unsubscribe();
        }
    },[reload])
    // axiosPublic
    const authInfo= {user, loading, createUser, signIn, loggedOut,updateUser, setReload,  googleSignIn}
    return (
       <AuthContext.Provider value={authInfo}>
        {
            children
        }

       </AuthContext.Provider>
    );
};

export default AuthProvider;