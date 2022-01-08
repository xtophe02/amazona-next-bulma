# Amazona Ecommerce

short description what the APP does:

**Authentication**

- register
- login/logout
  only logged in you can add buy products
- if you are admin you have access to a dashboard where you can:
  you can add/edit/delete products/users, view orders ,ship merchandise

**ADD/EDIT/DELETE Products**
only an admin user can CRUD products/users

**Raiting**
you can leave a raiting and comment to a product

**Cart**
you can add products to the cart and then order with paypal

**Orders**
you can views the history of your orders

**pagination**
used mongo pagination to load the products

**filters**
used mongoose to filter by name/category

**index/product page**
the index page and the product page are static meaning that they will load fast, and be rebuild in 10 sec if the data changed.

**api**
only admin can see the dashboard, if not it will be redirected

**cookies**
to save state so when you refresh you won't lose the state

**notifications**
build notifications with context

**packages used**

- paypal
  for payments
- bulma
  css framework
- chart.js
  graphics for sales
- cloudinary
  upload pictures products
- js-cookie
  to save state on cookies
- mongoose
  save data
- nextjs
  react framework
- next-connect
  to work with nextjs api
- nprogress
  when SSR (server side render) we have a loading status
- react-hook-form
  easy way to have forms
- react-stars
  to have raitings
