# 🛍️ Ecommerce Website — Full Stack MERN App

A full-stack ecommerce web application built with React, Node.js, Express, and MongoDB. Features include product browsing, cart management, order tracking and admin dashboard.

---

## 🌐 Live Demo

 | URL |
 [ecommerce-website-six-azure.vercel.app](https://ecommerce-website-six-azure.vercel.app) |

---

## 🔑 Test Credentials

### Customer Account
| Field | Value |
|---|---|
| **Email** | `test@gmail.com` |
| **Password** | `test` |

### Admin Account
| Field | Value |
|---|---|
| **Email** | `admin@gmail.com` |
| **Password** | `admin` |

> ⚠️ Please do not change the password of test accounts.

---

## ✨ Features

### Customer
- Browse products by category
- Search and filter products with debouncing 
- Add to cart and wishlist
- View order history and status
- User profile management

### Admin
- Dashboard with sales overview
- Order status chart
- Product management (Add, Edit, Delete)
- Order management and status updates
- Image upload via Cloudinary

---

## 🛠️ Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS
- React Router DOM
- Axios
- Chart.js
- React Hot Toast

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (image upload)
- Multer

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 🚀 Run Locally

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Cloudinary account

### Clone the repo
```bash
git clone https://github.com/Varshil2611/EcommerceWebsite.git
cd EcommerceWebsite
```

### Setup Backend
```bash
cd server
npm install
```

Create `server/.env`:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
ADMIN_EMAIL=your_admin_password
ADMIN_PASSWORD=your_admin_password
```

```bash
npm run dev
```

### Setup Frontend
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

---

## 📂 Project Structure

```
EcommerceWebsite/
├── frontend/
│   ├── src/
│   │   ├── AdminPages/
│   │   ├── Components/
│   │   ├── Context/
│   │   ├── Pages/
│   │   └── api/
│   └── vercel.json
├── server/
│   ├── Config/
│   ├── Controllers/
│   ├── Models/
│   └── server.js
└── README.md
```

---

## 📸 Screenshots
### Login Page
<img width="1919" height="970" alt="image" src="https://github.com/user-attachments/assets/abf11053-8978-47a3-8559-a64d00222740" />

### Home Page
<img width="1919" height="968" alt="image" src="https://github.com/user-attachments/assets/fc9628cd-5d31-4f25-b963-c607a5f49759" />
<img width="1919" height="631" alt="image" src="https://github.com/user-attachments/assets/41c3e769-ec62-4aa2-b857-c5ec771d873c" />
<img width="1919" height="628" alt="image" src="https://github.com/user-attachments/assets/51712bb9-1b9c-4c42-8c1f-c9197424f6e2" />

### Collection Page
<img width="1914" height="971" alt="image" src="https://github.com/user-attachments/assets/2d84d61a-70f2-4b6a-aa45-af81ab17f6d1" />

### Contact Page
<img width="1919" height="968" alt="image" src="https://github.com/user-attachments/assets/bf573972-24a3-4037-a125-adb6397ebfde" />

### Cart Page
<img width="1916" height="970" alt="image" src="https://github.com/user-attachments/assets/1564bab1-0b67-4163-95a3-c950c8f54815" />

### Profile Page
<img width="1919" height="372" alt="image" src="https://github.com/user-attachments/assets/600d5bbc-9300-45b2-a76d-32d53db2aeee" />

### Order Page
<img width="1919" height="967" alt="image" src="https://github.com/user-attachments/assets/8eb2a1f6-9a85-4109-b30e-904aa796b73d" />

### Admin Panel (Dashboard)
<img width="1919" height="970" alt="image" src="https://github.com/user-attachments/assets/6c9be820-4dc5-44bc-a9e2-78f9115c1813" />

### Products Management
<img width="1918" height="971" alt="image" src="https://github.com/user-attachments/assets/ad062028-af42-428b-88fd-d0a990c75950" />

### Orders Management
<img width="1919" height="939" alt="image" src="https://github.com/user-attachments/assets/6a190b06-9f41-45f4-9079-603cbce96032" />

---

## 🔮 Future Plans

- 💳 Razorpay / Stripe payment integration
- 🔔 Real-time order notifications using Socket.io
- 📧 Email confirmation after order placement
- ⭐ Product reviews and ratings
- 📱 Mobile app using React Native

---

## 👨‍💻 Author

**Varshil Shah**
- GitHub: [@Varshil2611](https://github.com/Varshil2611)
