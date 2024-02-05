## **General project information**
This is a React app for employees of The Wild Oasis Hotel. App allows users to manage offered by hotel wood cabins for rest and interact with guests' bookings. App was created with Vite build tool. Data is stored at the Supabase DB.

## **Link**
App is deployed at: [https://wild-oasis-hotel-app.vercel.app/](https://wild-oasis-hotel-app.vercel.app/)

## **Screenshots**

### **Login page**
When you first visit this app you'll see a login form. If you want to try using this app, you need to enter:

**email - guest@gmail.com**

**password - guest**

![User auth page](https://github.com/VladimirVolvakov/hotel-react-app/assets/61667595/d5f19319-4eea-4a9a-a4ae-2e2d6168b2f7)

### **Home page / Dashboard**
After you successfully logged in, you'd be redirected to the home page of the app. It contains bookings stats (bookings & check-ins quantity, total sales income & occupancy rate). You can choose a desired period for stats observation (last 7 / 30 / 90 days). There is also 'Today' section where you can observe today's check-ins & check-outs. In the 'Stay duration summary' and 'Sales' sections you can see visual representation of stats.

Button 'Upload bookings ONLY' on the sidebar will help you to generate sample bookings data if actual data would become outdated.

![Dashboard page](https://github.com/VladimirVolvakov/hotel-react-app/assets/61667595/7a232020-a079-4595-bb20-2d0326733919)

### **Bookings page**
Here you will get all information about bookings. All bookings can be sorted by status and date. If you press menu button (on the right side of booking) you will see action options possible to do with this booking.

![Bookings page](https://github.com/VladimirVolvakov/hotel-react-app/assets/61667595/d0d046bc-dff7-4e42-9d35-4e86e2ea44b3)

### **Booking Details page**
If you select 'Details' option after pressing menu button you'll get more detailed information about booking. Also there are some options to do with current booking ('Check Out' / 'Delete'). Also if the guest ordered cabin without paying for breakfast there is possibility to order and pay for it in situ.

![BookingDetails page](https://github.com/VladimirVolvakov/hotel-react-app/assets/61667595/8ace6e97-9425-4da5-87b0-0671bb926bb4)

### **Cabins page**
On this page you can find info about all hotel cabins, their current price and discounts.

![Cabins page](https://github.com/VladimirVolvakov/hotel-react-app/assets/61667595/9c65b66a-752a-4a1d-bbb2-3f896f359325)

### **Users page**
In order to prevent registration of strangers (persons who do not work in The Wild Oasis Hotel) in the app is implemented feature when a new user can be signed up only from account of already existing user.

![CreateNewUser page](https://github.com/VladimirVolvakov/hotel-react-app/assets/61667595/b785247e-b30d-4c81-92f4-f642e1b367ef)

### **Update Account page**
User can update his displayed name & password and load avatar image. For that it is necessary to click user icon in the app header and update data.

![AccountUpdate page](https://github.com/VladimirVolvakov/hotel-react-app/assets/61667595/a6e6dcea-f83b-4904-adac-23f40ac520a5)

### **Settings page**
Hotel settings could be changed on the Settings page in a very simple way - you change some value and click outside the input field.

![Settings page](https://github.com/VladimirVolvakov/hotel-react-app/assets/61667595/7ff13e89-1899-49a9-b5da-9ef753c8f060)

### **Light / Dark mode**
Design of app has light and dark mode. Mode can be toggled by clicking appropriate icon in the app header.

![DarkMode](https://github.com/VladimirVolvakov/hotel-react-app/assets/61667595/e2a67dc9-90c4-477d-bc02-893547fa99f6).

## **Design**
App design was created by brilliant educator [Jonas Schmedtmann](https://github.com/jonasschmedtmann) for his course ["The Ultimate React Course 2023: React, Redux & More"](https://www.udemy.com/course/the-ultimate-react-course/).
