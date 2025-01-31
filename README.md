# StaffBlog

A website that lets the company's staff authenticate themselves and manage posts, users, and members' roles.

## Pages

- **Home:**
  - Sign up, log in, and log out of the StaffBlog and FansInSync websites. (Logging in or out of the StaffBlog app automatically logs the staff in or out of the FansInSync website. This allows authentication activities to happen only in the StaffBlog since only authenticated staff can comment, post, and manage users. It also prevents fans' attempts to register an account.)
  - List all the posts the user has the privilege to edit.
- **Sign-up:** Registration page for members to create a new account as a staff or admin.
- **Log-in:** Provide credentials to log in to the website.
- **Blog creation:** Create new posts as drafts or live publications.
- **Blog editing:** Update drafts or published posts.
- **Members:** Manage staff privileges.

## Users and privileges

- **Fan:** Unauthenticated user (No privileges)
- **Staff:** Employed member (Read, compose, and personal content management privileges)
- **Admin:** An administrator (All privileges)

| Privilege                               | Fan | Staff | Admin |
| --------------------------------------- | --- | ----- | ----- |
| Create an account                       | No  | Yes   | Yes   |
| Create posts                            | No  | Yes   | Yes   |
| Access all posts (drafts and published) | No  | No    | Yes   |
| Update personal posts                   | No  | Yes   | Yes   |
| Update any post                         | No  | No    | Yes   |
| Delete personal posts                   | No  | Yes   | Yes   |
| Delete any post                         | No  | No    | Yes   |
| Delete accounts                         | No  | No    | Yes   |

## Technologies used

- Astro
- React

## Usage

> **Note:** [The backend](https://github.com/oluwatobiss/api-powered-blog-backend) must be running for this website to function appropriately.

1. Clone the project

```bash
git clone https://github.com/oluwatobiss/api-powered-blog-editor.git
```

2. Navigate into the project repo

```bash
cd api-powered-blog-editor
```

3. Install dependencies

```bash
npm install
```

4. Create an environment variable file

```bash
touch .env
```

5. Define the project's environment variables

```
PUBLIC_BACKEND_URI="http://localhost:3000"
PUBLIC_FANSEND_URI="http://localhost:PORT"
```

6. Start the server

```bash
npm run dev
```

## Related Repos

- [FansInSync](https://github.com/oluwatobiss/api-powered-blog-website)
- [Fans-n-Company Rest API](https://github.com/oluwatobiss/api-powered-blog-backend)
