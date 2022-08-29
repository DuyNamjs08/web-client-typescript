
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/firebase-Config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const registerUser = async (props:any) => {
  const { email, password, firstName, lastName } = props
  // return createUserWithEmailAndPassword(auth, email, password)
  //   .then((user)=>user)
  //   .catch((error) => {
  //     console.log("error :", error.message);
  //   });
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'user', res.user.uid), {
      email,
      password,
      firstName,
      lastName,
      timestamp: serverTimestamp()
    });
    return res;
  } catch (error :any) {
    console.log('error is :', error.message);
  }
};
export const loginUser = (props:any) => {
  const { email, password } =props
  return signInWithEmailAndPassword(auth, email, password)
    .then((user) => user)
    .catch((error) => {
      console.log('error :', error.message);
    });
};
export const logoutUser = () => {
  return signOut(auth).then(() => {
  }).catch((error) => {
    console.log('error :', error.message);
  });
};
