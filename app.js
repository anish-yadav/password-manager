console.log('Starting password manager');
var crypto = require('crypto-js');
var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
.command('create', 'Create an account', function (yargs) {
  yargs.option({
    name: {
      demand: true,
      alias: 'n',
      description: 'Gets the name of the account',
      type: 'string'
    },
    username: {
      demand: true,
      alias: 'u',
      description: 'Username of the account',
      type: 'string'
    },
    password: {
      demand: true,
      alias: 'p',
      description: 'The password of the account',

    },
    masterPassword: {
      demand: true,
      alias: 'm',
      description:'The master password '
    }
  }).help('help');
})
.command('get', 'Gets the credential of the account', function (yargs){
  yargs.option({
    name: {
      demand: true,
      alias: 'n',
      description: 'Gets the name of the account',
      type: 'string'
    },
    masterPassword: {
      demand: true,
      alias: 'm',
      description:'The master password '
    }
  }).help('help');
})
.help('help')
.argv;

var command = argv._[0];

//account.name(string) facebook
//account.username   ani@any.com
//account.password(password)

function getAccounts (masterPassword) {
  var encryptedAccount = storage.getItemSync('accounts');
  var accounts =[];

  if (typeof encryptedAccount != 'undefined') {
    var bytes = crypto.AES.decrypt(encryptedAccount,masterPassword);
    var accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
  }

  return accounts;
}







function saveAccounts (accounts, masterPassword) {
 var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);


 storage.setItemSync('accounts',encryptedAccounts.toString());

 return accounts;

}





function createAccount (account, masterPassword){ //inputs an object
  var accounts  = getAccounts(masterPassword);

  accounts.push(account);

  saveAccounts(accounts, masterPassword);

  return account;
}






function getAccount (accountName, masterPassword) {
  var accounts = getAccounts(masterPassword);
  var matchedAcoount  ;
  //iterate over array return matching account else undefined



      accounts.forEach(function (account) {
    if (account.name === accountName) {
      matchedAcoount = account;
    }
  });


  return matchedAcoount;
}









if (command === 'create') {
  try {
    var createdAccount = createAccount({
      name:argv.name.toLowerCase(),
      username: argv.username,
      password: argv.password
    },argv.masterPassword);
    console.log('Account Created ');
    console.log(createdAccount);

  } catch (e) {
    console.log('Account creation failed');
  }

} else if (command === 'get') {
 try {
   var fetchedAccount = getAccount(argv.name.toLowerCase(), argv.masterPassword);

   if (typeof fetchedAccount === 'undefined') {
     console.log('Account not found!');
   } else {
     console.log('Account found!!');
     console.log(fetchedAccount);
   }
 } catch (e) {
  console.log('Unable to fetch accounts');
 }
} else {
  console.log('Invalid command');
}
