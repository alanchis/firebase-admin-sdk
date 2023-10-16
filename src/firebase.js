require("dotenv").config()
const { uuid } = require('uuidv4');

const {initializeApp, applicationDefault} = require("firebase-admin/app")

const {getAuth, updateEmail} = require("firebase-admin/auth")
const {getFirestore} = require("firebase-admin/firestore")

// console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const app = initializeApp()










// FUNCTION GET INFO BY EMAIL  (retrieve user data)
function getInfoByEmail (email){

    getAuth()
  .getUserByEmail(email)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data: ${JSON.stringify(userRecord)}`);
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });
}

        // getInfoByEmail(email)










// FUNCTION GET INFO BY ID (retreive user data)
function getInfoById(uid){
getAuth()
  .getUser(uid)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data: ${JSON.stringify(userRecord)}`);
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });
}

const id1 = "y0u0TYPUd0VBsYyA4CoiC78JodX2"
        // getInfoById(id1)












// FUNCTION GET USER BY PHONE (retreive user data)
function getUserByPhone(phoneNumber){
    getAuth()
  .getUserByPhoneNumber(phoneNumber)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data:  ${JSON.stringify(userRecord)}`);
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });


}

const phoneNumberSearch = "+525586141975"
// getUserByPhone(phoneNumberSearch)









// FUNCTION GET USERS DATA 
function retreiveUsersData(array){
    getAuth()
  .getUsers(array)
  .then((getUsersResult) => {
    console.log('Successfully fetched user data:');
    getUsersResult.users.forEach((userRecord) => {
      console.log(userRecord);
    });
    console.log('Unable to find users corresponding to these identifiers:');
    getUsersResult.notFound.forEach((userIdentifier) => {
      console.log(userIdentifier);
    });
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });
}

const usersInformation = [
    { uid: 'P2cl7Bh1KdbbkRamMh3kk864epp2' },
    { email: 'alan.cruz.tmz@gmail.com' },
    { phoneNumber: '+525586141975' },
]

// retreiveUsersData(usersInformation)








// FUNCTION CREATE A NEW USER
function createANewUserFirebaseAuthentication(userInfo){
    getAuth()
  .createUser(userInfo)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });
}

const newUserInformation = {
    email: 'username@example.com',
    emailVerified: false,
    phoneNumber: '+11236532890',
    password: 'secretPassword',
    displayName: 'John Doe',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false,
}

// createANewUserFirebaseAuthentication(newUserInformation)










// FUNCTION UPDATE A USER
function updateUser(uid, userInfoUpdate){
    getAuth()
  .updateUser(uid, userInfoUpdate)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });
}

const idUpdate = "2McfpyiG7oUuSF4MMXIMmqhrOhV2"
const userInfoUpdate = {   
    email: 'victor1@yahoo.com',
    emailVerified: false,
    phoneNumber: '+52551111111',
    password: 'Password',
    displayName: 'Victor Aquino',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false,
}

updateUser(idUpdate, userInfoUpdate);












// FUNCTION DELETE USER
function deleteUser(uid){
    getAuth()
  .deleteUser(uid)
  .then(() => {
    console.log('Successfully deleted user');
  })
  .catch((error) => {
    console.log('Error deleting user:', error);
  });
}

const idForDeletion = "ZVXJ98w7QLcxzMACdfcDzkruJWB3"

deleteUser(idForDeletion)








// FUNCTION DELETE MULTIPLE USERS
function deleteMultipleUsers(uids){
    getAuth()
    .deleteUsers(uids)
    .then((deleteUsersResult) => {
      console.log(`Successfully deleted ${deleteUsersResult.successCount} users`);
      console.log(`Failed to delete ${deleteUsersResult.failureCount} users`);
      deleteUsersResult.errors.forEach((err) => {
        console.log(err.error.toJSON());
      });
    })
    .catch((error) => {
      console.log('Error deleting users:', error);
    });
}

const uidsToDelete = [
    "weINaEhWTkPq7O5lYIiZH3ZoQ1o2",
    "y0u0TYPUd0VBsYyA4CoiC78JodX2"
]

// deleteMultipleUsers(uidsToDelete)









// FUNCTION LIST ALL USERS 
function listAllUsers(nextPageToken){
    getAuth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
}

// listAllUsers()












// FUNCTION IMPORT USERS
// Up to 1000 users can be imported at once.
const userImportRecords = [
    {
      uid: uuid(),
      email: 'user1@example.com',
      passwordHash: Buffer.from('passwordHash1'),
      passwordSalt: Buffer.from('salt1'),
    },
    {
      uid: uuid(),
      email: 'user2@example.com',
      passwordHash: Buffer.from('passwordHash2'),
      passwordSalt: Buffer.from('salt2'),
    },
    {
      uid: uuid(),
      email: 'user3@example.com',
      passwordHash: Buffer.from('passwordHash2'),
      passwordSalt: Buffer.from('salt2'),
      phoneNumber: '+525586141978',
    },
    {
      uid: uuid(),
      email: 'user4@example.com',
      passwordHash: Buffer.from('passwordHash2'),
      passwordSalt: Buffer.from('salt2'),
    },
    {
      uid: uuid(),
      email: 'user5@example.com',
      passwordHash: Buffer.from('passwordHash2'),
      passwordSalt: Buffer.from('salt2'),
    },
    
    //...
  ];



function importUsers(users){
    getAuth()
  .importUsers(users, {
    hash: {
      algorithm: 'HMAC_SHA256',
      key: Buffer.from('secretKey'),
    },
  })
  .then((userImportResult) => {
    // The number of successful imports is determined via: userImportResult.successCount.
    console.log(userImportResult.successCount +" users were imported");
    console.log(userImportResult.failureCount + " users failed while importing");
    // The number of failed imports is determined via: userImportResult.failureCount.
    // To get the error details.
    userImportResult.errors.forEach((indexedError) => {
      // The corresponding user that failed to upload.
      console.log(
        'Error ' + indexedError.index,
        ' failed to import: ',
        indexedError.error
      );
    });
  })
  .catch((error) => {
    // Some unrecoverable error occurred that prevented the operation from running.
  });
}

// importUsers(userImportRecords)





// Set user email address

// function pruebaVic(email){
//   const auth = getAuth();
// updateEmail(auth.currentUser, "user@example.com").then(() => {
//   // Email updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });


// }
