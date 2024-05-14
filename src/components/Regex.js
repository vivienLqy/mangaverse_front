
export const validName = new RegExp(
    '^[a-zA-ZÀ-ÿ\\-\']+$'
);
export const validEmail = new RegExp(
    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
);
export const validTel = new RegExp(
    '^0[1-9]([-. ]?[0-9]{2}){4}$'
);
export const validSujet = new RegExp(
    '^[\w\s\d.,!?()-]+$'
);
export const validMsg = new RegExp(
    '^[\s\S]*$'
);
  // const [name, setName] = useState("");
  // const [prenom, setPrenom] = useState("");
  // const [email, setEmail] = useState("");
  // const [tel, setTel] = useState("");
  // const [sujet, setSujet] = useState("");
  // const [message, setMessage] = useState("");
  // const [nameErr, setNameErr] = useState("false");
  // const [emailErr, setEmailErr] = useState("false");
  // const [telErr, setTelErr] = useState("false");

  // const validate = () => {
  //   if (!validName.test(name)) {
  //     setNameErr(true);
  //   }
  //   if (!validEmail.test(email)) {
  //     setEmailErr(true);
  //   }
  //   if (!validTel.test(tel)) {
  //     setTelErr(true);
  //   }
  // };