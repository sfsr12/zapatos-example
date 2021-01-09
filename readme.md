# Zapatos Monorepo Example

This is an example project made to demonstrate the issue faced when trying to use [Zapatos](https://jawj.github.io/zapatos/) with a database module that is exported for use in another package. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

* [Docker](https://docs.docker.com/get-docker/) - This package includes it's own Postgres server preconfigured and running on Docker.
* [Yarn](https://classic.yarnpkg.com/en/docs/install) - Yarn Workspaces are used to create the monorepo - and the `package.json` scripts all use Yarn.
* [Node](https://nodejs.org/en/download/) - Obviously

### Installing

Run the following to get the project dependencies installed, the docker container running, and the example db initialized.

```sh
# Clone repo
git clone https://github.com/sfsr12/zapatos-example.git && cd zapatos-example

# Install dependencies for all packages in workspace
yarn install

# Run setup script found in root package.json
yarn setup

# Build ./app - this will also build ./db since it is a project reference in ./app/tsconfig.json
cd app && yarn build

# Run the app to verify everything is working as expected.
yarn start
```



```sh
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
