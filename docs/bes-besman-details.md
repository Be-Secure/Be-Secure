---
template: main.html
title: BeSman
hide: 
    - navigation
---

## What is BeSman?

BeSman is a command-line utility to provision customized environments for each open source projects. 

## Environments

We have two types of BeSman environments – **Red Team(RT)** and **Blue Team(BT)**.

### Red Team(RT) environments

The RT environments are bundled with all the tools necessary for a Red Team user to assess the project for vulnerabilities and start working on an exploit. 

### Blue Team(BT) environments

The BT environmnets are bundled with all the tools necessary for a Blue Team user to remediate the vulnerability exploited by Red Team user.

## Playbooks

Be-Secure playbooks are created to run exploits as well as automate activities like security assessments.

There are three types of playbook - **Automated**, **Semi-automated** and **Manual**

### Automated playbooks

The playbooks are either shell scripts or ansible playbooks and the operations are automated.

### Semi-automated playbooks

The playbooks will be jupyter notebooks.

### Manual playbooks

The playbooks are `.md` file and would contain step-by-step info on how to proceed with an activity. 

## Why do we need BeSman utility?

<div align="justify">
<!-- Individuals spend considerable effort to set up and configure the open source project in their local environment to evaluate it / commence working on it. At times individuals run into configuration issues or set up issues which result in them spending more effort to resolve them. This is a sizeable effort that is spent just to get the environment up as compared to the effort spent to build newer capability using an existing open source project. This is a misspend effort that should be managed in a better way.
The BeSman utility provides command-line capability to provision customized environments quickly and in a consistent manner. -->

People invest significant time and energy in the setup and configuration of open source projects on their local systems for evaluation or to begin working on them. However, they often encounter difficulties and setbacks related to configuration, requiring additional effort to resolve these issues. This substantial effort is primarily focused on getting the environment ready, rather than actually leveraging the existing open source project to develop new capabilities. It is important to find more efficient ways to manage this investment of effort. This is where the BeSman utility comes in, offering command-line functionality to swiftly and consistently provision tailored environments.

<!-- BeSman helps security professionals to set up the necessary utilities or tools with a single command. This saves time and effort in setting up their environment.
Environments scripts provide the  -->
</div>

## How can BeSman utility help?

<div align="justify">
BeSman environments are pre-bundled with tools and dependencies for a specific open project and it can be provisioned using simple bash shell commands from BeSman utility.

BeSman utility will also provide configurable capabilities that would permit the user to configure the tools and dependencies to be pre-bundled in the environment.

Individuals will have complete control over what goes into building and provisioning the environment.

The base BeSman environment can be customized further to address specific project needs. This gives a lot of flexibility to the developer/security  tester to optimize their work environment in a seamless manner.

BeSman environments come pre-packaged with all the necessary tools and dependencies for a particular open source project. These environments can be easily provisioned using simple bash shell commands through the BeSman utility.

Additionally, the BeSman utility offers configurable capabilities, allowing users to customize the selection of tools and dependencies included in the environment. This gives individuals complete control over the setup and provisioning process, enabling them to tailor the environment to their specific needs.

Moreover, the base BeSman environment is highly adaptable and can be further customized to meet the unique requirements of a particular project. This level of flexibility empowers developers and security testers to effortlessly optimize their work environment according to their preferences.
</div> 

## Installing BeSman using oah-shell

We will be using [oah-installer](https://github.com/hyperledgerkochi/oah-installer), a component of [OpenAppHack(OAH)](https://openapphack.github.io/OAH/), to install [oah-shell](https://github.com/hyperledgerkochi/oah-shell) in the local system and using it to bring up [oah-bes-vm](https://github.com/Be-Secure/oah-bes-vm) with BeSman installed.

### Pre-requisites

* Virtual Box

* Vagrant

* Ansible

### Steps

1. Open your terminal

2. Install oah-shell

    `curl -L https://raw.githubusercontent.com/Be-secure/oah-installer/master/install.sh | bash`

3. Confirm the installation oah-shell by executing the below command which would list various oah commands

    `oah`

4. Execute the below command to get the list of environments

    `oah list`

    **Note:** Make sure oah-bes-vm is listed. If not, execute step 2 and run the below command

    `source ${OAH_DIR}/bin/oah-init`

7. Setup oah-bes-vm for BeSman by executing the below command.
  
    `oah install -v oah-bes-vm`

## Install from source

### Pre-requisites

* [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
* [Github CLI(gh)](https://github.com/cli/cli/blob/trunk/docs/install_linux.md)
  
### Steps

1. Open your terminal
2. Run the installer script
   
        curl -L https://raw.githubusercontent.com/Be-Secure/BeSman/dist/dist/get.besman.io | bash

3. Source the files into memory
   
        source $HOME/.besman/bin/besman-init.sh

4. Confirm installation

        bes 

## Usage

### Install an environment

All the BeSman environments reside in the [Be-Secure environment repo](https://github.com/Be-Secure/besecure-ce-env-repo). The respective environments will be pulled during installation.

1. Run the below command and confirm the required environment is listed.

        bes list

2. If not, run the below command to update the list

        bes update

3. Confirm by running `bes list`
4. Run the below command to install the environment

        bes install -env <Github Org>/<Github namespae>/<environment name> -V <version>

### Validate the installation 

1. Run the below command to validate the tools installed by the environment.

        bes validate -env <environment name>

### Uninstall an environment

1. Run the below command to uninstall an environment. This would remove the tools installed using installation.
   
        bes uninstall -env <environment name>

2. You can validate the uninstallation using `validate` command.

### Update configurations

1. Run the below command to update the configurations in an environment

        bes update -env <environment name>

### Reset configurations

1. Run the below command to reset the configurations to default.

        bes reset -env <environment name>

### Install an environment from a different repo

1. Make sure you have a repo with the format similar to [Be-Secure environment repo](https://github.com/Be-Secure/besecure-ce-env-repo).
2. Update the `list.txt` file in the repo to reflect the `GitHub org` and `Repo name`.
3. Open terminal and bring up the user configurations for BeSman.

        nano $HOME/.besman/etc/user-config.cfg

4. Append the repo details to the variable `BESMAN_ENV_REPOS` in the below format.

        BESMAN_ENV_REPOS=Be-Secure/besecure-ce-env-repo,<github org>/<repo name>

5. Upload the changes to memory.

        source $HOME/.besman/bin/besman-init.sh

6. Update the list.

        bes update

7. Confirm updation

        bes list

### Status

Displays the list of installed environments

        bes status

### Run playbooks

1. Fetch playbooks

        bes pull --playbook

2. Confirm the availability

        bes list --playbook

3. Run the playbook

        bes run --playbook <playbook name>

        bes run --playbook <playbook name> --input <inputs>
