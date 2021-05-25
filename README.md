![hoolichat-api](https://socialify.git.ci/ishitb/hoolichat-api/image?description=1&font=Raleway&forks=1&issues=1&language=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Dark)

<h1 align="center">
   💻 HooliChat
</h1>

<p align="center">
  HooliChat API is an open source backend that can be deployed to any infrastructure that can run Node.js.
</p>

<p align="center">
    <a href="https://forthebadge.com">
      <img alt="Developers" src="https://forthebadge.com/images/badges/built-by-developers.svg">
    </a>
    <br>
    <a href="https://forthebadge.com">
      <img alt="JavaScript" src="https://forthebadge.com/images/badges/made-with-javascript.svg">
    </a>
    <br>
    <a href="https://github.com/ishitb/hoolichat-api/actions?query=workflow%3Anode.js.yml+branch%3Amaster">
      <img alt="Build status" src="https://github.com/ishitb/hoolichat-api/actions/workflows/node.js.yml/badge.svg">
    </a>
    <a href="https://nodejs.org/"><img alt="Node.js 12,14,15" src="https://img.shields.io/badge/nodejs-12,_14,_15-green.svg?logo=node.js&style=flat"></a>
    <a href="https://www.mongodb.com/"><img alt="MongoDB 4.0,4.2,4.4" src="https://img.shields.io/badge/mongodb-4.0,_4.2,_4.4-green.svg?logo=mongodb&style=flat"></a>
</p>

HooliChat API works with the Express web application framework. An [API reference](http://hooliapi.snu-labyrinth.tech/docs) with SwaggerUI is available.

-   [Introduction](#introduction)
-   [Technology Stack](#⚡technology-stack)
-   [Getting Started](#getting-started)
    -   [Running HooliChat API](#running-hoolichat-api)
        -   [Compatibility](#compatibility)
            -   [Node.js](#nodejs)
            -   [MongoDB](#mongodb)
        -   [Locally](#locally)
        -   [Docker Container](#docker-container)
    -   [Running HooliChat API elsewhere](#running-hoolichat-api-elsewhere)
        -   [Sample Application](#sample-application)
-   [Configuration](#configuration)
-   [Contributing](#🤝contributing)
-   [Contributors](#👨‍💻contributors)

# Introduction 
Hoolichat is an open-source solution for small and medium businesses that brings together essential business features like team communication, task management, inventory management, invoicing, etc.
- Indians want simple streamlined solutions.
- Competing solutions are all closed-source, and create lock-in.
- Most SMBs just prefer using the limited functionality of Whatsapp to avoid technicalities.
- Better solutions are either too expensive or require technical prowess.

# ⚡Technology Stack

### [NodeJS](https://nodejs.org/)
### [MongoDB](https://www.mongodb.com/)
### [Express](http://expressjs.com/)
### [Socket.io](https://github.com/socketio/socket.io#readme)

# Getting Started
The fastest and easiest way to get started is to run MongoDB and HooliChat API locally.

## Running HooliChat API

Before you start make sure you have installed:

-   [NodeJS](https://www.npmjs.com/) that includes `npm`
-   [MongoDB](https://www.mongodb.com/)
-   Optionally, you can use [MongoDB Atlas Cloud](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjLl8nM6-XwAhVBRisKHSYdBkIYABAAGgJzZg&ae=2&ohost=www.google.com&cid=CAESQeD2OLkG8ActODm1KmFAdlyZOFr2wWr2P_mJDiYdgSKWVT8wvleW3q6j2PXMP8lOGFKgLieWWwu1JMKuQoxdHzHi&sig=AOD64_0Rs5sEOWnn4X5jMlho_xZKz9jYVA&q&adurl&ved=2ahUKEwizvsHM6-XwAhWe4XMBHRThAdsQ0Qx6BAgCEAE) for your database needs. Just remember to add the DB URI in the .env file.
-   Optionally [Docker](https://www.docker.com/)
-   Make sure you have all the environment variables configured, as mentioned in the .env.sample file.

### Compatibility

#### Node.js

HooliChat API is continuously tested with the most recent releases of Node.js to ensure compatibility. We follow the [Node.js Long Term Support plan](https://github.com/nodejs/Release) and only test against versions that are officially supported and have not reached their end-of-life date.

| Version   | Latest Version | End-of-Life Date | Compatibility       |
| --------- | -------------- | ---------------- | ------------------- |
| Node.js - | 12.22.-        | April 20-        | ✅ Fully compatible |
| Node.js - | 14.16.-        | April 20-        | ✅ Fully compatible |
| Node.js - | 15.14.0        | June 20-         | ✅ Fully compatible |

#### MongoDB

HooliChat API is continuously tested with the most recent releases of MongoDB to ensure compatibility. We follow the [MongoDB support schedule](https://www.mongodb.com/support-policy) and only test against versions that are officially supported and have not reached their end-of-life date.

| Version     | Latest Version | End-of-Life Date | Compatibility       |
| ----------- | -------------- | ---------------- | ------------------- |
| MongoDB 4.0 | 4.0.-          | January 20-      | ✅ Fully compatible |
| MongoDB 4.2 | 4.2.-          | TBD              | ✅ Fully compatible |
| MongoDB 4.4 | 4.4.-          | TBD              | ✅ Fully compatible |

### Testing
Make sure you have installed all the npm libraries after cloning the repository and you can tun the following code to test the application as per our linters and testing modules:
```bash
$ npm run test
```

### Swagger Generation
To document our REST APIs, we are using [SwaggerUI](https://swagger.io/tools/swagger-ui/), which allows anyone — be it your development team or your end consumers — to visualize and interact with the API’s resources without having any of the implementation logic in place. It’s automatically generated from your OpenAPI (formerly known as Swagger) Specification, with the visual documentation making it easy for back end implementation and client side consumption.
To generate the configuration file for SwaggerUI we are using a tool called [swagger-autogen](https://www.npmjs.com/package/swagger-autogen), which allows us to run a single command to generate the configurations, and output them in a json file, which is then used by SwaggerUI.
Make sure you have installed all the npm libraries after cloning the repository and run the following command:
```bash
$ npm run swagger:gen
```


### Sample Application

We have provided a basic [Node.js application](https://hooliapi.snu-labyrinth.tech/docs) (deployed using a free Microsoft Azure Instance) that uses the HooliChat API module on Express and can be easily deployed to various infrastructure providers:

-   [Heroku and mLab](https://devcenter.heroku.com/articles/deploying-a-hoolichat-api-to-heroku)
-   [AWS and Elastic Beanstalk](http://mobile.awsblog.com/post/TxCD57GZLM2JR/How-to-set-up-Parse-Server-on-AWS-using-AWS-Elastic-Beanstalk)
-   [Google App Engine](https://medium.com/@justinbeckwith/deploying-hoolichat-api-to-google-app-engine-6bc0b7451d50)
-   [Microsoft Azure](https://azure.microsoft.com/en-us/blog/azure-welcomes-parse-developers/)
-   [SashiDo](https://blog.sashido.io/tag/migration/)
-   [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-run-hoolichat-api-on-ubuntu-14-04)
-   [Pivotal Web Services](https://github.com/cf-platform-eng/pws-hoolichat-api)
-   [Back4app](http://blog.back4app.com/2016/03/01/quick-wizard-migration/)
-   [Glitch](https://glitch.com/edit/#!/hoolichat-api)
-   [Flynn](https://flynn.io/blog/parse-apps-on-flynn)

# Configuration

HooliChat API can be configured using the following options. You may pass these as parameters when running a standalone `hoolichat-api`, or by loading a configuration file in JSON format using `hoolichat-api path/to/configuration.json`. If you're using HooliChat API on Express, you may also pass these to the `ParseServer` object as options.

For the full list of available options, run `hoolichat-api --help` or take a look at [HooliChat API Configurations](http://parseplatform.org/hoolichat-api/api/master/ParseServerOptions.html).

## Logging

HooliChat API will, by default, log:
* to the console

## Running

### Using the CLI

The easiest way to run the HooliChat REST API is through the CLI:

```bash
$ git clone https://github.com/ishitb/hoolichat-api
$ cd hoolichat-api
$ npm install
$ npm run dev
```

After starting the server, you can visit http://localhost:3000/docs in your browser to start playing with your REST API.

### Using Docker

```bash
$ git clone https://github.com/ishitb/hoolichat-api
$ cd hoolichat-api
$ docker build --tag hoolichat-api .
```

#### Running the HooliChat API Image

```bash
$ docker run --name my-hoolichat-api -p 3000:3000 -d hoolichat-api
```

# 🤝Contributing

Thank you for your interest in contributing to HooliChat API. Regardless of the size of the contribution you make, all contributions are welcome and are appreciated.

If you are new to contributing to open source, please read the Open Source Guides on [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/).

## Ways to Contribute

If you are ready to start contributing code right away, we have a list of [good first issues](https://github.com/ishitb/hoolichat-api/labels/good%20first%20issue) that contain issues with a limited scope.

### Our Development Process

We utilize GitHub issues and pull requests to keep track of issues and contributions from the community.

### Pull Request Guidelines

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

In order to give everyone a chance to submit a pull request and contribute to the HooliChat API project, we have put restrictions in place. This section outlines the guidelines that should be imposed upon pull requests in the HooliChat API project.

-   Pull requests must be based on [open issues](https://github.com/ishitb/hoolichat-api/issues) available or you can create your own issues.
-   [Use this method to automatically close the issue when the PR is completed.](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue)
-   Each contributor may only create one pull request at a time. We have this rule in place due to our limited resources - if everyone was allowed to post multiple pull requests we will not be able to review them properly. It is also better for contributors because you can focus on creating one quality PR - so spend time making sure it is as good as it can be.
-   If the pull request's code quality is not up to our linting preferences, it would break the app. So please be careful when creating a PR.
-   All pull request must have test units. If for some reason it is not possible to add tests, please let us know and explain why. In that case, you'll need to tell us what steps you followed to manually test your changes.
-   Do not force push. If you make changes to your pull request, please simply add a new commit as that makes it easy for us to review your new changes. If you force push, we'll have to review everything from the beginning.
-   PR should be small, easy to review and should follow standard coding styles.
-   If PR has conflicts because of recently added changes to the same file, resolve issues, test new changes and submit PR again for review.
-   PRs should be atomic. That is, they should address one item (issue or feature)

### Branching Strategies

For HooliChat API, we had employed the following branching strategy to simplify the development process and to ensure that only stable code is pushed to the `master` branch:

-   `develop`: For unstable code and bug fixing
-   `alpha-x.x.x`: For stability testing
-   `master`: Where the stable production ready code lies

### Contributing Code

Code contributions to HooliChat come in the form of pull requests. These are done by forking the repo and making changes locally.

Make sure you have read the [Documentation for Setting up the Project](#configuration)

The process of proposing a change to HooliChat API can be summarized as:

-   Fork the HooliChat API repository and branch off `master`.
-   The repository can be cloned locally using `git clone <forked repo url>`.
-   Make the desired changes to the HooliChat API source.
-   Run the app and test your changes.
-   If you've added code that should be tested, write tests.
-   After making changes you can add them to git locally using `git add <file_name>`(to add changes only in a particular file) or `git add .` (to add all changes).
-   After adding the changes you need to commit them using `git commit -m '<commit message>'`(look at the commit guidelines below for commit messages).
-   Once you have successfully commited your changes, you need to push the changes to the forked repo on github using: `git push origin <branch_name>`.
-   Here branch name must be of the format `<label>`/`<change-title>`. The `<label>` must be the label of the issue you are resolving, be it feature, bug, etc.
-   Now create a pull request to the HooliChat repository from your forked repo. Open an issue regarding the same and link your PR to it.
-   Ensure the test suite passes, either locally or on CI once a PR has been created.
-   Review and address comments on your pull request if requested.

# 👨‍💻Contributors

This project exists thanks to all the people who contribute... we'd love to see your face on this list!

<table>
  <tr>
    <td align="center"><a href="https://github.com/ishitb"><img src="https://avatars.githubusercontent.com/u/53562523?v=4" width="100px;" alt=""/><br /><sub><b>Ishit Beswal</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/prkhrbhsn"><img src="https://avatars.githubusercontent.com/u/38764067?v=4" width="100px;" alt=""/><br /><sub><b>Anant Bhasin</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/kirtiksingh"><img src="https://avatars.githubusercontent.com/u/58079155?v=4" width="100px;" alt=""/><br /><sub><b>Nakul Gupta</b></sub></a><br /></td> 
  </tr>
</table>
