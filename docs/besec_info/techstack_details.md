## BeSman environments:
&nbsp;
&nbsp;


#### Techstack 1:  DevOps Tool  
&nbsp;



All are in requriment gathering and analysis Phase (R G&A)  

 >   **Ansible**

| Sl.No  | BeSman Env name                | Dependencies                             |   Entities Prebundled in besman Env                    |  Status 
|--------|--------------------------------|------------------------------------------|--------------------------------------------------------|-------------
| 01     | bes-ansibledev-env             | Python, Ruby, bash, ansible-galaxy       |   Git, Python, Pypi, VScode, Jenkin, Ansible-galaxy    |  R G&A  
| 02     | bes-ansiblesec-env             |                                          |   Java, Jenkin, bes-appsastsec-env, Python, Pypi       |  R G&A  


 >  **Chef**

| Sl.No  | BeSman Env name                | Dependencies                             |  Entities Prebundled in besman Env                     |  Status 
|--------|--------------------------------|------------------------------------------|--------------------------------------------------------|-------------
| 01     | bes-chefdev-env                | Ruby (client) and Ruby / Erlang (server) |  Git, RVM, Ruby, Erlang, VSCode, ChefSpec, Jenkin      |  R G&A  
| 02     | bes-chefsec-env                |                                          |  Git, RVM, bes-appsastsec-env, bes-appdastsec-env      |  R G&A  



#### Techstack 2:  Language and Framework security
&nbsp;


>  **Python-Django**

| Sl.No  | BeSman Env name                | Dependencies                             |  Entities Prebundled in besman Env                     |  Status 
|--------|--------------------------------|------------------------------------------|--------------------------------------------------------|-------------
| 01     | bes-pythonDjangodev-env        |                                          |  Git, Python, VSCode, pytest, jenkins                  |  R G&A
| 02     | bes-pythonDjangosec-env        |                                          |  Git, bes-appsastsec-env, bes-pensec-env, Pypi, Python |  R G&A


>   **Java-Spring**

| Sl.No  | BeSman Env name                | Dependencies                             |  Entities Prebundled in besman Env                     |  Status 
|--------|--------------------------------|------------------------------------------|--------------------------------------------------------|-------------
| 01     | bes-javaSpringdev-env          |                                          |  Git, openJDK, Apache Maven, Junit, Selenium, Jenkins  |  R G&A
| 02     | bes-javaSpringsec-env          |                                          |  Git, openJDK, bes-appsastsec-env, bes-pensec-env,     |  R G&A




#### Techstack 3:  Application security
&nbsp;

> **Drupal**

| Sl.No  | BeSman Env name                | Dependencies                             |  Entities Prebundled in besman Env                           |  Status 
|--------|--------------------------------|------------------------------------------|--------------------------------------------------------------|-------------
| 01     | bes-drupaldev-env              |                                          |  TBD                                                         |  R G&A
| 02     | bes-drupalsec-env              |                                          |  TBD, bes-appsastsec-env, bes-appdastsec-env, bes-pensec-env |  R G&A


> **Odoo**

| Sl.No  | BeSman Env name                | Dependencies                             |  Entities Prebundled in besman Env                           |  Status 
|--------|--------------------------------|------------------------------------------|--------------------------------------------------------------|-------------
| 01     |  bes-odoodev-env               |                                          | TBD                                                          |  R G&A
| 02     |  bes-odoosec-env               |                                          | TBD, bes-appsastsec-env, bes-appdastsec-env, bes-pensec-env  |  R G&A




#### Techstack  4:  Distributed Application or Blockchain Security
&nbsp;

 > **Hyperledger Indy**

| Sl.No  | BeSman Env name                | Dependencies                             |  Entities Prebundled in besman Env                              |  Status 
|--------|--------------------------------|------------------------------------------|-----------------------------------------------------------------|-------
| 01     | bes-hyperledgerIndydev-env     |                                          | Git, Python, Pypi, VSCode, Indy-node, Indy-sdk, crypto, Jenkins | R G&A
| 02     | bes-hyperledgerIndysec-env     |                                          | TBD, bes-appsastsec-env, bes-appdastsec-env, bes-pensec-env, Git| R G&A


> **Hyperledger Fabric** 

| Sl.No  | BeSman Env name                | Dependencies                             |  Entities Prebundled in besman Env                             |  Status 
|--------|--------------------------------|------------------------------------------|----------------------------------------------------------------|-----------
| 01     | bes-hyperledgerFabricdev-env   |                                          |  Git, Go, NPM, Docker, NodeJS, Jnekins, Docker compose, VSCode |  R G&A
| 02     | bes-hyperledgerFabricsec-env   |                                          |  Git, Go, bes-appsastsec-env, bes-appdastsec-env, NPM, Docker  |  R G&A



#### Techstack 5: Open Source Security Tool Security
&nbsp;
> **Application Security Testing (SAST )**

| Sl.No  | BeSman Env name                | Dependencies                             |  Entities Prebundled in besman Env                           |  Status 
|--------|--------------------------------|------------------------------------------|--------------------------------------------------------------|-------------
| 01     | bes-appsastsec-env             |                                          |  SAST-LGTM, Sonarqube, Semgrep, Gosec, OpenVAS, Vega, Grabber|  R G&A


> **Application Security Testing (DAST)**

| Sl.No  | BeSman Env name                | Dependencies                             |  Entities Prebundled in besman Env                           |  Status 
|--------|--------------------------------|------------------------------------------|--------------------------------------------------------------|-------------
| 01     | bes-pensec-env                 |                                          | DAST - ZAP, GoLismero, Metasploit, Burp Suite CE             | R G&A


> **Penetration Testing**

| Sl.No  | BeSman Env name                | Dependencies                             |  Entities Prebundled in besman Env                           |  Status 
|--------|--------------------------------|------------------------------------------|--------------------------------------------------------------|-------------
| 01     | bes-pensec-env                 |                                          | Kali Linux, Parrot Sec                                       | R G&A 



 