# Gochain Accounts Manager

Seeds, queues, and dequeues account key pairs for managed accounts.

### Requirements

This library utilizes [the web3 CLI for Gochain](https://github.com/gochain/web3/), visit their repository for installation and documentation.


### Usage

Import to your authentication or account management module.

To get started, there is an `init` method that seeds accounts to length `N` specified in the queue.js file.

The default is set at 10, high numbers may result in rate limits or other errors.

Each dequeue operation requeues to maintain `N` length list of accounts that are ready for usage.

Use the files.js module to access list of keypairs directly. View tests for example implementations.



This software is AS-IS, and comes with no warranty or guarantee of performance. Use with caution and responsibility.