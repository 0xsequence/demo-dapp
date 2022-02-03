Demo Dapp
=========

Dapp example on how to use Sequence Wallet. Covers how to connect, sign messages and send transctions.

Try this dapp at: [https://0xsequence.github.io/demo-dapp](https://0xsequence.github.io/demo-dapp)

For complete documentation on Sequence, please see: [https://docs.sequence.build](https://docs.sequence.build)

## Usage

1. yarn
2. yarn start
3. Open browser to http://localhost:4000 to access the demo dapp
4. Open browser inspector to see responses from the remote Sequence Wallet

## Development

See https://github.com/0xsequence/demo-dapp/blob/master/src/App.tsx for the source
usage for a variety of functions. be sure t open your browser's dev inspector to see output.
Think of these functions as a "cookbook" for how you can perform these functions in your dapps.

Also note, sequence.js is built on top of ethers.js, and is API-compatible.

## Screenshots

**Opening wallet from dapp:**

![Open Sequence Wallet From Dapp](./screenshots/screen-open.png)


**Send transaction from dapp:**

Sequence Wallet is an Ethereum wallet supporting Ethereum mainnet, Polygon and more. Sequence will work
with any blockchain which is EVM compatible and supports Ethereum's node JSON-RPC interface.

Here you can see in this screenshot the call to "Send DAI" from demo-dapp
(https://github.com/0xsequence/demo-dapp/blob/master/src/routes/HomeRoute.tsx#L420). This function demonstrates
how you can transfer an ERC-20 token like DAI on any Ethereum network.

Notice how you can pay gas fees for a transaction in either MATIC token or USDC for price of $0.01.

![Transfer ERC-20 token on Polygon](./screenshots/screen-txn.png)



## LICENSE

Apache 2.0 or MIT (your choice)
