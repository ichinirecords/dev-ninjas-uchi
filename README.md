<p align="center">

  <h1 align="center">Uchi - fundraising through art</h3>

  <p align="center">
    React + Node + PostgreSQL app where refugees can upload art in various formats. After approval, the artwork is visible to visitors who can donate to Migrant Help UK
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

<!-- ABOUT THE PROJECT -->

## About The Project

<p>Many individuals and families, particularly asylum seekers and refugees, are experiencing increased social exclusion and isolation due to the Covid-19 pandemic. Many have lost connections to their home country, traditions, and culture. ‘Uchi’ (which means ‘home’ in Japanese) celebrates belonging, identity and love using the power of art, connecting and uplifting people during this difficult time. </p>

<p> This is a platform where people can contribute their own ‘Uchi’ art and explore other people’s stories from around the world. The website also helps raising awareness of migrant issues and fundraising for the Neil Wildman Children’s Fund.</p>

<p>Demo at https://dev-ninjas-uchi.herokuapp.com/</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Node >= 14.15.1
Connection to a PostgreSQL database
AWS account

### Installation

1. Clone the repo

```sh
git clone https://github.com/scarabeo7/dev-ninjas-uchi.git
```

2. Install the necessary Node packages

```sh
npm install
```

3. Create a .env file in your root folder with the necessary environment variables.

4. Start the local development app.

```sh
npm run dev
```

5. Run tests.

```sh
npm test
```

<!-- USAGE EXAMPLES -->

## Usage

### Home page

<p>On the main page visitors can see uploaded art in an interactive map. They have the option to switch to list view, filter specific media types and search for content.</p>

<p align="middle">
	<img src="https://github.com/scarabeo7/dev-ninjas-uchi/blob/staging/img/home-map.png?raw=true" alt="drawing" width="500"/>
	<img src="https://github.com/scarabeo7/dev-ninjas-uchi/blob/staging/img/home-list.png?raw=true" alt="drawing" width="500"/>
</p>

### Upload form

<p>This form allows the artist to upload their content in text, image, audio and video format. They need to provide their name and the title of their work, their location. Upon successful upload, they will be notified their work has been submitted and is awaiting admin approval.</p>
<p align="center">
	<img src="https://github.com/scarabeo7/dev-ninjas-uchi/blob/staging/img/upload-form.png?raw=true" alt="drawing" width="600"/>
</p>
### Admin area

<p>The admin can approve or reject submitted artwork, as well as edit artwork before approving it. They can also view all artwork on the database, search by title and artist name, edit and delete any item in the database. An email digest with details of submitted artwork awaiting approval is sent daily to all admins.</p>
<p>The form to create a new admin account is only accessible in the admin area. Once email address and username for the new user are entered, they will receive an email to set their new password.</p>
<p align="center">
	<img src="https://github.com/scarabeo7/dev-ninjas-uchi/blob/staging/img/admin.png?raw=true" alt="drawing" width="600"/>
</p>
