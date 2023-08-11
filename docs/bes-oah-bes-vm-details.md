---
template: main.html
title: oah-bes-vm
hide: 
    - navigation
---

# What is oah-bes-vm? 
A substrate that brings up bundles of BeS & other tools to perform Red Team & Blue Team activity.

# Who are the end users?

RT & BT activist of BeS community.

# Features of oah-bes-vm?

 * Offers bundles of BeS tools that would enable users to fast track their Red Teaming / Blue Teaming activities by significantly reducing effort spent on setting up respective environments.  

 * It helps to isolate the installation of BeS projects in a specific environment. 

 * According to the needs, user can configure oah-bes-vm during installation. 

# List of tools

## BeS tools

 1. BeSman

 2. BeS-dev-kit


# How to bring up oah-bes-vm?

There are two modes to bring up oah-bes-vm. 

 1. Install all BeS & other tools directly to the host system without using VirtualBox.
 
 2. Bring up VirtualBox & install BeS & other tools inside it.

### Steps

 **Install oah-shell**

1. Open your terminal

2. Install oah-shell

    `curl -L https://raw.githubusercontent.com/Be-secure/oah-installer/master/install.sh | bash`

3. Confirm the installation oah-shell by executing the below command which would list various oah commands

    `oah`

4. Execute the below command to get the list of environments

    `oah list`

    **Note:** Make sure oah-bes-vm is listed. If not, execute step 2 and run the below command

    `source ${OAH_DIR}/bin/oah-init`


 **Execute below command to setup oah-bes-vm without using VirtualBox.**
  
    `oah install -s oah-bes-vm`

##or

**Follow below steps to setup oah-bes-vm inside VirtualBox.**

##### Pre-requisites

* [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](https://www.vagrantup.com/)
* [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

##### Execute the below command

    `oah install -v oah-bes-vm`


# FAQ

1. **What is oah-shell?**

    Ans: oah-shell is an open-source utility to setup oah-bes-vm.

2. **What is the default username & password for oah-bes-vm?**
    
    Ans: Username- vagrant & password- vagrant