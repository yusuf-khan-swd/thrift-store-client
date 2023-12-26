# Thrift Store

### Project live site [Thrift Store](https://thrift-store-88291.web.app/).

Buyer Credential

- Email: buyer@buyer.com
- Password: password

Seller Credential

- Email: seller@seller.com
- Password: password

Admin Credential

- Email: admin@admin.com
- Password: 123456

## `Useful Links`

**1. [Github Client Side Repository](https://github.com/yusuf-khan-swd/thrift-store-client)** \
**2. [Github Server Side Repository](https://github.com/yusuf-khan-swd/thrift-store-server)** \
**3. [Live Website](https://thrift-store-88291.web.app/)**

## Project Functionality :

- User can register as seller or buyer.
- User can login as admin, seller and buyer
- Login user can report a product to admin, or book a product.
- For booking a product user must fill the form in modal with additional information.
- Make a private route where only buyer can access.
- Booked products will show in buyer dashboard. In dashboard buyer can delete booked products.
- User can pay for a product and the payment method implement using stripe.
- After the payment done the paid product will not show in advertisement section or in categories of products.
- Create role and routes for only admin, seller and buyer.
- Like AdminRoute where only admin can access. For securing server side API access create a admin middle-ware role.
- And a SellerRoute Where only seller can access. And to secure server side API access create a seller middle-ware role.
- Seller can advertised seller product or remove advertisement from the product.
- Seller can also add a product with product information and upload a image that hosted on imageBB hosting service.
- Seller can also delete seller own product in seller dashboard.
- Admin can view all sellers and buyers information. And delete a seller/buyer or make a admin.
- In all-seller route admin can verify a seller or remove verification.
- If seller is verified then a blue tick icon will show side of seller name as verified seller.
- In reported items route admin can see all reported items. And delete the reported item.

## Project Feature:

- This project use <code>react.js</code> as a front-end library.
- And to add style and to make responsive used <code>Tailwind CSS</code>
  and <code>daisyUI</code> as TailwindCSS component library.
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
