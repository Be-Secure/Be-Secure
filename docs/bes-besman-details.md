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


### Create an environment script

#### Dependent on ansible roles

Clone the [repo](https://github.com/Be-Secure/besecure-ce-env-repo) before running the command. 

	bes create -env <environment> -V <version>

Once you run the command, you will be prompted to provide the path to the cloned dir.

This command would create an environment script which piggybacks on Ansible roles as well as a configuration file. Both the files will be present in your `besecure-ce-env-repo` dir. 

The template of the config file is given below. You can use this to modify the parameters of the environment script as well as ansible roles
```
---
BESMAN_ORG: Be-Secure
BESMAN_OSSP: 
BESMAN_OSSP_CLONE_PATH: $HOME/$BESMAN_OSSP
BESMAN_ANSIBLE_ROLES_PATH: $BESMAN_DIR/tmp/$BESMAN_OSSP/roles
BESMAN_ANSIBLE_ROLES: # Comma separated list of ansible roles <namespace>/<repo>,<namespace>/<repo> 
BESMAN_OSS_TRIGGER_PLAYBOOK_PATH: $BESMAN_DIR/tmp/$BESMAN_OSSP
BESMAN_OSS_TRIGGER_PLAYBOOK: besman-$BESMAN_OSSP-[BT/RT]-trigger-playbook.yaml
BESMAN_DISPLAY_SKIPPED_ANSIBLE_HOSTS: false
# Please add other variables as well as ansible variables here`
openjdk_version: 1.8
```

If you wish to modify the parameters of the config file,

1. Visit the [env repo](https://github.com/Be-Secure/besecure-ce-env-repo)
2. Move into the dir of the project you wish to install
3. Copy the config file
4. Paste it in you `user home` under the same name.
5. Modify the parameters
6. Run the install

#### Benefits

- **Control** - Easier control over the tools which gets installed.
- **Configurability** - Easier to configure the tool parameters.

#### Standalone environment script

If you wish to create a standalone environment script which doesn't rely on Ansible roles, run the below command.

	bes create -env <environment> -V <version> basic

#### Benefits

- **Light weight** - Light weight script as it doesn't rely on ansible or roles.

### List the available environments

At any time, besman can install environments from a single source - 

1. A remote environment repo
   
		bes set BESMAN_LOCAL_ENV False
		bes set BESMAN_ENV_REPOS <namespace>/<repo>
		bes list

	The output will mention which repo BeSman points to now.

2. Local environment dir

		bes set BESMAN_LOCAL_ENV False
		bes set BESMAN_LOCAL_ENV_DIR <complete path to you besecure-ce-env-repo dir>
		bes list

	The output will mention the dir BeSman points to now.

	When you run the `create` command, the list command will be automatically updated to point to the local env dir.

### Install an environment

You can install and environment by running the below command. Make sure the environment is listed when running the `bes list` command.

	bes install -env <environment name> -V <version>

The default configuration file for the environment will be residing next to the environment script inside the remote repo or the local directory.

If you wish to override any default values have a copy of the configuration file in your `user home` dir and make the changes.

### Uninstall an environment

Run the below command to uninstall an environment. This would remove the tools installed using installation.
   
	bes uninstall -env <environment name>

### Validate the installation 

Validate the installation/uninstalltion by running,

	bes validate -env <environment name>


### Update configurations

   Run the below command to update the configurations in an environment

	bes update -env <environment name>

### Reset configurations

Run the below command to reset the configurations to default.

	bes reset -env <environment name>

### Install an environment from a different repo

1. Make sure you fork or have a repo with the format similar to [Be-Secure environment repo](https://github.com/Be-Secure/besecure-ce-env-repo).
2. Update the `list.txt` file in the repo to reflect the `GitHub org` and `Repo name`.
3. Run the bes set command to make BeSman point to a different repo.
   
		bes set BESMAN_LOCAL_ENV False
		bes set BESMAN_ENV_REPOS <namespace>/<repo>	

4. Run the list command

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
