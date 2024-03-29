![Fluenty Logo](public/assets/images/fluenty.png)
# Fluenty Web App

Fluenty web-site built in Next.js with React + Vite.

## Table of Contents
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Learn More](#learn-more)
    - [Next.js](#nextjs)
    - [React + Vite](#react+vite)
    - [Deploy](#deploy)
        - [Deployment Steps & Considerationsl](#deploymentsteps&considerations)
- [Acknowledgments](#acknowledgments)

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.
```
Node Version: 20.10.0
```
```
Next-Auth Version: ^4.
```

### Installation

1. Clone the repository
```bash
git clone https://git@github.com:<your-GitHub-username >/fluenty-web-app.git
```
2. Change to your project directory
```bash
cd your-project
```
3. Run npm install
```bash
npm install
```
4. Run development server
```bash
npm run dev
```
5. Open it up to see the results
```
Open [http://localhost:3000]
(http://localhost:3000) 
with your browser to see the result.
```
5. Now you are ready to start developing
```
You can start editing
 the page by modifying `pages/page.js`. 
 The page auto-updates as you edit the file.
```

## Usage

Explain how to use your project. Provide examples if necessary.

## Folder Structure

1. Always Make A Comment to make less code is the page directory.
2. We are using the .module.css for style components

![Create routes via your file + folder structure](public/assets/images/nextjs-file-based-routing.png)

your-project/

│

├── pages/

│   ├── page.js

│   ├── about

│   │   ├── page.js

│   │   └── [id].js

│   ├── [id]

│   │   ├── [...id].js

│   │   └── [id].js

│   └── ...

│

├── components/

│   ├── Header

│   │   ├── Header.js

│   │   └── Header.module.css

│   ├── Footer

│   │   ├── Footer.js

│   │   └── Footer.module.css

│   └── ...

│

└── ...

## Features

List the key features of your project.

### Commiting your work

When commiting you work you need to add one of these :
1. [PATCH] = bugs / fixes small tasks
2. [MINOR] = functions / Mid to big task
3. [MAJOR] = fall site up left / major task

this will increase the version number.

e.g. ❯ git commit -m "add Example [PATCH]"

## Contributing

Writing code:
1. Use camelCase.
2. Components have Uppercase starting letter in files & directory.
3. Using Next-Auth version ^4.

Creating a new branch flow:
1. Pull main
2. Create a new branch of main
3. Make changes and commit
4. Push to the branch
5. Open a pull request

OR

Working branch flow:
1. Pull on main (When Pull Requesy is merge to main)
2. Checkout to your branch
3. Git pull on your branch
4. Git merge main into your branch
5. Make changes and commit
6. Push to the branch
7. If you have not made a Pull Request then Open a pull request


## License

This project is licensed under the [Your License] - see the LICENSE.md file for details.

## Learn More

### Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


### Deploy
#### AWS Amazon S3 Bucket Deployment
Go to the AWS Amazon https://console.aws.amazon.com and login.

look for 'S3' and select it,
then scroll down to 'create bucket' and click on button.
scroll to 'Bucket name' and enter the name you want and level everything as default select already.
Click on 'Create bucket'
then in 'General purpose buckets' search for your bucket you just create. and click on it.

Once in the bucket look for 'Properties' and click it.
Scroll down to 'Static website hosting' and click edit.
Scroll down to 'Static website hosting' and click 'Enable'.
Scroll down to 'Index document' and enter 'index.html'.
Scroll down to 'Error document - optional' and enter '404.html'.
click on 'Save changes',
Once in the bucket look for 'Permissions' and click it.
scroll down to 'Block public access (bucket settings)'
click on 'edit',
uncheck 'Block all public access'
click on 'Save changes',
scroll down to 'Bucket policy'
click on 'edit' and  enter
````
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<YOUR BUCKET NAME>/*"
        }
    ]
}
````
replace <YOUR BUCKET NAME> with the bucket real bucket name by scrolling and copy BUCKET ARN.
click on 'save changes'

click the aws logo in the top left side, look for 'cloudfront' and select it,
then scroll down to 'create distributions ' and click on button.
Scroll to 'Origin domain', in input click and dropdown will appear, look for the bucket name and select it.
Scroll to 'Enable Origin Shield', click 'Yes'
Scroll to 'Viewer', click 'Redirect HTTP to HTTPS'
Scroll to 'Web Application Firewall (WAF)', click 'Enable security protections' and toggle 'Use monitor mode'
Scroll to 'Settings', click 'Use all edge locations (best performance)'
Scroll to 'Default root object - optional', enter 'index.html'
Scroll to 'create distributions', click the button.

click the aws logo in the top left side, look for 'IAM' and select it,
in the left hand side menu look for 'Policies' and click it.
Look for "Create policy" and click the button.
Look for "JSON" and click the button.
Enter 
````
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "sts:TagSession",
                "sts:*",
                "cloudfront:CreateInvalidation"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::<YOUR BUCKET NAME>"
        },
        {
            "Sid": "VisualEditor2",
            "Effect": "Allow",
            "Action": "s3:*Object",
            "Resource": "arn:aws:s3:::<YOUR BUCKET NAME>/*"
        }
    ]
}
````
replace <YOUR BUCKET NAME> with the bucket real bucket name, copy S3 BUCKET ARN.
Click Next.
scroll to 'Policy details', look for 'Policy name' and enter 'S3-<YOUR BUCKET NAME>-policy'.
Click 'Create policy'.

In the left hand side menu look for 'Identity providers' and click it.
Look for 'Add provider' and click the button.
Scroll to 'Configure provider', and select 'OpenID Connect',
Look for 'Provider URL', enter 'https://token.actions.githubusercontent.com',
Look for 'Get thumbprint', click the button and wait till displays info.
look for 'Audiences', enter 'sts.amazonaws.com,
Click 'Add provider'
Look for 'Assign role' and click it.
Then select 'Create a new role'.
click next
Scroll to 'Trusted entity type', and select 'Web identity',
Scroll to 'Web identity', and look for 'Identity provider', in dropdown select 'token.actions.githubusercontent.com',
look for 'Audience', in dropdown select 'sts.amazonaws.com',
look for 'GitHub organization', enter GitHub name. the part after https://github.com/ and before the next /,
Click next.
Scroll down to 'Permissions policies' and search for 'AmazonS3FullAccess' and checkbox it.
and search for 'the policy you just create' and checkbox it.
Click next.
Scroll down to 'Role details', look for 'Role name', enter 'github-oidc-<YOUR BUCKET NAME>-role '.
click 'Create role'

#### GitHub Actions Deployment in Codebase
In the codebase at root level make a Directory called '.github' then make Two more Directory in there called 'scripts' and 'workflows'.
In the 'workflows' make a files 'deploy-staging.yml' and 'pull-request-main.yml'.

In 'deploy-staging.yml' this is where you make the call to GitHub actions to deploy to AWS S3 bucket,
````
name: Next.js Deployment to Staging

on:
  push:
    branches:
      - main
    paths-ignore:
      - 'README.md'
permissions:
  id-token: write
  contents: read
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Cache dependencies
        id: cache-deps
        uses: actions/cache@v3
        with:
          path: node_modules
          key: deps-node-modules-${{ hashFiles('./package-lock.json')}}
      - name: Install dependencies and build
        run: |
          npm install
          npm run build
          ls
      - name: Upload Artifacts
        uses: actions/upload-artifact@v4
        with:
            name: dist-files
            path:
                ./out

  deploy:
    runs-on: ubuntu-latest

    needs: build

    steps:
      - name: Download Artifacts
        uses: actions/download-artifact@v4
        with:
          name: dist-files
          path: dist-files-s3
      - name: output contents
        run: | 
          ls
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_KEY }}
          aws-region: ${{ secrets.AWS_SECRET_REGION_KEY }}
      - name: Sync build output to S3 bucket
        run: |
          aws s3 sync ./dist-files-s3 s3://${{ secrets.AWS_S3_BUCKET }}
      - name: Copy files to production website with the AWS CLI
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.AWS_CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
````

In 'pull-request-main.yml' this is where you make the call to GitHub actions to version bump,
````
name: Pull Request Main
on:
  pull_request:
    branches:
      - main
jobs:
  check_pr_title:
    name: Semver Validation and Bump
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          ref: ${{ github.head_ref }}

      - name: Get Semver Bump
        run: |
          echo The Title of your PR is ${{ github.event.pull_request.title }}
          echo "BUMP=$(${GITHUB_WORKSPACE}/.github/scripts/check_for_semver_bump.sh '${{ github.event.pull_request.title }}')" >> $GITHUB_ENV
          echo $BUMP

      - name: Increment Version
        run: |
          PACKAGE_VERSION=$(cat ./package.json | jq -r '.version')
          if [ $(git tag -l "$PACKAGE_VERSION") ]; then
            echo "Tag for $PACKAGE_VERSION already exists; bumping version."
            ${GITHUB_WORKSPACE}/.github/scripts/bump_package_version.sh ${{ env.BUMP }}
            git config user.name "GitHub Actions"
            git config user.email "github-actions@users.noreply.github.com"
            git commit -am "Bumping version [skip ci]"
            git push
          else
            echo "Tag for $PACKAGE_VERSION does not exist; nothing to do."
          fi
````

In the 'scripts' make a files 'append_to_version.sh' and 'bump_package_version.sh' and 'check_for_semver_bump.sh'.
These files are called in the 'workflows' -> 'pull-request-main.yml' to make the GitHub action run.

In 'append_to_version.sh' this is where you run a shell script to for version,
````
#!/bin/bash

# Check if the script is provided with an argument
if [ $# -eq 0 ]; then
    echo "Info: No input provided. Exiting."
    exit 0
fi

input_string="$1"

# Read the current version from package.json
current_version=$(jq -r .version package.json)

# Append the input string to the version
new_version="${current_version}-${input_string}"

# Update the version in package.json files
sed -i.bak "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" package.json

# Clean up backup files
rm -f package.json.bak

echo "Version updated from $current_version to $new_version"

````

In 'bump_package_version.sh' this is where you run a shell script check for PATCH/MINOR/MAJOR and increase the version,
````
#!/bin/bash

# Check if the script is provided with an argument
if [ $# -eq 0 ]; then
    echo "Error: Please provide either MAJOR, MINOR, or PATCH as an argument."
    exit 1
fi

# Read the current version from package.json
current_version=$(jq -r .version package.json)

# Function to increment version component
increment_version() {
    local version="$1"
    local component="$2"
    echo "$version" | awk -F. -v OFS=. -v idx="$component" '{++$idx; for (i=idx+1; i<=NF; ++i) $i=0} 1'
}

# Increment the version based on the provided argument
case $1 in
    "MAJOR" | "major")
        new_version=$(increment_version "$current_version" 1)
        ;;
    "MINOR" | "minor")
        new_version=$(increment_version "$current_version" 2)
        ;;
    "PATCH" | "patch")
        new_version=$(increment_version "$current_version" 3)
        ;;
    *)
        echo "Error: Invalid argument. Please provide either MAJOR, MINOR, or PATCH."
        exit 1
        ;;
esac

# Update the version in package.json files
sed -i.bak "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" package.json

# Clean up backup files
rm -f package.json.bak

echo "Version updated from $current_version to $new_version"

````
In 'bump_package_version.sh' this is where you run a shell script check the first commit and the commit title for [PATCH]/[MINOR]/[MAJOR] and strips is from the commit,
````
#!/bin/bash

# Function to check if the input string contains a version component
check_version_component() {
    local input_string="$1"

    # Check for [MAJOR], [MINOR], and [PATCH] components
    if echo "$input_string" | grep -q "\[PATCH\]"; then
        echo "PATCH"
    elif echo "$input_string" | grep -q "\[MINOR\]"; then
        echo "MINOR"
    elif echo "$input_string" | grep -q "\[MAJOR\]"; then
        echo "MAJOR"
    else
        echo "Error: The string does not contain [MAJOR], [MINOR], or [PATCH]."
        exit 1
    fi
}

# Main script

# Check if the script is provided with an argument
if [ $# -eq 0 ]; then
    echo "Error: Please provide a string as an argument."
    exit 1
fi

input_string="$1"

# Check for [MAJOR], [MINOR], or [PATCH] components in the string
check_version_component "$input_string"
````

#### GitHub Actions Deployment in GitHub
Go to the GitHub https://github.com/
Login and got to the Repo.
Click 'SETTINGS'
the in the left hand menu look for 'secrets and variables', click on that the it will open a dropdown select 'Actions'.
Then scroll down to 'Repository secrets', Click on 'new repository secret'
fill in name and value of the secret. 
repeat till all secrets are in.

AWS_ROLE_KEY = IAM -> Roles -> github-oidc-<YOUR BUCKET NAME-role, look for ARN and copy the value.
AWS_SECRET_REGION_KEY = the region you selected when setting the AWS S3 bucket.
AWS_S3_BUCKET = the AWS S3 bucket name.
AWS_CLOUDFRONT_DISTRIBUTION_ID = CloudFront -> Distributions ->ID

#### Deployment Steps & Considerations
1. Add page metadata, optimize code, remove unnecessary dependencies
2. Use environment variables for variable data (e.g. database credentials, API keys, ...)
3. Do a test build and test the production-ready app locally or on some test server
4. Deploy

## Acknowledgments

Thank you for your contribution to help build the web-site:

Vincent van Wyk,
Founder Fluenty

Terri Ogden,
COO Fleunty

