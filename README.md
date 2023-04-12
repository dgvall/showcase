# Showcase

Showcase is a single page application that allows users to create accounts, upload artworks, and like other artists' artworks.

## How Showcase Works

### Creating an Account

Signing up is as easy as picking a unique username and assigning a password. Accounts are associated with uploaded artworks and user liked artworks.

### Uploading an Artwork

Once a user is signed in, they will be able to upload artworks. Artworks are required to have a title, an image url, and associated tags. The author of the post will be able to edit and delete their artwork from the cooresponding artwork page.

### Tags

Tags are custom keywords that are associated with artworks. They are assigned during the upload process and can also be edited at anytime by the author of that post. Tags can be searched via the search bar or clicked from an artwork page, both will show all artworks that are associated with that tag.

### Likes

A user may like any artworks that are not their own. The homepage shows artworks in order of their "popularity", or how many likes they have. Likes not only serve to show appreciation of artworks to place them higher on the homepage, but are also displayed on accounts.

## Front-end Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

In the /showcase directory, run

### `npm install --prefix client`

Installs packages necessary for the build to function.

### `npm start --prefix client`

Runs the front-end on port http://localhost:4000.

## Back-end Setup

This project was built with with [Ruby](https://github.com/ruby).

## Installation

In the /server directory, run

### `bundle install`

Installs gems necessary for server to function.

### `rails db:create`
Runs migration files and builds schema for database

### `rails s`

Runs the server on port http://localhost:3000.