console.log('Starting password manager');

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
      alias: 'user',
      description: 'Username of the account',
      type: 'string'
    },
    password: {
      demand: true,
      alias: 'pass',
      description: 'The password of the account',

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
    }
  }).help('help');
})
.help('help')
.argv;

var command = argv._[0];

//account.name(string) facebook
//account.username   ani@any.com
//account.password(password)

function createAccount (account){ //inputs an object
  var accounts  = storage.getItemSync('accounts');

if (typeof accounts === 'undefined') {
  accounts = [];
}

  accounts.push(account);
  storage.setItemSync('accounts', accounts);

  return account;
}

function getAccount (accountName) {
  var accounts = storage.getItemSync('accounts');
  var matchedAcoount  ;
  //iterate over array return matching account else undefined

    if (typeof account != 'undefined') {

      accounts.forEach(function (account) {
    if (account.name === accountName) {
      matchedAcoount = account;
    }
  });
}

  return matchedAcoount;
}

if (command === 'create') {
  var createdAccount = createAccount({
    name:argv.name,
    username: argv.username,
    password: argv.password
  });
  console.log('Account Created ');
  console.log(createdAccount);

} else if (command === 'get') {
  var fetchedAccount = getAccount(argv.name);

  if (typeof fetchedAccount === 'undefined') {
    console.log('Account not found!');
  } else {
    console.log('Account found!!');
    console.log(fetchedAccount);
  }
} else {
  console.log('Invalid command');
}
