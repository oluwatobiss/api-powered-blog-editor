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

## Related Repos

- [FansInSync](https://github.com/oluwatobiss/api-powered-blog-website)
- [Fans-n-Company Rest API](https://github.com/oluwatobiss/api-powered-blog-backend)
