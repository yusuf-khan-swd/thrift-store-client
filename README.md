# Thrift Store

- adminEmail: admin@admin.com
- adminPassword: 123456

### Project live site [Thrift Store](https://thrift-store-88291.web.app/).

## Project Functionality :

- User can register as seller or buyer.
- User can login as admin, seller and buyer
- If user is log in then only can book a product with user additional information in modal.
- A log in user can book a products and it will show in dashboard my products
- User can delete book products or pay for a product.
- User can pay to purchase the product which implement using stripe.
- After payment done paid product will not show in advertisement component or in category of products.
- Create role and route for admin, seller and buyer.
- Like AdminRoute where only admin can access. For securing server side access create a admin middle-ware.
- And a SellerRoute Where only seller can access. For securing server side access create a seller middle-ware.
- Make a private route for only buyer access.
- Seller can advertised product or remove advertised.
- Seller can also add a product with product information and upload a image that hosted on imageBB hosting service.
- Seller can also delete, seller own product in my products.
- Admin can see all sellers and all buyers. And delete a seller or buyer.
- In all seller admin can verify a seller or remove verification.
- If seller is verified then a tick icon will show side of seller name.
- In reported items route admin can see all reported items. And delete the reported item.

## Project Feature:

- This project use <code>react</code> as a front-end library.
- And to add style and to make responsive used <code>tailwindCSS</code>
  and <code>daisyUI</code> as tailwindCSS component library.
- Create a admin route feature for only admin can access.
- Create a seller route feature only seller can access.
- Payment system feature for buyer to pay. Using <code>stripe</code>.
- <code>react-query</code> - used for fetching data from server and loading state and refetch
- <code>axios</code> - Explore the use of axios and used to get server data.
- <code>date-fns</code> - used to format the date.
- <code>firebase</code> - as authentication service. And to host this website.
- <code>react-router-dom</code> - Using react-router-dom make all the route for this project.
- <code>react-hook-form</code> - Using get form values, show error message and some basic validation.
- <code>react-hot-toast</code> - To show beautiful message for user.
- <code>react-icons</code> - Used for site icon.
