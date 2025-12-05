# Contributions

**Member name:** Twe He Gam Aung  

---

## Features/Branches Created

### 1. Branch: `feature-job-be`
- Job controller with CRUD operations
- Job routes
- ObjectId validation and error handling

### 2. Branch: `feature-requireAuth-Gam`
- User authentication controller (signup, login, getMe)
- Validation middleware for signup/login
- Password hashing with bcrypt and JWT tokens
- Modified job controller for user ownership (user_id)
- Integrated requireAuth middleware in job router

---

## Commits 

1. **6c57610** - Check and modify userRouter
2. **4e1dffd** - Update validate middleware, userController and modify jobController
3. **adb023f** - Implement controller for Job
---

## Role in Group Project

**Primary Responsibilities:**
- Backend user authentication system
- Job controller CRUD operations
- Validation middleware
- Job router integration with requireAuth

**Key Contributions:**
- Implemented secure authentication with JWT and bcrypt
- Created validation middleware with fail-fast validation
- Added user ownership tracking to jobs
- Integrated with teammate's requireAuth middleware
- Protected POST/PUT/DELETE routes while keeping GET public

---

## Files Created/Modified

**Created:**
- `backend/controllers/userController.js`
- `backend/middleware/validateMiddleware.js`
- `backend/controllers/jobControllers.js`

**Modified:**
- `backend/routes/jobRouter.js`
- `backend/models/jobModel.js`
