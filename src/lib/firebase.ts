// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes , getDownloadURL,ref} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pinacle-ai.firebaseapp.com",
  projectId: "pinacle-ai",
  storageBucket: "pinacle-ai.appspot.com",
  messagingSenderId: "632223994618",
  appId: "1:632223994618:web:65d795392beb1caf7fef43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadFileToFirebase(image_url:string, name:string){
    try{
        const response = await fetch(image_url)
        const buffer = await response.arrayBuffer();
        const file_name = name.replace(' ' , ' ') + Date.now + '.jpg';
        const storageRef = ref(storage, file_name)
        await uploadBytes (storageRef,buffer, {
            contentType: 'image/jpeg',
        })
        const firebase_url = await getDownloadURL(storageRef);
        return firebase_url;


    }
    catch(err){
        console.error(err);

    }
}

