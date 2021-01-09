# Zapatos Minimal Monorepo Example

This is an example project made to demonstrate the issues faced when trying to use [Zapatos](https://jawj.github.io/zapatos/) with a database module that is exported for use in another package. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have the following installed before following along with the rest of this.

* [Docker](https://docs.docker.com/get-docker/) - This package includes it's own Postgres server preconfigured and running on Docker.
* [Yarn](https://classic.yarnpkg.com/en/docs/install) - Yarn Workspaces are used to create the monorepo - and the `package.json` scripts all use Yarn.
* [Node](https://nodejs.org/en/download/) - Obviously

### Installing

Run the following to get the project dependencies installed, the docker container running, and the example db initialized.

```sh
# Run the following:
git clone https://github.com/sfsr12/zapatos-example.git &&\
cd zapatos-example &&\
yarn install &&\
yarn setup &&\
cd app &&\
yarn build &&\
yarn start

# If you are curious - this is what we are doing
# Run the app to verify everything is working as expected.

# Clone repo
git clone https://github.com/sfsr12/zapatos-example.git && cd zapatos-example

# Install dependencies for all packages in workspace
yarn install

# Run setup script found in root package.json - look at that and data/package.json for more info
yarn setup

# Build ./app - this will also build ./db since it is a project reference in ./app/tsconfig.json
cd app && yarn build

# Run the app to verify everything is working as expected.
yarn start
```

You should expect to see:

```sh
  Gabriel Garcia Marquez is deceased
```

## Issues

I encountered a few issues to get this working.  I will outline the issue, my solution, and friction points that hopefully can be overcome with new solutions or existing solutions I missed.

### Ambient Declarations
**Problem:** When building using `tsc` the generated `.d.ts` files do not get copied to the  `./dist` folder.

**Solution:** I believe this will be solved when the changes for [issue #53](https://github.com/jawj/zapatos/issues/53) release. To make a quick fix I just modified the build script in `package.json` to the following: `"build": "tsc -b && yes | cp -r src/zapatos dist"`.  This doesn't work if you are building any way other than calling that script - so not a great solution - but it works.

### Accessing Generated Types In External Package
**Problem:** When building another package that uses `@example/db` you will get a build error:
```sh
../node_modules/zapatos/dist/db/core.d.ts:4:58 - error TS2307: Cannot find module 'zapatos/schema' or its corresponding type declarations.

4 import type { Updatable, Whereable, Table, Column } from 'zapatos/schema';
                                                           ~~~~~~~~~~~~~~~~

../node_modules/zapatos/dist/db/shortcuts.d.ts:1:156 - error TS2307: Cannot find module 'zapatos/schema' or its corresponding type declarations.

1 import type { SelectableForTable, WhereableForTable, InsertableForTable, UpdatableForTable, ColumnForTable, UniqueIndexForTable, SQLForTable, Table } from 'zapatos/schema';
```

**Solution:** Adding the following line to the entry point of `@example/db` which in this case is `src/index.ts` resolves the issue:
```ts
/// <reference path="./zapatos/schema.d.ts" />
```

This is a bit of a point of friction for a couple of reasons.
* In my real project my linter hates it. `eslint@typescript-eslint/triple-slash-reference` - But whatever - linters hate lots of stuff - I can turn that off.
* I have a lot of custom types in my real project - so that means I have a list of 15 triple slash references at my entry point.  Not the end of the world - but it sure is ugly:
```ts
/// <reference path="./zapatos/schema.d.ts" />
/// <reference path="./zapatos/custom/post.d.ts" />
/// <reference path="./zapatos/custom/_comment.d.ts" />
/// <reference path="./zapatos/custom/_endUser.d.ts" />
/// <reference path="./zapatos/custom/_link.d.ts" />
/// <reference path="./zapatos/custom/_post.d.ts" />
/// <reference path="./zapatos/custom/_question.d.ts" />
/// <reference path="./zapatos/custom/_review.d.ts" />
/// <reference path="./zapatos/custom/_statusHistory.d.ts" />
/// <reference path="./zapatos/custom/customerTrafficPattern.d.ts" />
/// <reference path="./zapatos/custom/geography.d.ts" />
/// <reference path="./zapatos/custom/hoursOfOperation.d.ts" />
/// <reference path="./zapatos/custom/index.d.ts" />
/// <reference path="./zapatos/custom/int4range.d.ts" />
/// <reference path="./zapatos/custom/post.d.ts" />
```
### Thanks
Thanks for any feedback on ways to improve this.  Maybe this project can be helpful for other people trying to figure out issues with getting Zapatos working in an included package.