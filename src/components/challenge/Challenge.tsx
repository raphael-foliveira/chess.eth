import{ useCallback, useState } from "react";
import { toast } from 'react-toastify';
import styles from "./Challenge.module.css";
import { canCreateChallenge } from "./validations";

interface FormData {
  token: string;
  email: string;
}
interface ChallengeProps {
  getUser: (user: any) => void
}
export default function  Challenge({getUser}: ChallengeProps) {
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const onSubmit = async () => {
    try {
     const parsedData = {
       token,
       email
     } as FormData;
     console.log('parsedData', parsedData)
   await canCreateChallenge(parsedData)
   //const user =  api.asdsadsadsadsa
     //getUser(user)
     console.log('parsedData', parsedData)
     toast.success('Hello world!',{
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
       });

    } catch(err) {
    
     toast.error('Error',{
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
       });
    }
 }
  return (
    <div className={styles.challengeContainer}>
      <form  onSubmit={onSubmit}>
        <div className={styles.challengeFormContainer}>
        <input title="token" type="text" onChange={(e) =>  setToken(e.target.value)} placeholder="Enter your lichess token"/>
        <input title="email" type="text" onChange={(e) =>  setEmail(e.target.value)} placeholder="Enter your lichess email account"/>
        </div>
        <button type="submit">CHALLENGE ME!</button>
      </form>
    </div>
  );
}
