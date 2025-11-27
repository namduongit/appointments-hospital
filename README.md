# SPOCE Hospital Management System
**A comprehensive web application for managing hospital appointments and medical services**  
_Backend: Spring Boot | Frontend: React + Vite + TypeScript_

---
## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/namduongit/appointments-hospital
cd appointments-hospital
```

### 2. Structure Overview
The project is divided into two main directories:
- `client/`: Contains the Spring Boot application for handling server-side logic and database interactions.
- `server/`: Contains the React application for the user interface.
```bash
root/
├── client/                                 # React (vite + TypeScript) frontend
    ├── src/                                # Source files
    │   ├── .../
    │   │   ├── .../
    │   │   └── .../
    │   └── test/
    └── .env                                # Environment variables for backend    
└── server/                                 # Spring Boot backend
    ├── src/
    │   ├── main/
    │       ├── java/                       # Java source files
    │       ├── resources/                  # Application resources
    │           └── firebase/
    │               └── config.json
    │           └── templates/
    │           └── application.properties
    │   └── .../
    └── .pom.xml                            # Maven configuration
```

---
### 3. Environment Configuration
- Config client environment variables in `client/.env`.
- Config server environment variables in `server/src/main/resources/application.properties`.
- Config Firebase credentials in `server/src/main/resources/firebase/config.json`.

**Note**: Read example environment variable in `.example.*.*`

---
### 4. Some useful applications have been integrated
- **Firebase**: For authentication and real-time database.
- **RabbitMQ**: For handling asynchronous tasks and messaging.
- **Payment Gateway**: Integrated payment processing for medical services.
- **Email Service**: Automated email notifications for appointments and updates.
- **Jasper Reports**: For generating dynamic reports and documents.

***Note***: Docs for these integrations can be found in the `server/docs/` directory.

---
### 5. Running the Application
**Run with `Docker`**
```bash
# Run in background
docker compose up -d
# Run in console
docker compose up
```
**Run with `command`**
- Client: npm install && npm run dev
- Server: gradle runBoot

---
### 6. Contact author   
For any questions or support, please contact:
- Name: Duong Nguyen
- Email: nguyennamduong205@gmail.com
- GitHub: [namduongit](https://github.com/namduongit)
