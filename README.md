# PasswordManager 
  This project is able to let users save the login credentials into the Firebase database. All the function is working already, the only thing you need to do is create your database and connect to the database. That's all!!

  This project is using Angular to build. Please make sure you have install `Angular CLI`
  
  **Table of Contents**
  - [How to run this project?](#how-to-run-this-project)


##How to run this project?
1. First, you need to install `Angular CLI` if you haven't install yet please refer [Here](https://angular.io/guide/setup-local)
2. Once the `Angular CLI` is ready on your machine, clone this project.
  ```
    git clone https://github.com/zhentong98/PasswordManager
  ```
3. Open your `terminal / Command Prompt` cd to that folder you clone just now.
4. Install all the packages we need for this project.
```
  npm install
```
5. Set up the firebase. [Firebase](https://firebase.google.com/?gclid=CjwKCAjw3MSHBhB3EiwAxcaEu2sJ8bL7s9x9kT2PX8i-bE0dSHpBHU4LQeVED3woyi5i4QdpoTxaWxoCHVEQAvD_BwE&gclsrc=aw.ds) <br>
  Click on the `Get Started`
   ![1](images/1.png)
   
6. Click on the `Add Project`
  ![2](images/2.png)
   
7. Enter your `Project Name` and click `Continue`
  ![3](images/3.png)
   
7. click the `Continue` again.
  ![4](images/4.png)
   
8. Here we select the `Default` one and click the `Create Project`.
  ![5](images/5.png)
   
9.Once the project created, then click the `Continue`.
  ![6](images/6.png)

10.Now the project already created, lets continue to enable the `Authentication`
  ![7](images/7.png)

11.Click on the `Get Started` button.
  ![8](images/8.png)

12.Click on the `Edit icon`.
  ![9](images/9.png)

13. Enable this and click `Save`.
  ![10](images/10.png)
    
14. Okay's `Authentication` is enabled, let's move forward to the Firestore Database.
  ![11](images/11.png)
    
15. Click on the `Create Database` button.
  ![12](images/12.png)
    
16. For now, we select the `test mode` first. We can change it later and click on the Next button.
  ![13](images/13.png)
    
17. Select the firestore location, I select the `asia-northeast2` and click on the `Enable` button.
  ![14](images/14.png)
    
18. Once the database created, should like this.
  ![15](images/15.png)
    
19. Nice!! `Firestore Database` we have also done. Let's move to the last step, configure the firebase connection for our Project.
  Click on the `settings` icon and select `Project settings`.
    ![16](images/16.png)
    
20. Scroll down click on this button.
  ![17](images/17.png)
    
21. Enter your project name and click `Register App`
  ![18](images/18.png)
    
22. Copy this information and paste into the [enviroment.ts](src/environments/environment.ts) and [enviroment.prod.ts](src/environments/environment.prod.ts).
  ![19](images/19.png)
    `enviroment.ts` <br>
    ![20](images/20.png)
    `enviroment.prod.ts` <br>
    ![20](images/21.png)
    
23. That's all you need to configure for this project! now you should able to run this project on your machine, cd to the folder where you clone this project, and run this command on your `Terminal / Command Prompt`
  ```
    ng serve
  ```
The default url should be this.
```
  http://localhost:4200
```
  
    
  

