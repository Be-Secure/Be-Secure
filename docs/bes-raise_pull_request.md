
## Process to raise a pull request


### Pull request from developer's point of view

It is recommended to create a new branch in developer's local github repository for working on new code changes/features .
Once developer's code change has completed the developer should make a pull request to any other [contributor's](https://github.com/Be-secure/be-secure/network/members) 
recommended branch to testing the code out based on the [checklist](./bes-checklist.md) . 

A developer is recommeded to follow the listed steps , for successful merge of their code pull requests. 

**step 1:** For avoiding future merge conflicts sync your master repository with Be-Secure/master. 

**step 2:** Sync you local master branch with remote branch master (recommended)

**step 3:** create a new branch from synced master branch with assigned (optional eg: RF-xxxx ) 

**step 4:** Should work on the newly created branch mentioned in **step 3** 

**step 5:** Once the work is done make a pull request from branch mentioned in **step 3** to contributors specified branch.




____________________________________

### Pull request from code reviewer's point of view

The contributor merges the isolated code change pull request to the local branch created specifically for this code review.
and tests out the functionalty,do a thorough review based on the [checklist provided by the team Be-Secure](./bes-checklist.md). Once the the contributor feels like the code is functional , and it satisfies the checklist
they should provide a LGTM approval in the Be-Secure [pull section](https://github.com/Be-Secure/Be-Secure/pulls) . Only then the code gets merged to Be-Secure's github [master repository](https://github.com/Be-Secure/Be-Secure).

A code reviewer is recommeded to follow the listed steps , before providing LGTM approval. 

**step 1:** Merge the pull request to new_branch created specifically for testing the code changes in this pull request (new_branch should be synced with Be-Secure/master ) 

**step 3:** Once merged need to test it out by releasing a local version and install/test kob utility from the code reviewers local system.

**step 4:** If the functionality is working as expected , do thorough code review based on [checklist ](./bes-checklist.md)

**step 5:** Finally if the code passes the checklist , give a LGTM approval 

____________________________

### other recommended steps:
**step :** The title of the pull request should match the [issue ](https://github.com/Be-Secure/Be-Secure/issues) raised related to the same.

**step :** The pull request template is to be filled in before submission, ensuring that it is linked back to the Github Issue number by replacing #XXX with the appropriate Issue reference.

**step :** Each pull request should also be accompanied by a passing test(s) proving it's validity (where feasible).





