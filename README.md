# 🌿 alchevita App

**alchevita App** is a web application that helps users explore, bookmark, and manage natural remedies based on specific symptoms. It was built as a capstone project for a web development bootcamp and serves as a wellness-focused digital tool with a modern UI and secure backend.

---

## 🚀 Features

- 🔍 **Filter remedies by symptoms**
- 📌 **Bookmark favorite remedies**
- 📝 **Create, update, and delete personal remedies**
- 🖼️ **Upload images via Cloudinary**
- 👤 **User authentication & ownership**
- 📱 **Responsive UI for mobile and desktop**

---

## 🛠️ Tech Stack

| Area | Technology |
|------|------------|
| **Frontend** | Next.js, React, Styled-Components, SWR |
| **Backend**  | Next.js API Routes, MongoDB, Mongoose |
| **Authentication** | NextAuth.js |
| **Image Uploads** | Cloudinary + Formidable |
---
## 🧪 Key Technical Details

### 🗂️ MongoDB + Mongoose
- Defined schemas for:
  - `Remedy` — contains title, ingredients, preparation, symptoms, image, and owner ID.
  - `Symptom` — simple name-based schema.
  - `BookmarkRemedy` — maps user–remedy relationships.
  - `User` — with email, name, and GitHub ID.

### 🧮 Next.js API Routes
- CRUD operations for `Remedies`, `Bookmarks`, `Symptoms`
- Aggregation Pipelines to:
  - Filter remedies by symptom
  - Attach bookmarked state per user
  - Populate symptom names while maintaining order

### 🔐 Authentication with NextAuth.js
- Session-based access
- Restrict actions (like edit/delete remedies) to their owner only

### ☁️ Cloudinary Uploads
- Via `/api/upload` route
- `formidable` to parse incoming files
- Secure and size-limited uploads

### ⚡ Optimistic UI via SWR
- `useBookmarks()` custom hook for optimistic toggling
- Instant feedback when user bookmarks/unbookmarks a remedy

### 🎨 Styled Components
- Responsive layout with fixed mobile navbar
- Dark/light mode support ready
- Modular, component-level CSS

---

## 📷 Screenshots

<img width="342" alt="Screenshot 2025-05-28 at 08 55 15" src="https://github.com/user-attachments/assets/4658e145-730f-4749-9ef4-37e0f3a962ab" />
<img width="342" alt="Screenshot 2025-05-28 at 08 55 05" src="https://github.com/user-attachments/assets/8fa24227-86a0-4d98-99db-7531788a47c3" />
<img width="342" alt="Screenshot 2025-05-28 at 08 54 09" src="https://github.com/user-attachments/assets/411d8d36-1c5b-4f09-810c-58858fdc833c" />
<img width="342" alt="Screenshot 2025-05-28 at 08 53 51" src="https://github.com/user-attachments/assets/88db296a-5692-48ac-81f9-beb7132e8659" />
<img width="342" alt="Screenshot 2025-05-28 at 08 52 57" src="https://github.com/user-attachments/assets/a4a3aa56-8bfb-40c4-a6c6-7aba035f4fc7" />
<img width="342" alt="Screenshot 2025-05-28 at 08 52 28" src="https://github.com/user-attachments/assets/0e4d235e-b877-42c8-bc4c-65c8c041ce6d" />
<img width="342" alt="Screenshot 2025-05-28 at 08 52 08" src="https://github.com/user-attachments/assets/984ff4ca-5498-4e8f-88a9-3a3e6614163d" />
<img width="342" alt="Screenshot 2025-05-28 at 08 51 16" src="https://github.com/user-attachments/assets/93ce0a2b-ccf4-4391-808d-2fc332b78dc2" />
