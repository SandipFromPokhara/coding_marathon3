# Contributions  
**Name:** *Sandip Ranjit*  
**Project:** Coding Marathon 3 – MERN Full-Stack Application  

---

## 🚀 Overview  
During the project, I contributed primarily to the **backend development** for two major branches:  
- `feature-noauth-sandip`  
- `feature-auth-sandip`  

Both branches contained backend and frontend directories, but my responsibilities focused on backend API logic, testing, authentication, and route protection.

---

## 🔧 Branch: `feature-noauth-sandip`

### **Main Responsibilities**
- Implemented comprehensive Jest + Supertest test suites for **Version 1 (API V1 – No Authentication)**, including:
  - `getAllJobs`
  - `getJobById`
  - `createJob`
  - `updateJob`
  - `deleteJob`
- Updated `app.js` and `package.json` to ensure proper middleware logic and compatibility for **Render deployment** (CORS, express.json, environment handling, etc.)

### **Key Contributions**
- Wrote end-to-end tests covering success, failure, validation, and edge-case scenarios.
- Improved API stability prior to adding auth.
- Ensured the backend could be deployed without breaking when auth was later integrated.

---

## 🔐 Branch: `feature-auth-sandip`

### **Main Responsibilities**
- Added the provided **User model (Mongoose)**
- Implemented **requireAuth middleware** using JWT:
  - Token verification
  - Error handling
  - Attaching authenticated user to request object
- Protected all job routes:
  - Jobs can only be created, modified, or deleted by authenticated users.
- Wrote Jest + Supertest tests for **all protected endpoints**:
  - Verified that unauthorized requests are blocked
  - Tested successful authentication flows
- Provided debugging support for frontend integration:
  - Token storage for authorization
  - Login/registration flow alignment with backend

---

## 🔄 Commits and Pull Requests  

### **Commits Authored**
- For `feature-noauth-sandip`
    - 8eecb36 (origin/feature-noauth-sandip, feature-noauth-sandip) Add comments for each test
    - e65fcf8 Remove user route for no-auth
    - f0598b1 Add test for job using jest and supertest
    - 9712f55 Merge remote-tracking branch 'origin/feature-job-be' into feature-noauth-sandip
    - 2d200e9 Add scripts for auomating deployment
    - 58b6d79 Configure backend for deployment, add middleware and navigation route
    - 2f99463 Install dependencies and add controller, model and router for user
    - f21a1c6 Initliaze main branch with starter code for Coding marathon 3 for Group-1
    - 68ae81e Initliaze starter code for Coding marathon 3
  
- For `feature-auth-sandip`

  - 160c798 (origin/feature-auth-sandip, feature-auth-sandip) Add tests for protected routes
  - 8485ade Update city names
  - 2a9e759 Add auth middleware and protect job routes
  - ac4239d Install dependencies
  - 64b1b13 Update user schema to the latest version
  - 7b6f551 Merge pull request #4 from SandipFromPokhara/branch-noauth-dinal
  - 3fb0822 Merge pull request #5 from SandipFromPokhara/feature-job-be
  - 94d7f25 Merge pull request #6 from SandipFromPokhara/feature-noauth-sandip

### **Pull Requests Authored**
- PR: `feature-noauth-sandip → API-V1`
- PR: `feature-auth-sandip → API-V2`

---

## 👤 Role in the Group Project  
My primary role was **backend engineer** for both branches I worked on.

Responsibilities included:
- Project structure setup 
- Merge into `API-V1` and `API-V1`
- Comprehensive backend tests using Jest/Supertest 
- Authentication system  
- Route protection  
- Frontend/backend integration debugging  
- Ensuring API correctness before deployment  

---
