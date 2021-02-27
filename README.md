# Clean architecture example API server (typescript + express)

[![test](https://github.com/nakaakist/clean-architecture-example-typescript/actions/workflows/main.yml/badge.svg)](https://github.com/nakaakist/clean-architecture-example-typescript/actions/workflows/main.yml)

## About

This is a simple API server as an example of [the clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

The API server can create, read, update, and delete users. Here, a user has two attributes: `id` and `name`. It is assumed that `name` must not be empty and it must be unique among all users.

In addition to simple CRUD functions, this API server implements API request validations.
It is designed that **each validation is conducted in an appropriate architectural layer**.

The following tech stack is used in the implementation.

- language: Typescript
- framework: Express (only for routing and parse of requests)
- DB: in-memory mock DB

If you find any bugs, or design & architecture problems, please notify me by creating an issue!

## How to use

### Prerequisites

- Node.js v14.x
- yarn

### Start server

Type `yarn install` and `yarn start` at the root directory.
The server starts at `localhost:8000`.

### Available endpoints

Available endpoints and example requests are the following. (Note that an initial user exists with name "initial-user" even before creating a user).

- Create user

```
curl -X POST localhost:8000/users -H 'Content-Type:application/json' -d '{"name": "hoge"}'
```

- List all users

```
curl -X GET localhost:8000/users
```

- Find user by ID (replace <USER ID> with an appropriate value)

```
curl -X GET localhost:8000/users/<USER ID>
```

- Update user

```
curl -X PUT localhost:8000/users/<USER ID> -H 'Content-Type:application/json' -d '{"name": "fuga"}'
```

- Delete user

```
curl -X DELETE localhost:8000/users/<USER ID>
```

### tests

Type `yarn test` at the root directory to run tests.

## Design notes

### Validation in each architectural layer

As suggested in [this blog](https://ikenox.info/blog/where-to-put-validation-in-clean-architecture/), each validation logic should be implemented in an appropriate layer in the Clean Architecture according to its characteristics.

In this API server, the validation types and the corresponding architectural layers can be summarized as follows.

| API endpoint       | Interface Adapters (Controller)           | Application Business Rules (Use Case Interactor) | Enterprise Business Rules (Entity)                          |
| ------------------ | ----------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------- |
| POST /users        | types and structure of request parameters |                                                  | if `name` is not empty, if `name` is unique among all users |
| GET /users         | types and structure of request parameters |                                                  |                                                             |
| GET /users/{id}    | types and structure of request parameters | if user with requested `id` exists               |                                                             |
| PUT /users/{id}    | types and structure of request parameters | if user with requested `id` exists               | if `name` is not empty, if `name` is unique among all users |
| DELETE /users/{id} | types and structure of request parameters | if user with requested `id` exists               |                                                             |

### Components

The following figure shows the components and classes in this system.
![](./img/components.png)

The dependencies among the components are designed to obey the "dependency rule" of the clean architecture.

Note that the `UserValidator` interface and `UserValidatorImpl` class are responsible for the validation of the user entity in the enterprise business rules layer.
