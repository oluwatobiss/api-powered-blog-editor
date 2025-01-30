# staffBlog

A website that lets the company's staff authenticate themselves and manage posts, users, and members' roles.

## Pages

- **Home:**
  - Allow staff to sign up, log in, and log out of the staffBlog and fansInSync websites. (Logging in or out of the staffBlog app automatically logs the staff in or out of the fansInSync website. This allows authentication activities to happen only in the staffBlog since only authenticated staff can comment, post, and manage users. It also prevents fans' attempts to register an account.)
  - List all the posts the user has the privilege to edit.
- **Sign-up:** Registration page for members to create a new account as a staff or admin.
- **Log-in:** Allow registered staff to log in to their account.
- **Blog creation:** Allow logged-in users to create new posts as drafts or live publications.
- **Blog editing:** Post editing page for logged-in users to edit their draft or published posts.
- **Members:** Allow admins to manage staff privileges.

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

- [fansInSync](https://github.com/oluwatobiss/api-powered-blog-website)
- [Backend](https://github.com/oluwatobiss/api-powered-blog-backend)
