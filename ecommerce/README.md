# Run

$ cd database
$ mongod --noauth --dbpath ./
$ cd ../server
$ npm start
$ cd ../client
$ npm start
You need sass
$ sass --watch src:src

# Personal notes
- React doesn't show false literal

# Objectives
(This looks better on VSCode)
✅ Login  
-✅ Add show password icon  
-✅ Show "You are already logged in" alert

✅ Profile  
|✅ If the user is not logged in, show 401  
|⬜️ ChangeBasicInfo part  
| |✅ Ask for password before submitting a request  
| | |✅show-hide password functionality  
| | |✅ Show a warning when it's empty  
| | | |⬜️ The warning must disappear after x seconds(I don't know how to do this, for now)  
| | | |✅ The warning can also disappear if the user clicks on the field  
| | | |✅ The red border doesn't disappear till the user clicks on the field  
| | | |✅ The warning should disappear when the user clicks on it  
| |✅ Validate email  
| |✅ Update data  
| |⬜️ Show messages  
| | |✅ Server offline  
| | |✅ Other errors  
| | | |✅ Email is already in use  
| | | |✅ The password is incorrect  
| | | |✅ If the server is offline/bad request  
| | |⬜️ Joi errors  
| | |⬜️ Success message  
| | | |⬜️ Popup is removed when the user clicks it  
| |✅ Save token locally  
| |⬜️ If the users didn't change anything the save button is disabled  
| |✅ Verify password through bcrypt  

⬜️ License  
-⬜️ Add the following attributions  
-⬜️ <a href="https://www.flaticon.com/free-icons/vision" title="vision icons">Vision icons created by Freepik - Flaticon</a>  
-⬜️ <a href="https://www.flaticon.com/free-icons/hide" title="hide icons">Hide icons created by Pixel perfect - Flaticon</a>
