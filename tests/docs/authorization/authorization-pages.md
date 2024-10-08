**Table of Contents:**

**Sign in**

-   [User Story]
-   [Test Cases Email field]
-   [Test Cases Password field]
-   [Acceptance Criteria (FE)]
-   [Acceptance Criteria (BE)]

**Sign up**

-   User Story
-   Test Cases Full Name field
-   Test Cases Email field
-   Test Cases Password field
-   Test Cases Repeat Password field
-   Acceptance Criteria (FE)
-   Acceptance Criteria (BE)
    ![](https://github.com/user-attachments/assets/caf2b0da-e960-417f-b51d-8faac520ce63)

        <a name="_page1_x92.13_y70.87"></a>**Sign in**![](https://github.com/user-attachments/assets/3966be1d-9d89-41c2-a3e5-5d24987e87ed)


        The "Sign In" page is designed to facilitate access for registered users to their existing accounts within the **OutreachVids** application. This page serves multiple purposes:

1. **User Authentication**: It securely captures the user's login credentials (e.g., email and password) and verifies them against the corresponding data stored in the database.
1. **Access Token Generation**: Upon successful authentication, the system generates and provides an access token, enabling the user to securely interact with the application.
1. **Password Recovery**: In cases where users have forgotten their passwords, the page offers a redirection link to the "Forgot Password" page, where they can initiate the password recovery process.
1. **Account Registration**: For unregistered users, the page includes a prompt to redirect them to the "Create an Account" page, allowing them to establish a new account within the app.

The "Sign In" page is a critical gateway, ensuring that only authenticated users gain access to the application while providing necessary avenues for those who need to recover or create accounts.

-   **User<a name="_page1_x92.13_y477.58"></a> Story**

The user story procedure on the next link [TestDoc_for_SignInFlow](https://docs.google.com/spreadsheets/d/14vF3EOa7sI515qRntANlLpbEsZBukRq-S1vcsAIy_wg/edit?gid=1922746335#gid=1922746335)

-   **Test<a name="_page1_x92.13_y532.10"></a> Cases Email field**

Test Cases in the next link [TestDoc_for_SignInFlow](https://docs.google.com/spreadsheets/d/14vF3EOa7sI515qRntANlLpbEsZBukRq-S1vcsAIy_wg/edit?gid=1854802596#gid=1854802596)

-   **Test<a name="_page1_x92.13_y595.63"></a> Cases Password field**

Test Cases in the next link [TestDoc_for_SignInFlow](https://docs.google.com/spreadsheets/d/14vF3EOa7sI515qRntANlLpbEsZBukRq-S1vcsAIy_wg/edit?gid=1854802596#gid=1854802596)

-   **Frontend Testing**

Test Cases in the next link [TestDoc_for_SignInFlow(Frontend)](https://docs.google.com/spreadsheets/d/18qkQs1BYpclGpN9TGDBwBefp4q7TLVE2cnlwckDCbiI/edit?usp=sharing)

-   **Acceptance Criteria (FE)**
-   Display<a name="_page2_x92.13_y70.87"></a> Login form with the fields Email, Password and Sign In button as designed in Figma template
-   Allow the user to sign up using "Go to registration" link
-   Show error messages when any field contains invalid data
-   Show error messages when any field contains incorrect data
-   Redirect the user to the Home screen after submission

![](https://github.com/user-attachments/assets/85065069-ba77-45b4-a3a4-6b8ea7157242)

-   **Acceptance<a name="_page2_x92.13_y420.83"></a> Criteria (BE)**
-   Validate Email field input
-   Validate Password field input
-   Allow the user to continue as authenticated user after submission

![](https://github.com/user-attachments/assets/90baf3eb-6338-4038-a7a7-7148ae0eef6b)

![](https://github.com/user-attachments/assets/caf2b0da-e960-417f-b51d-8faac520ce63)
<a name="_page3_x92.15_y72.00"></a>**Sign up**![](https://github.com/user-attachments/assets/bc395f0d-ad50-48f1-99af-d96200652b23)

The "Sign Up" page in the **OutreachVids** application is designed to enable new users to create an account, granting them access to the platform's features. This page performs the following essential functions:

1. **Account Creation**: It captures the necessary user information, such as name, email, and password, and securely stores this data in the database to establish a new user account.
1. **User Authentication Setup**: Once the account is successfully created, the system generates an access token, allowing the new user to securely interact with the OutreachVids platform.
1. **Redirection to Sign In**: For users who already have an account, the page includes a link to the "Sign In" page, providing a seamless transition for users who may have mistakenly navigated to the "Sign Up" page.
1. **Error Handling and Validation**: The page incorporates robust validation mechanisms to ensure that all input data meets the required standards. In case of errors (e.g., email already in use, weak password), the system provides immediate feedback to guide the user.

The "Sign Up" page is a crucial entry point for new users, ensuring a smooth onboarding process while securely managing user data and authentication.

-   **User<a name="_page3_x92.15_y477.34"></a> Story**

The user story procedure on the next link [TestDoc_for_SignUpFlow](https://docs.google.com/spreadsheets/d/1b-xRyyn39r4N9k-P7zC618jotIVunZbbz1Vv9ipHNOM/edit?gid=1922746335#gid=1922746335)

-   **Test<a name="_page3_x92.15_y518.86"></a> Cases Full Name field**

Test Cases in the next link [TestDoc_for_SignUpFlow](https://docs.google.com/spreadsheets/d/1b-xRyyn39r4N9k-P7zC618jotIVunZbbz1Vv9ipHNOM/edit?gid=1854802596#gid=1854802596)

-   **Test<a name="_page3_x92.15_y574.38"></a> Cases Email field**

Test Cases in the next link [TestDoc_for_SignUpFlow](https://docs.google.com/spreadsheets/d/1b-xRyyn39r4N9k-P7zC618jotIVunZbbz1Vv9ipHNOM/edit?gid=1854802596#gid=1854802596)

-   **Test<a name="_page3_x92.15_y629.91"></a> Cases Password field**

Test Cases in the next link [TestDoc_for_SignUpFlow](https://docs.google.com/spreadsheets/d/1b-xRyyn39r4N9k-P7zC618jotIVunZbbz1Vv9ipHNOM/edit?gid=1854802596#gid=1854802596)

-   **Acceptance Criteria (BE)**
-   **Test<a name="_page4_x92.15_y72.00"></a> Cases Repeat Password field**

Test Cases in the next link [TestDoc_for_SignUpFlow](https://docs.google.com/spreadsheets/d/1b-xRyyn39r4N9k-P7zC618jotIVunZbbz1Vv9ipHNOM/edit?gid=1854802596#gid=1854802596)

-   **Acceptance<a name="_page4_x92.15_y140.61"></a> Criteria (FE)**
-   Add a new route /sign-up to the application's routing configuration and ensure that navigating to /sign-up renders the sign-up form.
-   Develop a sign-up form that includes fields for user input, such as email, password, and any additional required fields (e.g., Full Name).
-   Ensure the form is styled consistently with the application's design and UX guidelines.
-   The sign-up form should be user-friendly and aligned with the layout used on the Sign In page if they share the same layout.
-   Implement the functionality to handle form submission, including sending the data to the backend API for user registration.
-   Upon successful form submission and authentication, the user should be redirected to the app's main page
-   Implement client-side validation for the sign-up form fields to ensure that all required fields are correctly filled out and that the input data meets the validation criteria
-   Display appropriate error messages for invalid input or failed sign-up attempts.

![](https://github.com/user-attachments/assets/7b91ddf8-b5c3-45b8-adb4-8b8ad6eebb2a)

-   The<a name="_page5_x92.15_y72.00"></a> migration runs successfully without errors in all environments.
-   Passwords are hashed using the encryption service before being stored in the database.
-   The user service ensures that the password_hash and password_salt columns are excluded from the returned user object.
-   A new /auth/sign-up endpoint is added to the controller.
-   After successful sign-up, the endpoint returns a user object with id, email, fullName, and token, excluding password_hash and password_salt.

![](https://github.com/user-attachments/assets/6c1ab2c4-eda2-40c1-9db0-b915c247e98c)

![](https://github.com/user-attachments/assets/728e5c69-83b7-4883-9a41-d37d45075804)
