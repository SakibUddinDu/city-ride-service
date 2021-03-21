
import firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebase.config';

// firebase.initializeApp(firebaseConfig);
export const initializeLoginFramework = () => {

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};
  export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
   return firebase
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
        success : true
      };
      return signedInUser;
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

export const handleFbSignIn = () =>{
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  return firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    user.success =true;
    return user;
    // console.log('fb user after sign in' , user);

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    // var accessToken = credential.accessToken;

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
}

export const handleSignOut = () =>{
  return firebase.auth().signOut()
  .then(res=> {
    const signedOutUser = {
      isSignedIn : false,
      name : ' ',
      email : ' ',
      photo : ' ',
      error : ' ',
      success :false     
    }
  return signedOutUser;
  })
    // Sign-out successful.
  .catch(error => {
    // An error happened.
  });
  // console.log('SignOut Clicked');
}


export const createUserWithEmailAndPassword = (name, email, password) => {
   return firebase.auth().createUserWithEmailAndPassword(name, email, password)
        .then(res => {
          const newUserInfo = res.user;
          newUserInfo.error = ' ';
          newUserInfo.success = true;
          updateUserName(name)
          return newUserInfo;
        })

        .catch(error => {
          // Handle Errors here.
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) =>{
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const newUserInfo = userCredential.user;
    newUserInfo.error= ' ';
    newUserInfo.success= true;
     return newUserInfo;
    // console.log('sign in user Info ' ,  userCredential.user);
    // ...
  })
  .catch((error) => {
       const newUserInfo = {};
        newUserInfo.error= error.message;
        newUserInfo.success= false;
        return newUserInfo;
  });
}

const updateUserName = name =>{
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(function() {
    console.log("User name updated SuccessFully");
    // Update successful.
  }).catch(function(error) {
    console.log(error);
    // An error happened.
  });
}





//OLd
// import firebase from 'firebase/app';
// import "firebase/auth";
// import firebaseConfig from './firebase.config';

// export const initializeLoginFramework = () => {
//   if (firebase.apps.length === 0) {
//     firebase.initializeApp(firebaseConfig);
//   }
// }

// export const handleGoogleSignIn = () => {
//     const googleProvider = new firebase.auth.GoogleAuthProvider();

//    return firebase.auth().signInWithPopup(googleProvider)
//         .then(res => {
//             const { displayName, email, photoURL } = res.user;
//             const signedInUser = {
//                 isSignedIn: true,
//                 name: displayName,
//                 email: email,
//                 photo: photoURL,
//                 success: true
//             }
//             return signedInUser;

//         })

//         .catch(error => {
//             console.log(error);
//             console.log(error.message);
//         })

// }

// export const handleFbSignIn = () => {
//     const fbProvider = new firebase.auth.FacebookAuthProvider();

//     return firebase.auth().signInWithPopup(fbProvider).then(function (result) {
//         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//         var token = result.credential.accessToken;
//         // The signed-in user info.
//         var user = result.user;
//         user.success = true;
//         return user;
//         // ...
//     }).catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // The email of the user's account used.
//         var email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//         // ...
//     });
// }

// export const handleSignOut = () => {
//    return firebase.auth().signOut()
//       .then(res => {
//         const signOutUser = {
//           isSignedIn: false,
//           name: '',
//           photo: '',
//           email: '',
//           password: '',
//           error: '',
//           success: false
//         }

//         return (signOutUser);

//       })

//       .catch(err => {

//       })
//   }

// export const createUserWithEmailAndPassword = (name, email, password) => {
//    return firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then(res => {
//           const newUserInfo = res.user;
//           newUserInfo.error = '';
//           newUserInfo.success = true;
//           updateUserName(name);
//           return newUserInfo;
//         })

//         .catch(error => {
//           // Handle Errors here.
//           const newUserInfo = {};
//           newUserInfo.error = error.message;
//           newUserInfo.success = false;
//           return newUserInfo;
//         });
// }

// export const signInWithEmailAndPassword = (email, password) => {
//   return firebase.auth().signInWithEmailAndPassword(email, password)
//         .then(res => {

//           const newUserInfo = res.user;
//           newUserInfo.error = '';
//           newUserInfo.success = true;
//          return newUserInfo;
//         })

//         .catch(function (error) {
//           // Handle Errors here.
//           const newUserInfo = {};
//           newUserInfo.error = error.message;
//           newUserInfo.success = false;
//           return newUserInfo;
//           // ...
//         });

// }

//  const updateUserName = name => {
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//       displayName: name,
//     }).then(function () {
//       console.log('user name update successfully');
//       // Update successful.
//     }).catch(function (error) {
//       console.log(error)
//       // An error happened.
//     });
//   }
