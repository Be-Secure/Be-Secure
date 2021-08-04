---
template: main.html
title: S Tech Stack
hide: 
    - navigation
    - toc
---



<h1> Open Source Security Tools [S] Tech Stack </h1>

<img src="./assets/images/sec_logo.jpeg" alt="DO" width="200px" height="200px">

<!-- ![app tech stack](./assets/images/sec_logo.jpeg) -->

This security stack focuses on all open source security tools and to secure these tools for utilization.


> **Application Security Testing (SAST )**

| Sl.No  | BeSman Env name                | Dependencies                             |  Entities Prebundled in besman Env                           |
|--------|--------------------------------|------------------------------------------|--------------------------------------------------------------|
| 01     | bes-appsastsec-env             |                                          |  SAST-LGTM, Sonarqube, Semgrep, Gosec, OpenVAS, Vega, Grabber|


> **Application Security Testing (DAST)**

| Sl.No  | BeSman Env name                | Dependencies                             |  Entities Prebundled in besman Env                           |
|--------|--------------------------------|------------------------------------------|--------------------------------------------------------------|
| 01     | bes-pensec-env                 |                                          | DAST - ZAP, GoLismero, Metasploit, Burp Suite CE             | 


> **Penetration Testing**

| Sl.No  | BeSman Env name                | Dependencies                             |  Entities Prebundled in besman Env                           |
|--------|--------------------------------|------------------------------------------|--------------------------------------------------------------|
| 01     | bes-pensec-env                 |                                          | Kali Linux, Parrot Sec                                       | 