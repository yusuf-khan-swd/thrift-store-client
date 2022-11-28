# A thrift store - _Charity Truly_

- adminEmail: admin@admin.com
- adminPassword: 123456

### Project live site [Charity Truly](https://thrift-store-88291.web.app/).

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
- <code>date-fns</code> - used to format the data.
- <code>firebase</code> - as authentication service. And to host this website.
- <code>react-router-dom</code> - Using react-router-dom make all the route for this project.
- <code>react-hook-form</code> - Using get form values, show error message and some basic validation.
- <code>react-hot-toast</code> - To show beautiful message for user.
- <code>react-icons</code> - Used for site icon.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
