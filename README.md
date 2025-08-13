# AstraNetix Solutions - Company Website & Admin Dashboard

A modern, full-stack web application for AstraNetix Solution Pvt. Ltd., featuring a futuristic animated landing page and a comprehensive admin dashboard for managing contacts, invoices, and administrators.

## 🚀 Features

### Public Website
- **Modern Landing Page**: Futuristic design with video background and animations
- **Contact Form**: Integrated contact form with backend processing
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Interactive Elements**: Scroll animations, glass morphism effects
- **Company Information**: Services, FAQ, and contact details

### Admin Dashboard
- **Secure Authentication**: JWT-based login system with password reset
- **Contact Management**: View and manage customer inquiries
- **Invoice Generation**: Create and manage invoices with PDF generation
- **Admin Management**: Add new administrators
- **Statistics Dashboard**: Real-time stats and analytics
- **Protected Routes**: All admin features require authentication

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MySQL** (AWS RDS compatible)
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Nodemailer** for email functionality
- **express-session** for session management

### Frontend
- **HTML5** with modern CSS3
- **Tailwind CSS** for styling
- **Vanilla JavaScript** for interactivity
- **ScrollReveal** for animations
- **Lottie** for advanced animations

### Database
- **MySQL** with connection pooling
- Optimized for AWS RDS Free Tier

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL database (local or AWS RDS)
- SMTP email service (for password reset functionality)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd astra-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Fill in your configuration values:
   ```env
   PORT=3000
   DB_HOST=your-aws-rds-endpoint.amazonaws.com
   DB_USER=your-db-username
   DB_PASSWORD=your-db-password
   DB_NAME=your-database-name
   JWT_SECRET=your-super-secret-jwt-key-here
   SESSION_SECRET=your-session-secret-key-here
   EMAIL_FROM=your-email@yourdomain.com
   EMAIL_PASS=your-email-password
   ```

4. **Database Setup**
   Create the required tables in your MySQL database:
   ```sql
   -- Admins table
   CREATE TABLE admins (
     id INT AUTO_INCREMENT PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     otp VARCHAR(6),
     otp_expire DATETIME,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Contacts table
   CREATE TABLE contacts (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Invoices table
   CREATE TABLE invoices (
     id INT AUTO_INCREMENT PRIMARY KEY,
     client_name VARCHAR(255) NOT NULL,
     client_email VARCHAR(255) NOT NULL,
     items JSON NOT NULL,
     total_amount DECIMAL(10,2) NOT NULL,
     gst DECIMAL(10,2) NOT NULL,
     invoice_date DATE NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Create Initial Admin User**
   ```sql
   INSERT INTO admins (email, password) VALUES 
   ('admin@astranetix.in', '$2a$10$hashedPasswordHere');
   ```

6. **Start the server**
   ```bash
   npm start
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/forgot` - Send password reset OTP
- `POST /api/auth/reset` - Reset password with OTP
- `POST /api/auth/add-admin` - Add new administrator (protected)

### Contact Management
- `POST /api/contact` - Submit contact form
- `GET /api/contact/all` - Get all contacts (protected)

### Invoice Management
- `POST /api/invoice/generate` - Create new invoice (protected)
- `GET /api/invoice/history` - Get invoice history (protected)

### Statistics
- `GET /api/stats` - Get dashboard statistics (protected)

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Protected Routes**: Middleware-based route protection
- **Session Management**: Secure session handling
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for production deployment

## 🚀 Deployment

### AWS Free Tier Deployment

1. **EC2 Instance Setup**
   - Launch a t2.micro EC2 instance
   - Install Node.js and PM2
   - Clone and configure the application

2. **RDS Database**
   - Create a MySQL RDS instance (db.t3.micro)
   - Configure security groups for database access
   - Import the database schema

3. **Environment Configuration**
   - Set production environment variables
   - Configure email service (SES or external SMTP)
   - Set up SSL certificates

4. **Process Management**
   ```bash
   # Install PM2 globally
   npm install -g pm2
   
   # Start the application
   pm2 start server.js --name "astranetix-app"
   
   # Save PM2 configuration
   pm2 save
   pm2 startup
   ```

## 📁 Project Structure

```
astra-backend/
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── AdminUser.js         # Admin user model
│   ├── Contact.js           # Contact model
│   └── Invoice.js           # Invoice model
├── public/
│   ├── assets/              # Images, videos, static files
│   ├── dashboard/           # Admin dashboard files
│   ├── index.html           # Main landing page
│   ├── main.js              # Frontend JavaScript
│   └── style.css            # Custom styles
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── contact.js           # Contact management routes
│   ├── invoice.js           # Invoice management routes
│   └── stats.js             # Statistics routes
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── db.js                    # Database connection
├── package.json             # Dependencies and scripts
├── README.md                # Project documentation
└── server.js                # Main application server
```

## 🔧 Development

### Running in Development Mode
```bash
# Install nodemon for auto-restart
npm install -g nodemon

# Start development server
nodemon server.js
```

### Testing
- Test all API endpoints using Postman or similar tools
- Verify database connections and queries
- Test authentication flows and protected routes
- Validate frontend forms and user interactions

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software of AstraNetix Solution Pvt. Ltd.

## 📞 Support

For technical support or questions:
- Email: info@astranetix.in
- Phone: +91 9530073091
- LinkedIn: [AstraNetix Solutions](https://www.linkedin.com/company/astranetix-solutions/)

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added authentication middleware and security improvements
- **v1.2.0** - Enhanced dashboard with statistics and improved UI

---

**AstraNetix Solution Pvt. Ltd.** - *Empowering IT. Enabling Trust.*
