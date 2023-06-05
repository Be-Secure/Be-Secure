---
template: main.html
title: BeS-dev-kit
hide: 
    - navigation
---

## What is BeS-dev-kit?

A toolkit project for the Be-Secure community contributors which reduces manual efforts of Be-Secure contributors by automating multiple manual functionalities.

## Who are the end users?

 * BeSLab Admin/Manager
 * Security Specialist

## How can BeS-dev-kit utility help?

* Generate Metadata​: It helps admins, managers and security specialists to add & update an OSS project  in community website.​

* Generate Reports​: It helps security specialists to generate assessment reports for OSS projects. ​

* Generate risk summary​: It helps admins and managers to generate consolidated assessment report in pdf format.​

* Validate version file​: It helps admins to check version details file naming convention & version tag in GitHub pull request.​

* Validate report files​: It helps admins to check report files naming convention  in GitHub pull request.​


## Installing BeS-dev-kit

### Pre-requisites

 * Python 3.10​
 * pip​
 * GitHub personal access token

### Steps

1. Open your terminal

2. Install BeS-dev-kit using below command

    `python3 -m pip install besecure-developer-toolkit​`

3. Confirm the installation BeS-dev-kit by executing the below command which would list various dev-kit commands

    `bes-dev-kit --help`

## Install from source

### Pre-requisites

* [poetry](https://python-poetry.org/). Use the [link](https://python-poetry.org/docs/) to install Poetry.
* [Github CLI(gh)](https://github.com/cli/cli/blob/trunk/docs/install_linux.md)
  
### Steps

1. Open your terminal
2. Clone the BeS-dev-kit - `$ git clone https://github.com/Be-Secure/besecure-developer-toolkit.git`
3. Move into the cloned directory.
4. Run the command - `$ poetry add "typer[all]"`
5. Create a new virtual env using Poetry - `$ poetry shell`
6. Run the command to install the tool- `$ poetry install`
7. Check installation - `$ bes-dev-kit --help`

## Usage

### Generate Metadata

`bes-dev-kit generate-metadata​`

This command used to generate json object & version details file of an open-source project that is listed in Be-Secure issues. And it also add the json object & version file in OSSP-Master.json & version_file in besecure-osspoi-datastore respectively.​

### Generate Reports​

`bes-dev-kit generate-report​`

This command can generate the following reports- Scorecard, Criticality_score, codeql. After generating these reports, it can add the report files in besecure-assessment-datastore.​

### Generate risk summary​

`bes-dev-kit risk-summary​`

This command takes the necessary data from report files & downloads consolidated assessment summary in pdf format.​

### Validate report files​

`bes-dev-kit validate-report-file​`

It helps pull request reviewers to validates the naming convention of report files / if report files are available.​

### Validate version details file​

`bes-dev-kit validate-version-file​`

It helps pull request reviewers to validates naming convention & version tag of version file in besecure-osspoi-datastore.​