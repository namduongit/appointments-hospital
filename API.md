*** AUTH API ***
## Login Request
- API: /auth/login
- Method: POST
- Access: Public

## Register Request  
- API: /auth/register
- Method: POST
- Access: Public

## Auth Config Request
- API: /auth/authConfig
- Method: POST
- Access: Protected (AccessToken required)

---
*** USER API ***
## Get User Detail (bao gồm profile)
- API: /api/user/me
- Method: GET  
- Access: Protected (AccessToken required)

## Update Profile
- API: /api/user/profile
- Method: PUT
- Access: Protected (AccessToken required)
- Body: {fullName, phone, address, birthDate}

## Update Password
- API: /api/user/password
- Method: PUT
- Access: Protected (AccessToken required)
- Body: {currentPassword, newPassword}

## Get User Appointments
- API: /api/user/appointments
- Method: GET
- Access: Protected (AccessToken required)

---
*** DOCTOR API ***
## 