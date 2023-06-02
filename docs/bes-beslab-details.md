---
template: main.html
title: BeSLab
hide: 
    - navigation
---

## What is BesLab?

BeSLab is an open source security lab dedicated to fortifying open source projects against potential vulnerabilities. Designed to operate efficiently even in low-resource settings, BeSLab provides a comprehensive solution that grants complete control and transparency to application security and security operations teams. Additionally, it serves as a valuable resource for security researchers by streamlining the process of bringing open source projects under scrutiny and significantly reducing remediation time.

With BeSLab, security professionals can leverage its suite of tools and functionalities to conduct thorough assessments, perform rigorous testing, and identify potential security gaps within open source projects. By offering complete visibility and control, BeSLab empowers security teams to implement robust security measures and safeguards, ensuring the integrity and resilience of open source software. You can leverage BeS Environment Script Repository & BeS Playbooks to Launch OSS Security exploits(Red Teaming) and patching OSS vulnerabilites (Blue Teaming) from within a BeSLab.

### We have developed a CLI tool named BLIman that uses a `Genesis.yaml` to bring in BeSlab usling `BLIman.

## What is BLIman?

This is a commandline tool to install BeSLab using Genesis.yaml.

## What is a Genesis file ?

Genesis file is the main configuration file to bring up the lab. This file contains all the lab configuration as a whole. Example: 
 1. which OS to use 
 2. which tools to be installed
 3. what all are the folder structure to be there
 4. will there be any package manager etc.

There is a `default_genesis.yaml` file which can be placed at user_home/root/.bliman. BLIman would generate the config.yaml file for oah-bes-vm from genesis.yaml file export variables.

## Various way to install BeSLab using BLIman
  1. host mode using oah-bes-vm/ansible
  2. bare metal mode using ansible and oah-bes-vm
  3. directly using besman without oah-bes-vm/ansible using BeSlab env scripts from BeSLab repository.


## Features 
  - designed to run on low resource setting
  - user can specify which tool to add which to remove
  - quickly bring up the lab for red teaming (RT) and Blue teaming (BT) activity
  - simple deployment using `BLiMan`

## How to use ?
 The development is underway and the steps will be shared here soon.

