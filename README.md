# hotdog

A hotdog stand for all your doggy appointments. Be the best dog parent you can be with hotdog!

---

## Description / User Story

As a dog owner, I would like a place to make all my dog related appointments at once where I do not have to worry about making duplicate appointments, overlapping appointments, or having to keep track of everyone's opening hours. I would also like to be able to easily look for all the appointments I have made so far to easily keep track of when my next appointment will be.

As a dog service provider, I would like my customers and clients to easily find information about me like opening hours, my address, etc. With hotdog, I do not have to go back and forth with my customers and clients on whether a certain slot is available, or whether or not I'm open for service during a certain timing. 

## Getting Started - Planning

#### Project Time Frame

2.5 weeks

### [Trello Board](https://trello.com/b/baanBY4E/hotdog)

### WireFrame in [Figma](https://www.figma.com/board/7wnZVosgaE0QaFPJUtcU9Z/Project-4?node-id=0-1&t=1dzTM2a8X56toXq8-0)

<img src="src/assets/ss/wireframe.png">

### Example Schema in [Google Sheets](https://docs.google.com/spreadsheets/d/1Wf9Y4I4FwGgeJHnZQdMfJRzvozbgLiwgff7bcOgt40g/edit?gid=0#gid=0)

### Deployed on Render

Try it here: (https://hotdog-ypkn.onrender.com/)

### Screenshots
- Allows for 2 types of users with different sign up forms, profile, and appointments page.

- Two user types
  <img src="src/assets/ss/twoUser.gif">

- Login :navigation responds to user type
  <img src="src/assets/ss/login.gif">

- Profile Page (Vendor)
  <img src="src/assets/ss/vProfile.png">

- Profile Page (pet owner)
  <img src="src/assets/ss/ownerProfile.png">

- Appointments Page (Vendor)
  <img src="src/assets/ss/vAppts.png">

- Appointments Page (pet owner)
  <img src="src/assets/ss/appts.png">

- Add Appointments Page (pet owner)
  <img src="src/assets/ss/addAppts.png">

- Search Page (pet owner)
  <img src="src/assets/ss/search.gif">

- Archives Page (pet owner)
  <img src="src/assets/ss/archives.png">

- Map Page (pet owner)
  <img src="src/assets/ss/map.gif">

### password hashing
 <img src="src/assets/ss/pwhash.png">

### Favourite Modal
- 2 Referencing points
1. ServiceId
2. UserId
<img src="src/assets/ss/apptModel.png">
<img src="src/assets/ss/ref.png">

### Favourite Controller

using .populate()
<img src="src/assets/ss/favCon.png">

### Favourite React Component

<img src="src/assets/ss/viewww.png">

### Routing / API

- User Routes
<img src="src/assets/ss/userRoutes.png">

- Appointment Routes
<img src="src/assets/ss/apptRoutes.png">


### CRUD (Fetch method)

1. users

- create
  <img src="src/assets/ss/createUser.png">

- read
  <img src="src/assets/ss/readUser.png">

- update
  <img src="src/assets/ss/updateUser.png">

2. Appointments

- create

  <img src="src/assets/ss/createAppt.png">

- read: use params to restrict to authenticated users
  <img src="src/assets/ss/readAppts.png">

- update
  <img src="src/assets/ss/updateAppts.png">

- delete
  <img src="src/assets/ss/delAppts.png">

### Validation
- Duplicate bookings
<img src="src/assets/ss/duplicateAppt.png">
<img src="src/assets/ss/duplicate.gif">

- Overlapping bookings
<img src="src/assets/ss/overlap1.png">
condition:
<img src="src/assets/ss/overlap2.png">
<img src="src/assets/ss/overlap.gif"

- Outside vendor opening hour bookings
<img src="src/assets/ss/openinghr1.png">
condition:
<img src="src/assets/ss/openinghr2.png">
<img src="src/assets/ss/ophrs.gif">

### Biggest Challenge

- formatting time and dates
- moving the checking logic backend

### Key Takeaways

- understand the correct way to do validation backend so I only fetch necessary data frontend
- took more time to do styling and reinforced some css fundamentals

---

### MERN Tech Stack

##### Programming Language

- **Javascript**
- **HTML**
- **CSS**

##### Frontend

- **Vite** - Fast development build tool
- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for styling

##### Backend

- **Node.js** - JavaScript runtime environment
- **Express** - Web application framework for Node.js

##### Database

- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling tool

##### Authentication & Security

- **JSON Web Token (JWT)** - For creating and verifying tokens
- **jwt-decode** - Library to decode JWT tokens
- **bcrypt** - Password hashing library

##### Deployment

- **Render** - Cloud platform for deploying web applications

##### Development & Testing Tools

- **MongoDB Compass** - GUI tool for MongoDB
- **React DatePicker** - calendar input library
- **React TimePicker** - time input library
- **Moment** - Date and time formatter
- **Bruno** - API testing tool (for backend validation)
- **VS Code** - Code editor
- **Trello** - Project management tool
- **Figma** - Wireframe tool (for UI/UX design)

### Next Steps (Icebox)

- allow pet owners to host playdates and for other pet owners to be able to look for upcoming playdates to join
- uploading profile picture
- accomodate multiple dog for pet owners
- accomodate multiple vendors for the same type of service
- Telegram reminder for your appointments

---

### QnA + Feedback