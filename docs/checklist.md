|     <ins> Sl.No <ins>       |    <ins> Checkpoints <ins>       |
|:----:|-----------|
| **A** | <p align=center>**Naming Convention**</p> |
|A.1|All Command files will have a prefix besman-XXXX.sh and  XXXX must be the command name|
|A.2|All Environment files will have a prefix besman-XXXXX.sh and XXXXX  must be the environment name|
|A.3|All Internal besman functions that will be called in other bes scripts must begin with __bes|
|A.4|All function names should have meaningful names which denote what they are intended to do|
|[A.5](#)|All besman  environment scripts should have standard set of functions included in them and follow the following naming convention <br> <br>__bes_XXXX_YYYY() function  where XXXX is the corresponding command and YYYY is the environment name <br> <br> For example, if the environment name is "yyyy", then the corresponding commands would look like:- <br> <br> __besman_install_yyyy() <br> __besman_uninstall_yyyy() <br> __besman_update_yyyy() <br> __besman_upgrade_yyyy() <br> __besman_validate_yyyy() <br> __besman_start_yyyy() <br> __besman_stop_yyyy()     
| **B** | <p align=center>**Variable definition & Scoping**</p> |
|B.1|All environment variables should be in caps (eg besman_VERSION)|
|B.2|All export variables used in a script should be initiatlized in besman-init.sh|
|B.3|The environment variables should be invoked using export (in the beginning of the script) if they are intended to be used as is in the script|
|B.4|All local variables should be in small letters (eg argument(1))|
|B.5|The scope of local variables newly introduced should be confined to the functions they are defined in or within the script they have been defined|
|B.6|Any variable defined in a script which is to be reused in another script should be defined as Environment Variable|
| **C** | <p align=center>**Function Usage**</p> |
|C.1| __besman_echo function should be used instead of echo to display messages in the script|
|C.2| __besman_echo_debug function should be used to display specific error message in the script|
|C.3|Functions to return -1 if they encounter any error during execution or don't satisfy the condition being validated or processed|
|C.4|Return code from function execution other than 0 to be processed for exiting from script|
| **D** | <p align=center>**Test Scripts**</p> |
|D.1|All command scripts should have their correspondiing test scripts available for verification purpose and be made available along with code changes during code submission|
|D.2|All environment scripts should have their corresponding test scripts available for verification purpose and be made available along with code changes during code submission|
|D.3|All test scripts should have the following standard set of functions included in them :– <br> __test_bes_init() <br> __ test_bes_execute() <br> __ test_bes_validate() <br> __ test_bes_cleanup() <br> __ test_bes_run()|
|**E**| <p align=center>**Raising Pull Request**</p> |
|E.1|Pull request should be raised only after the code has been tested in the local environment by the developer, code reviewed & feedback comments closed by the developer|
|E.2|Code reviewers should raise pull request against the developer's repository to share feedback comments|
|E.3|Proper comments should be given explaining the changes in the code at a high level while raising the pull request|
|E.4|Verify if code can be optimized further - <br> * Remove indented if else loops with appropriate case statements <br> * Group lines of code into a function (if they are intended to achieve a specific objective) <br> * Reuse of existing defined functions than creating newer functions|
     
     
     
    
    
