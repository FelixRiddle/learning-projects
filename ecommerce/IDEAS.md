# Objectives

(This looks better on VSCode)
---- Frontend ----
⬜️ Consumer help  
| ⬜️ Page on price variations  
| ⬜️ Tutorials on how to use the website

⬜️ Home  
| ✅ Products panel-like view  
| | ✅ Dynamic  
| ✅ Row-like view

✅ Create Product  
| ✅ Form  
| | ✅ Upload file  
| | ✅ Icon for upload  
| | ✅ Show big image on the left  
| | | ✅ Fixed image size  
| | | ✅ The image re-scales when the user resizes the window  
| | | ✅ There are arrows to navigate through each image  
| | | ✅ The user can select an image  
| | | ✅ Add a control bar below the big image  
| | | | ✅ Arrows for navigation  
| | | | ✅ Arrows for MOVING the image  
| | | | ✅ Delete image  
| | | | ✅ Change image  
| | | | ✅ Add image  
| | ✅ Show tiny images below  
| | | ✅ Add feedback to the selected image  
| | | ✅ When it's full of images, the last is disabled.  
| ✅ Feedback  
| | ✅ Status alerts  
| | ⬜️ Show an error when the maximum amount of images has been reached

✅ Login  
| ✅ Add show password icon  
| ✅ Show "You are already logged in" alert  
| ⬜️ Forgot password  
| | ⬜️ Resend email

⬜️ Navbar  
| ✅ Add a search input  
| | ⬜️ Search for products  
| ✅ Icon/Links  
| | ⬜️ Notifications  
| | | ⬜️ When hovered should open a small window containing notifications  
| | | ⬜️ Notifications to implement  
| | | | ⬜️ When the purchase was successful or when it failed  
| | | | ⬜️ Comment mentions  
| | | | ⬜️ Comments on their products  
| | ✅ Replace every link with icons  
| | ✅ Show words if icons are not available  
| | ⬜️ Add a small pop-up that tells what the icon is for.

⬜️ Product view  
| ✅ Price component  
| ✅ Buy/Add to cart buttons  
| | ⬜️ Buy functionality  
| ✅ Dynamic  
| ✅ Image selector  
| ⬜️ Edit product button/icon(only for the owner)  
| ⬜️ Delete product button/icon(only for the owner)  
| ⬜️ Comments  
| | ⬜️ Report comment  
| | ⬜️ Like comment  
| | ⬜️ Dislike comment  
| | | ⬜️ Disliked comments should be hidded(like, moved to
the last index of the array).  
| ⬜️ Reviews

✅ Profile  
| ⬜️ Search bar for settings  
| ✅ If the user is not logged in, show 401  
| ✅ ChangeBasicInfo part  
| | ✅ Ask for password before submitting a request  
| | | ✅ show-hide password functionality  
| | | ⬜️ Show a warning when it's empty  
| | | | ⬜️ The warning must disappear after x seconds(I don't know how to do this, for now)  
| | | | ⬜️ The warning can also disappear if the user clicks on the field  
| | | | ⬜️ The red border doesn't disappear till the user clicks on the field  
| | | | ⬜️ The warning should disappear when the user clicks on it  
| | ⬜️ Email  
| | | ✅ Validate email  
| | | ⬜️ If it is changed, send verification email  
| | ✅ Update data  
| | ⬜️ Show messages  
| | | ⬜️ Server offline  
| | | ⬜️ Other errors  
| | | | ⬜️ Email is already in use  
| | | | ⬜️ The password is incorrect  
| | | | ⬜️ If the server is offline/bad request  
| | | ⬜️ Joi validation errors  
| | | ⬜️ Success message  
| | | | ⬜️ Popup is removed when the user clicks it  
| | ✅ Save token locally  
| | ✅ Verify password through bcrypt  
| ✅ Change password  
| | ✅ Refresh token  
| | ✅ show-hide password for the three fields  
| | ✅ Messages  
| | | ✅ Password length must be at least 8 characters long  
| | | ✅ New password and repeat must be the same  
| | | ✅ Joi validation(the password cannot be very large)  
| | | ✅ Current password isn't correct  
| | | ✅ Password updated successfully  
| ✅ Address  
| | ⬜️ Messages  
| | | ⬜️ Joi validation  
| | | ⬜️ Success  
| | ✅ Refresh token  
| | ✅ Backend functionality  
| | | ✅ Validate data with joi  
| | | ✅ Error handling  
| | | ✅ Update data  
| ⬜️ Products  
| | ✅ Infinite scroll  
| | ⬜️ Edit products  
| | ⬜️ Delete products  
| ⬜️ Improve Styling

⬜️ Register  
| ✅ Register form  
| ✅ Feedback  
| | ✅ Status messages  
| ⬜️ Email verification  
| | ⬜️ Option to resend the email  
| | | ⬜️ Also validate that this option has a limit and cannot be executed often

---- Backend ----  
| ⬜️ Add a log system

⬜️ Auth  
| ⬜️ Register  
| | ⬜️ Email verification process


--- Components ---  
⬜️ Field  
| ⬜️ The user is able to reset the content of the field(mainly for the profile)

⬜️ Notification messages  
| ⬜️ Move the notification as the user scrolls the page

---- Others ----  
| ⬜️ Add diferent website styling options.

|Hardmode  
| | ⬜️ Drag and drop with the small images.

⬜️ Licenses  
|⬜️ Add the following attributions  
| |⬜️ show: <a href="https://www.flaticon.com/free-icons/vision" title="vision icons">Vision icons created by Freepik - Flaticon</a>  
| |⬜️ hide: <a href="https://www.flaticon.com/free-icons/hide" title="hide icons">Hide icons created by Pixel perfect - Flaticon</a>  
| |⬜️ bag_1: <a href="https://www.flaticon.com/free-icons/bag" title="bag icons">Bag icons created by Phoenix Group - Flaticon</a>  
| |⬜️ bag_2: <a href="https://www.flaticon.com/free-icons/shopping-cart" title="shopping cart icons">Shopping cart icons created by Hada Studio - Flaticon</a>  
| |⬜️ user_1: <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a>  
| |⬜️ user_2: <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by kmg design - Flaticon</a>  
| |⬜️ heart_1: <a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Gregor Cresnar - Flaticon</a>  
| |⬜️ heart_2 : <a href="https://www.flaticon.com/free-icons/favorite" title="favorite icons">Favorite icons created by Freepik - Flaticon</a>  
| |⬜️ star_1 and star_2: <a href="https://www.flaticon.com/free-icons/star" title="star icons">Star icons created by Pixel perfect - Flaticon</a>  
| |⬜️ shopping_cart_1 and shopping_cart_2: <a href="https://www.flaticon.com/free-icons/supermarket" title="supermarket icons">Supermarket icons created by Freepik - Flaticon</a>  
| |⬜️ loupe_1: <a href="https://www.flaticon.com/free-icons/loupe" title="loupe icons">Loupe icons created by Arkinasi - Flaticon</a>  
| |⬜️ loupe_3: <a href="https://www.flaticon.com/free-icons/search" title="search icons">Search icons created by Freepik - Flaticon</a>  
| |⬜️ logout_1: <a href="https://www.flaticon.com/free-icons/logout" title="logout icons">Logout icons created by Gregor Cresnar - Flaticon</a>  
| |⬜️ register_1: <a href="https://www.flaticon.com/free-icons/register" title="register icons">Register icons created by Pixel perfect - Flaticon</a>  
| |⬜️ home_1: <a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Freepik - Flaticon</a>  
| |⬜️ plus_1: <a href="https://www.flaticon.com/free-icons/plus" title="plus icons">Plus icons created by Fuzzee - Flaticon</a>  
| |⬜️ iconsx512/upload_1: <a href="https://www.flaticon.com/free-icons/upload" title="upload icons">Upload icons created by Freepik - Flaticon</a>  
| |⬜️ iconsx64/upload_1: <a href="https://www.flaticon.com/free-icons/file-upload" title="file upload icons">File upload icons created by Ilham Fitrotul Hayat - Flaticon</a>  
| |⬜️ iconsx64/image_1: <a href="https://www.flaticon.com/free-icons/picture" title="picture icons">Picture icons created by Freepik - Flaticon</a>  
| |⬜️ iconsx64/disabled_image_1: <a href="https://www.flaticon.com/free-icons/photo" title="photo icons">Photo icons created by apien - Flaticon</a>  
| |⬜️ iconsx64/arrow_right_1: <a href="https://www.flaticon.com/free-icons/next" title="next icons">Next icons created by Kiranshastry - Flaticon</a>  
| |⬜️ icons/control_bar_x32/move_right_arrow_1: <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Handicon - Flaticon</a>  
| |⬜️ icons/control_bar_x32/next_arrow_1: <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Handicon - Flaticon</a>  
| |⬜️ icons/control_bar_x32/delete_1: <a href="https://www.flaticon.com/free-icons/trash" title="trash icons">Trash icons created by Freepik - Flaticon</a>  
| |⬜️ icons/control_bar_x32/edit_1: <a href="https://www.flaticon.com/free-icons/edit" title="edit icons">Edit icons created by Kiranshastry - Flaticon</a>  
| |⬜️ icons/close_1: <a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by Fuzzee - Flaticon</a>  
| |⬜️  
| |⬜️  
| |⬜️  
| |⬜️
