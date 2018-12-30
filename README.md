# password-manager
A password manager command terminal app in Node JS

Some instructions to use it 
1. Clone the repo using git clone git@github.com:anish-yadav/password-manager.git
2. Move into the repo folder using cd password-manager
3. install the node_modules using npm i

#Creating Account and Storing
1. To create an account i.e. to store an account credentials just run the below command
node app.js create -n yourAccountName -u yourUserName -pass yourPassword -m Master  password
ex : node app.js create -n facebook -u anyone@gmail.com -p 12345678 -m Master password

note : The Account name is not case sensitive but all others are so make sure you type it correctly

#Get Accounts
1. To get the credentials of an account just type the below command and press enter
node app.js get -n YourAccountName -m Master Password

ex : node app.js get --n facebook


2. to get any help just type node app.js --help


Thats all
Hope you like it.....
