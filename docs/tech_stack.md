---
template: main.html
title: Tech Stack
hide: 
    - navigation
    - toc
---


<h1> Be-Secure Open Source Security Tech Stacks: </h1>

<p> Open source is a vast technology space. We have frequent releases, bug fixes / patches being published very frequently. It is quite a tedious and time consuming effort for an organization to keep track of all changes that happen across the open source software landscape. Hence we have categorised open source technologies into five Be-Secure Open Source security tech stacks or blue prints to help the Be-Secure community navigate through security assessment of open source projects that are part of one of these categories. </p>

<p> The open source projects are categorized based on purpose, interoperability and technology. They also include other open source dependencies that are frequently required to develop enterprise grade open source solutions. </p>

<h4> Be-Secure Open Source Security tech stacks are - </h4>

* [DevOps [DO]](./bes-devops-tech-stack.md) : Be-Secure tech stacks to secure open source devops tools eg. Ansible, Puppet etc.  

* [Language and framework [L&F]](./bes-lang-framework-tech-stack.md): Be-Secure tech stacks to secure language and framework built on generic languages e.g. Ruby & Rails, PHP & Symphony, Python & Django, Javascript & Angular/Node etc.

* [Application [A]](./bes-app-tech-stack.md): Be-Secure tech stacks for fully function open source applications like Drupal, magneto, odoo etc.  

* [Distributed & Decentralized Application [DA]](./bes-dist-decent-tech-stack.md): Be-Secure tech stacks for distributed and decentralized Distributed application, few e.g. are Blockchain frameworks like Hyperledger Indy, Hyperledger Fabric , Quorum etc. 

* [Open-source Security Tool [S]](./bes-open-source-security-tool-tech-stack.md): Be-Secure tech stacks for open source security tools eg. ZAP, BeEF etc. 

| DevOps Stack (DO) | Language & Framework Stack (L&F) | Application Stack (A) | Distributed & Decentralized Application Stack (DA) | Open Source Security Tool Stack (S) |
|:-------------------------:|:----------------------------------:|:-----------------------:|:----------------------------------------------------:|:-------------------------------------:|
| Prometheus - All, | Tensorflow | Espocrm | Fabric | ModSecurity |
| DefectDojo | Pykale | Pimcore | Indy-sdk | Threat-dragon |
| Hygieia | Wagtail (Python-Django) | Kaa | Sawtooth | Archery-sec |
| Grafana | Saleor (Python-Django) | ROS | Aries | Anchore-engine |
| Kafka | Healthchecks (Python-Django) | Canvas-android | Caliper | Clair |
| RabbitMQ server | Spring-security (Java-Spring) | FarmOS | Burrow | Trivy |
| Captain Stack | Springfox (Java-Spring) | Canvas-LMS | Besu | CS-suite |
| Gpt-code-clippy | Dispora (Ruby-Rails) | Magento2 | Iroha | Alerta |

<p> Each BeSecure tech stack will be associated with two types of BeSman environments namely the Development or Provisioning environment [Dev] as well as the security testing or security sandbox environment [Sec]. </p>


<h4> BeSecure Environment for Blue teams/Teaming </h4>

<p> This is an environment configured for an open source project, prebundled with the required security tools and dependencies that would permit the Blue team to validate application of security patches and confirm compliance to all defined security controls. 
 </p>

<h4> BeSecure Environment for Red Teams/Teaming </h4>

<p> This is an environment configured for the Red team, prebundled with the required security tools and dependencies to conduct red teaming activities on an open source project with focus on unearthing vulnerabilities and exploits to compromise the security posture of the project. 
 </p>

The Security assessment report of the tracked project will be updated under [BeSLighthouse](https://be-secure.github.io/BeSLighthouse) project.

