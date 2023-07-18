# Sales Report

The objective of the Sales Report is to load the files of the transactions carried out in the sale of products in order to process and display them clearly with the accounted values.


### Technologies used
The Sales Report was structured using the BFF (Backend for Frontend) architecture and was planned so that each layer runs in different containers, including the database. Below is a list of all the technologies that were used in the project:

- Backend
  - `Python 3.10`  
  - `Postgres 14.1`
  - `Django Framework 4.2.3`
- Frontend
  - `Node Js 16`
  - `React Js 18.2`

#### Requirements

Docker containers contain a complete Unix operating system, with all the necessary settings to administer container files. To manage the containers and synchronize with the project's Git repository, it is necessary to have the following packages installed in our system:

- Git
    - `git 2.40`
- Docker
    - `docker 20.10`
    - `docker-compose 1.29`

> The project was developed with these package versions, but you can use other versions, however, they may have different outputs.

## Install
- Clone the project and go to the root path of the project
```sh
git clone git@github.com:ezequiassam2/sales-report.git
```
- Run the following command to start the containers
```sh
docker-compose up
```
- Open our browser, and navigate to 
```
http://localhost:3000
```
- API is available at the following URL
```
http://localhost:8080/api/v1
```

## API Documentation
You can access the API documentation [here](API.md)


## Record of Steps
Before starting the project, I reviewed the Django, ReactJS, and Docker documentation to create the project following the best development practices for each tool.
After reading the requirement completely, I created the repository following the recommendation of what was stipulated. With the repository created, I decided to start working with the documentation, initially with the specification of how the API would be and then this Readme. My decision to start with the documentation was purposeful because I was able to visualize the scope of the project, from which it was possible to plan the development of the application with the following phases:

1. Foundation - Structuring of the project's architecture following the initial configuration of the files used by Docker.
2. BackEnd - Backend development with the Django Framework
3. FrontEnd - Front-end development written in React JS
4. Tests - Creation of unit and integration tests
5. Review - Verification that everything that has been implemented is as requested, in addition to making minor improvements if necessary.


## Meta
Ezequias Sampaio – ezequiassam@gmail.com

>  This is a challenge by [Coodesh](https://coodesh.com/)

>  Project presentation video is available [here](https://www.loom.com/share/08f1e882bb3c4a07ae029c987f765ceb)
