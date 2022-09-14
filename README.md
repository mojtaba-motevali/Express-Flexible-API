## Introduction

This application is an express application powered by inversify library and typescript that supports bulk resource creation and flexible filters to be specified in queries by clients in order to receive data. In the following sections I'm going to explain approaches I've taken.

First of all, the application is divided into middlewares, controllers, services and repositories sections, and each section has it's own responsibility meaning that no code is written in a function or class that can be considered irrelevant.

To get started with middlewares, each request goes through sanitization and validation middlewares before it can hit controller layer. In sanitization part, a data object transfer ( DTO ) is created from request, which is made by user, to be given to validation layer for validation purposes. Having object validated, it's passed into repository service, where database calls are made, by going through controller and service respectively. In summary, santiziation and validation are key features that allow validated flexible filters to be supported in queries.

Second, controllers are there to perform controlling logics from business point of view. In addition, services exist to implement business related concepts by using repository services, so integration tests are developed to make sure functionality of methods in service classes stay consistent as application grows larger.

Third, expresses response's `json` function is overrided so response DTO can always remain consistent. In addition, unit tests are written to make sure it remains the same.

Forth, swagger is configured and documentation for each API is provided in controller.ts and doc.ts files so developers can understand how each API works.

Finally, the application is dockerized to make deployment process easier, and configurations can be changed by specifing them in `.env` file or `docker-compose.prod.yaml` file. Two docker files are created, and each has a certain responsibility. For instance, a `test.Dockerfile` file is there to build the application by resolving all dev and normal dependancies and run integration and unit tests, and `prod.Dockerfile` file exists to build the application by resolving only required dependancies and run it.

## Requirements

In order to run this application, you need to have `npm`, `yarn` and `docker` installed.

## Installation

Before running application, please refer to [.env.example](.env.example) file in order to understand required environment variables.

In order to run this application, you need to issue `docker-compose -f docker-compose.prod.yaml run web` command to run only web service along with it's dependant service which is MongoDB, and tests can be executed using `docker-compose -f docker-compose.prod.yaml run test` command.
