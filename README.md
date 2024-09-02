# OutreachVids

## ℹ️ General Info

Create personalized sales videos using generated video content and AI-generated avatars.

## 🏭 Applications

-   [Backend](./backend) — OutreachVids application backend.

    _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

-   [Frontend](./frontend) — OutreachVids application frontend.

    _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

-   [Shared](./shared) — OutreachVids application common modules for reuse.

## 🖍 Requirements

-   [NodeJS](https://nodejs.org/en/) (20.x.x);
-   [NPM](https://www.npmjs.com/) (10.x.x);
-   [PostgreSQL](https://www.postgresql.org/) (16.4)
-   run **`npx simple-git-hooks`** at the root of the project, before the start (it will set the [pre-commit hook](https://www.npmjs.com/package/simple-git-hooks) for any commits).

## 💽 DB Schema

```mermaid
erDiagram
    users {
        uuid id PK
        string email UK
        string full_name
        text password_hash
        text password_salt
        datetime created_at
        datetime updated_at
    }
    videos {
        uuid id PK
        uuid user_id FK
        string name
        string url
        datetime created_at
        datetime updated_at
    }
    files {
        uuid id PK
        string url
        enum type "Values: 'video', 'photo'"
        datetime created_at
        datetime updated_at
    }
    avatars {
        uuid id PK
        string name
        string voice_url
        string voice
        datetime created_at
        datetime updated_at
    }
    styles {
        uuid id PK
        string style
    }
    gestures {
        uuid id PK
        string gesture
    }
    avatars_styles {
        uuid id PK
        uuid avatar_id FK
        uuid style_id FK
        string img_url
    }
    avatars_styles_gestures {
        uuid avatar_style_id PK,FK
        uuid gesture_id PK,FK
    }
    users ||--o{ videos : have
    avatars_styles ||--o{ avatars : "avatar_id"
    avatars_styles ||--o{ styles : "style_id"
    avatars_styles_gestures ||--o{ avatars_styles : "avatar_style_id"
    avatars_styles_gestures ||--o{ gestures : "gesture_id"
```

## 🏃‍♂️ Simple Start

1. Install packages: **`npm install`**
2. Fill ENVs
3. Install pre-commit hooks: **`npx simple-git-hooks`**
4. Run migrations: **`npm run migrate:dev -w backend`**
5. Run backend: **`npm run start:dev -w backend`**
6. Run fronend: **`npm run start:dev -w frontend`**

## 🏗️ Architecture

### 🌑 Backend

-   [Fastify](https://www.fastify.io/) — a backend framework.
-   [Knex](https://knexjs.org/) — a query builder.
-   [Objection](https://vincit.github.io/objection.js/) — an ORM.

### 🌕 Frontend

-   [Redux](https://redux.js.org/)
-   [Redux Toolkit](https://redux-toolkit.js.org/) — a state manager.
-   [Chakra UI](https://v2.chakra-ui.com/) - a component library.

### 🥊 Code quality

-   [simple-git-hooks](https://www.npmjs.com/package/simple-git-hooks) — a tool that lets you easily manage git hooks.
-   [lint-staged](https://www.npmjs.com/package/lint-staged) — run linters on git staged files.
-   [dangerjs](https://danger.systems/js/) — automate common code review chores.
-   [commitlint](https://commitlint.js.org/) — helps your team adhere to a commit convention.
-   [editorconfig](https://editorconfig.org/) — helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
-   [prettier](https://prettier.io/) — an opinionated code formatter.
-   [ls-lint](https://ls-lint.org/) — file and directory name linter.
-   [eslint](https://eslint.org/) — find problems in your JS code.
-   [stylelint](https://stylelint.io/) — find and fix problems in your CSS code.

#### 🏅 Pull Request flow

```
<project-prefix>-<issue-number>: <ticket-title>
```

##### Example

-   `OV-5: Add auth`

#### 🌳 Branch flow

```
<type>/<project-prefix>-<issue-number>-<short-desc>
```

##### Types

-   task
-   fix

##### Examples

-   `task/OV-6-add-videoplayer`
-   `task/OV-12-add-video-generating-flow`
-   `fix/OV-16-fix-videoplayer`

#### 🗂 Commit flow

```
<project-prefix>-<issue-number>: <modifier> <description>
```

##### Modifiers

-   `+` (add)
-   `*` (edit)
-   `-` (remove)

##### Examples

-   `OV-6: + title for videoplayer`
-   `OV-12: * videoplayer title`
-   `OV-16: - videoplayer title`

## 📦 CI/CD

CI/CD implemented using [GitHub Actions](https://docs.github.com/en/actions)
