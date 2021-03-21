//before refactor and handleSignin Modified
import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import fbIcon from "../../images/fb.png";
import googleIcon from "../../images/google.png";
import Header from "../Header/Header";
import firebaseConfig from "./firebase.config.js";
import "./Login.css";

// firebase.initializeApp(firebaseConfig);
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

function Login() {
  // const newUser,useState(false)
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: " ",
    email: " ",
    password: " ",
    photo: " ",
  });
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        // console.log(displayName, email, photoURL)
        // console.log(res);
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true,
        };

        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        console.log(error);
        console.log(error.message);
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credentical = error.credential;
        // // ...
      });
  };

  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var user = result.user;
        setLoggedInUser(user);
        history.replace(from);
        console.log("fb user after sign in", user);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: " ",
          email: " ",
          photo: " ",
          error: " ",
          success: false,
        };
        setUser(signedOutUser);
      })
      // Sign-out successful.
      .catch((error) => {
        // An error happened.
      });
    // console.log('SignOut Clicked');
  };

  // Fields Validation
  const handleBlur = (event) => {
    // console.log(event.target.name, event.target.value);
    let isFieldValid = true;
    if (event.target.name === "email") {
      const isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
    // console.log(event.target.value);
  };
  const handleSubmit = (event) => {
    // console.log(user.email , user.password);
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = " ";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          // history.replace(from)

          // var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          // var errorCode = error.code;
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // var errorMessage = error.message;
          // console.log(errorMessage);
          // ..
        });
    }
    // console.log("Clicked");
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = " ";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log("sign in user Info ", userCredential.user);
          // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    event.preventDefault();
  };

  const updateUserName = (name) => {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("User name updated SuccessFully");
        // Update successful.
      })
      .catch(function (error) {
        console.log(error);
        // An error happened.
      });
  };

  return (
    <div className="App">
      <Header></Header>
      {user.isSignedIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}

      <br />
      {/* <button onClick={handleFbSignIn}>Sign In with FB</button> */}

      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Email : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      {/* <h1>Our own Authentication</h1>
    <input type="checkbox"  onChange={ () =>setNewUser(!newUser)} name="newUser" id=""/>
    <label htmlFor="newUser">NewUser Sign Up</label> */}
      {/* <p> Name : {user.name}</p>
    <p>Email : {user.email}</p>
    <p>Password : {user.password}</p> */}
      <form className="form-style " onSubmit={handleSubmit}>
        <h1> {newUser ? "Create an account" : "Log In"}</h1>
        {newUser && (
          <input
            name="name"
            onBlur={handleBlur}
            placeholder="Your Name"
            type="text"
          />
        )}
        <br />
        <br />
        <input
          type="text"
          onBlur={handleBlur}
          name="email"
          placeholder="Enter Your  Email"
          required
        />
        <br />
        <br />
        <input
          type="password"
          onBlur={handleBlur}
          name="password"
          placeholder="Enter Your PassWord"
          required
        />
        <br />
        <br />
        {newUser && (
          <input
            name="name"
            onBlur={handleBlur}
            placeholder="Confirm Your PassWord"
            type="password"
          />
        )}
        <br />
        <br />
        <input
          type="submit"
          value={newUser ? "Sign Up" : "Sign In"}
          name=""
          id=""
        />
      </form>
      <label htmlFor="newUser">
        {" "}
        <strong onClick={() => setNewUser(!newUser)}>
          Don't have an account? Sign Up
        </strong>{" "}
      </label>
      <h5>Or</h5>

      <Button
        onClick={handleSignIn}
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          border: "1px solid gray",
          borderRadius: "40px",
          marginBottom: "10px",
          width: "300px",
          height: "40px",
          color: "green",
        }}
      >
        <img src={googleIcon} className="google-icon" alt="" /> Continue with
        Google{" "}
      </Button>
      <br />

      <Button
        onClick={handleFbSignIn}
        style={{
          backgroundColor: "#fff",
          border: "1px solid gray",
          borderRadius: "40px",
          width: "300px",
          marginBottom: "20px",

          height: "40px",
          color: "blue",
        }}
      >
        <img src={fbIcon} className="fb-icon" alt="" />
        Continue with Facebook{" "}
      </Button>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged in"} Successfully
        </p>
      )}
    </div>
  );
}

export default Login;

// import React, { useContext, useState } from "react";
// import { Button } from "react-bootstrap";
// import { useHistory, useLocation } from "react-router";
// import { UserContext } from "../../App";
// import fbIcon from "../../images/fb.png";
// import googleIcon from "../../images/google.png";
// import Header from "../Header/Header";
// import "./Login.css";
// import {
//   createUserWithEmailAndPassword,
//   handleFbSignIn,
//   handleGoogleSignIn,
//   handleSignOut,
//   initializeLoginFramework,
//   signInWithEmailAndPassword
// } from "./loginManager";

// function Login() {
//   // const newUser,useState(false)
//   const [newUser, setNewUser] = useState(false);

//   const [user, setUser] = useState({
//     isSignedIn: false,
//     name: " ",
//     email: " ",
//     password: " ",
//     photo: " ",
//   });

//   initializeLoginFramework();
//   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
//   const history = useHistory();
//   const location = useLocation();
//   let { from } = location.state || { from: { pathname: "/" } };

//   const googleSignIn = () => {
//     handleGoogleSignIn().then((res) => {
//       setUser(res);
//       setLoggedInUser(res);
//       history.replace(from);
//     });
//   };

//   const signOut = () => {
//     handleSignOut().then((res) => {
//       setUser(res);
//       setLoggedInUser(res);
//       history.replace(from);
//     });
//   };
//   const fbSignIn = () => {
//     handleFbSignIn().then((res) => {
//       setUser(res);
//       setLoggedInUser(res);
//       history.replace(from);
//     });
//   };

//   // Fields Validation
//   const handleBlur = (event) => {
//     // console.log(event.target.name, event.target.value);
//     let isFieldValid = true;
//     if (event.target.name === "email") {
//       const isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
//     }
//     if (event.target.name === "password") {
//       const isPasswordValid = event.target.value.length > 6;
//       const passwordHasNumber = /\d{1}/.test(event.target.value);
//       isFieldValid = isPasswordValid && passwordHasNumber;
//     }
//     if (isFieldValid) {
//       const newUserInfo = { ...user };
//       newUserInfo[event.target.name] = event.target.value;
//       setUser(newUserInfo);
//     }
//     // console.log(event.target.value);
//   };
//   const handleSubmit = (event) => {
//     // console.log(user.email , user.password);
//     if (newUser && user.email && user.password) {
//       createUserWithEmailAndPassword(user.name,user.email && user.password).then(
//         (res) => {
//           setUser(res);
//           setLoggedInUser(res);
//           history.replace(from);
//         }
//       );
//     }
//     // console.log("Clicked");
//     if (!newUser && user.email && user.password) {
//       signInWithEmailAndPassword(user.email, user.password).then(
//         (res) => {
//           console.log(res);
//           setUser(res);
//           setLoggedInUser(res);
//           history.replace(from);
//         }
//       );
//     }
//     event.preventDefault();
//   };

//   return (
//     <div className="App">
//       <Header></Header>

//       <br />

//       <form className="form-style " onSubmit={handleSubmit}>
//         <h1> {newUser ? "Create an account" : "Log In"}</h1>
//         {newUser && (
//           <input
//             name="name"
//             onBlur={handleBlur}
//             placeholder="Your Name"
//             type="text"
//             required
//           />
//         )}
//         <br />
//         <br />
//         <input
//           type="text"
//           onBlur={handleBlur}
//           name="email"
//           placeholder="Enter Your  Email"
//           required
//         />
//         <br />
//         <br />
//         <input
//           type="password"
//           onBlur={handleBlur}
//           name="password"
//           placeholder="Enter Your PassWord"
//           required
//         />
//         <br />
//         <br />
//         {newUser && (
//           <input
//             type="password"
//             name="password"
//             onBlur={handleBlur}
//             placeholder="Confirm password"
//             required
//           />
//         )}
//         <br />
//         <br />

//         <input
//           type="submit"
//           value={newUser ? "Sign Up" : "Sign In"}
//           name=""
//           id=""
//         />
//       </form>
//       {/* <input
//         type="checkbox"
//         onClick={() => setNewUser(!newUser)}
//         name="newUser"
//         id=""
//       /> */}
//       <label htmlFor="newUser">
//         {" "}
//         <strong onClick={() => setNewUser(!newUser)}>
//           Don't have an account? Sign Up
//         </strong>{" "}
//       </label>
//       <h5>Or</h5>

//       <Button
//         onClick={googleSignIn}
//         style={{
//           alignItems: "center",
//           backgroundColor: "#fff",
//           border: "1px solid gray",
//           borderRadius: "40px",
//           marginBottom: "10px",
//           marginLeft: "5px",
//           width: "30%",
//           height: "40px",
//           color: "green",
//         }}
//       >
//         <img src={googleIcon} className="google-icon" alt="" /> Continue with
//         Google{" "}
//       </Button>
//       <br />

//       <Button
//         onClick={fbSignIn}
//         style={{
//           backgroundColor: "#fff",
//           border: "1px solid gray",
//           borderRadius: "40px",
//           width: "30%",
//           marginBottom: "20px",
//           marginLeft: "5px",
//           height: "40px",
//           color: "blue",
//         }}
//       >
//         <img src={fbIcon} className="fb-icon" alt="" />
//         Continue with Facebook{" "}
//       </Button>
//       <p style={{ color: "red" }}>{user.error}</p>
//       {user.success && (
//         <p style={{ color: "green" }}>
//           User {newUser ? "Created" : "Logged in"} Successfully
//         </p>
//       )}
//     </div>
//   );
// }

// export default Login;

//not using now
// import "firebase/auth";
// import React, { useContext, useState } from "react";
// import { Button } from "react-bootstrap";
// import { useHistory, useLocation } from "react-router-dom";
// import { UserContext } from "../../App";
// import fbIcon from "../../images/fb.png";
// import googleIcon from "../../images/google.png";
// import {
//   createUserWithEmailAndPassword,
//   handleFbSignIn,
//   handleGoogleSignIn,
//   handleSignOut,
//   initializeLoginFramework,
//   signInWithEmailAndPassword
// } from "./loginManager";
// const Login = () => {
//   const [newUser, setNewUser] = useState(false);
//   const [user, setUser] = useState({
//     isSignedIn: false,
//     name: "",
//     email: "",
//     password: "",
//   });
//   initializeLoginFramework();
//   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
//   const history = useHistory();
//   const location = useLocation();
//   let { from } = location.state || { from: { pathname: "/" } };
//   const googleSignIn = () => {
//     handleGoogleSignIn().then((res) => {
//       handleResponse(res, true);
//     });
//     console.log(handleGoogleSignIn);
//   };
//   const fbSignIn = () => {
//     handleFbSignIn().then((res) => {
//       handleResponse(res, true);
//     });
//   };
//   const signOut = () => {
//     handleSignOut().then((res) => {
//       handleResponse(res, false);
//     });
//   };
//   const handleResponse = (res, redirect) => {
//     setUser(res);
//     setLoggedInUser({ ...res, name: res.displayName });
//     if (redirect) {
//       history.replace(from);
//     }
//   };
//   const handleBlur = (e) => {
//     let isFieldValid = true;
//     if (e.target.name === "email") {
//       const isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
//       if (!isFieldValid) {
//         alert("Please enter correct email address");
//       }
//     }
//     if (e.target.name === "password") {
//       const isPasswordValid = e.target.value.length > 6;
//       const passwordHasNumber = /\d{1}/.test(e.target.value);
//       isFieldValid = isPasswordValid && passwordHasNumber;
//       if (newUser) {
//         if (!isPasswordValid) {
//           alert("Please enter minimum 6 character with number value");
//         }
//       }
//     }
//     if (isFieldValid) {
//       const newUserInfo = { ...user };
//       newUserInfo[e.target.name] = e.target.value;
//       setUser(newUserInfo);
//     }
//   };
//   const handleSubmit = (e) => {
//     if (newUser && user.email && user.password) {
//       createUserWithEmailAndPassword(user.name, user.email, user.password).then(
//         (res) => {
//           handleResponse(res, true);
//         }
//       );
//     }
//     if (!newUser && user.email && user.password) {
//       signInWithEmailAndPassword(user.email, user.password).then((res) => {
//         console.log(res);
//         handleResponse(res, true);
//       });
//     }
//     e.preventDefault();
//   };
//   return (
//     <div className="login-page" style={{ textAlign: "center" }}>
//       <form className="form-style " onSubmit={handleSubmit}>
//         <h1> {newUser ? "Create an account" : "Log In"}</h1>
//         {newUser && (
//           <input
//             name="name"
//             type="text"
//             onBlur={handleBlur}
//             placeholder="Your name"
//           />
//         )}
//         <br />
//         <br />
//         <input
//           type="email"
//           name="email"
//           onBlur={handleBlur}
//           placeholder="Enter email address"
//           required
//         />
//         <br />
//         <br />
//         <input
//           type="password"
//           name="password"
//           onBlur={handleBlur}
//           placeholder="Password"
//           required
//         />
//         <br />
//         <br />
//         {newUser && (
//           <input
//             type="password"
//             name="password"
//             onBlur={handleBlur}
//             placeholder="Confirm password"
//           />
//         )}
//         <br />
//         <br />
//         <input
//           type="submit"
//           className="signIn-button"
//           value={newUser ? "Sign Up" : "Sign In"}
//         />
//       </form>
//       <p style={{ color: "red" }}>{user.error}</p>
//       {user.success && (
//         <p style={{ color: "green" }}>
//           User {newUser ? "Created" : "Logged in"} Successfully
//         </p>
//       )}
//       <input
//         type="checkbox"
//         onChange={() => setNewUser(!newUser)}
//         name="newUser"
//         id=""
//       />
//       <label htmlFor="newUser">
//         {" "}
//         <strong>Don't have an account? Sign Up</strong>{" "}
//       </label>
//       <h5>Or</h5>
//       <Button
//         onClick={googleSignIn}
//         style={{
//           alignItems: "center",
//           backgroundColor: "#fff",
//           border: "1px solid gray",
//           borderRadius: "40px",
//           marginBottom: "10px",
//           marginLeft: "5px",
//           width: "30%",
//           height: "40px",
//           color: "green",
//         }}
//       >
//         <img src={googleIcon} className="google-icon" alt="" /> Continue with
//         Google{" "}
//       </Button>
//       <br />
//       <Button
//         onClick={fbSignIn}
//         style={{
//           backgroundColor: "#fff",
//           border: "1px solid gray",
//           borderRadius: "40px",
//           width: "30%",
//           marginBottom: "20px",
//           marginLeft: "5px",
//           height: "40px",
//           color: "blue",
//         }}
//       >
//         <img src={fbIcon} className="fb-icon" alt="" />
//         Continue with Facebook{" "}
//       </Button>
//     </div>
//   );
// };
// export default Login;
