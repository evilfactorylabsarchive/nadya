## Basic Workflow

1. Fork the repo
2. Pick an issue you want to working on
3. Create branch with name that representing the issue. e.g: feat-create-homepage
4. Push to your fork
5. Create Pull Request to the origin

## Repository organization

For now (17 Jun 2019), we have 2 main directory represented as monorepo.

- web: this is what you see for nadya.app (The landing page)
- app: this is what you see for web.nadya.app (The main app)

## Getting Started

Some basic information to help you getting started.

### Bootstrap the project

Make sure you are using `yarn` for dependency management. If you don't, please consider to install
it. It fast, secure, and reliable. Just run `yarn install` to install all dependencies for both
`web` and `app`.

### Start hacking

What are you working on? A landing page? Or the app? Use that as a prefix, for example, if you want
to run `yarn dev` for `app` project, you can use command (from root directory):

```bash
yarn app:dev
```

Is equivalent with:

```bash
cd app && yarn dev
```

Or you can use regular `yarn dev` command from specific directory (`app` or `web`).

#### Available commands

- `dev`: Primary command in development mode
- `start`: Run the `web` or `app`, but in semi-production environment
- `build`: Build the project so it ready for production (run this before `start`)

### Code Quality

We use prettier to format our code. Configuration are placed with name `.prettierrc`. Just write
your code without worrying about format (space/tab? 2 space/4 space?), your code will be formatted
as you commit your changes.
