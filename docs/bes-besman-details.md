---
template: main.html
title: BeSman
hide: 
    - navigation
    - toc
---

<div align="justify">
One of the first utilities to be created as part of the Be-Secure project is BeSman.
<p><p>
BeSman is a command-line utility to provision customized environments for each open source tech stack. These environments are known as BeSman environments. We have two types of BeSman environments – dev and sec environments. 
<p>
The development environment is pre-bundled with all tools and dependencies that a developer would need to work on a specific open source project. Similarly, the sec environments are pre-bundled with a set of open source security tools that a security tester can leverage to conduct planned security assessment. 
</div>
 
**Why do we need BeSman utility**

<div align="justify">
Individuals spend considerable effort to set up and configure the open source project in their local environment to evaluate it / commence working on it. At times individuals run into configuration issues or set up issues which result in them spending more effort to resolve them. This is a sizeable effort that is spent just to get the environment up as compared to the effort spent to build newer capability using an existing open source project. This is a misspend effort that should be managed in a better way. 
The BeSman utility provides command-line capability to provision customized environments quickly and in a consistent manner. 
</div>
 
**How can BeSman utility help**

<div align="justify">
BeSman environments are pre-bundled with tools and dependencies for a specific open project and it can be provisioned using simple bash shell commands from BeSman utility.

 
BeSman utility will also provide configurable capabilities that would permit the user to configure the tools and dependencies to be pre-bundled in the environment.

 
Individuals will have complete control over what goes into building and provisioning the environment.

 
The base BeSman environment can be customized further to address specific project needs. This gives a lot of flexibility to the developer/security  tester to optimize their work environment in a seamless manner.
</div>

#### **Getting started guide**

**Installing BeSman using oah-shell **

We will be using [oah-installer](https://github.com/hyperledgerkochi/oah-installer), a component of [OpenAppHack(OAH)](https://openapphack.github.io/OAH/), to install [oah-shell](https://github.com/hyperledgerkochi/oah-shell) in the local system and using it to bring up [oah-bes-vm](https://github.com/Be-Secure/oah-bes-vm) with BeSman installed.

**_Pre-requisites_**

* Virtual Box

* Vagrant

* Ansible


**_Installation_**

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


**_Testing_**

1. Install an environment

    `bes install -env [environment_name] -V [version]`

2. Run the below command to get the list of available enviornments

    `bes list`

3. Uninstall an environment

    `bes uninstall -env [environment_name] -V [version]`


**_Demo_**

<a href="https://vimeo.com/570839886/50aeb9d751" target="_blank">BeSman Demo</a>