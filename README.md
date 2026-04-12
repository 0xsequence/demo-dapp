<!-- > [!IMPORTANT] -->
<!-- > Wagmi is participating in Gitcoin Grants round 21. Consider <a href="https://explorer.gitcoin.co/#/round/42161/389/74">supporting the project</a>. Thank you. 🙏 -->

<br>

<p align="center">
  <a href="https://wagmi.sh">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wevm/wagmi/main/.github/logo-dark.svg">
      <img alt="wagmi logo" src="https://raw.githubusercontent.com/wevm/wagmi/main/.github/logo-light.svg" width="auto" height="60">
    </picture>
  </a>
</p>

<p align="center">
  Reactive primitives for Ethereum apps
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/wagmi">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/v/wagmi?colorA=21262d&colorB=21262d">
      <img src="https://img.shields.io/npm/v/wagmi?colorA=f6f8fa&colorB=f6f8fa" alt="Version">
    </picture>
  </a>
  <a href="https://github.com/wevm/wagmi/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/l/wagmi?colorA=21262d&colorB=21262d">
      <img src="https://img.shields.io/npm/l/wagmi?colorA=f6f8fa&colorB=f6f8fa" alt="MIT License">
    </picture>
  </a>
  <a href="https://www.npmjs.com/package/wagmi">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/@wagmi/core?colorA=21262d&colorB=21262d">
      <img src="https://img.shields.io/npm/dm/@wagmi/core?colorA=f6f8fa&colorB=f6f8fa" alt="Downloads per month">
    </picture>
  </a>
  <a href="https://bestofjs.org/projects/wagmi">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/endpoint?colorA=21262d&colorB=21262d&url=https://bestofjs-serverless.now.sh/api/project-badge?fullName=wevm%2Fwagmi%26since=daily">
      <img src="https://img.shields.io/endpoint?colorA=f6f8fa&colorB=f6f8fa&url=https://bestofjs-serverless.now.sh/api/project-badge?fullName=wevm%2Fwagmi%26since=daily" alt="Best of JS">
    </picture>
  </a>
  <a href="https://app.codecov.io/gh/wevm/wagmi">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/codecov/c/github/wevm/wagmi?colorA=21262d&colorB=21262d">
      <img src="https://img.shields.io/codecov/c/github/wevm/wagmi?colorA=f6f8fa&colorB=f6f8fa" alt="Code coverage">
    </picture>
  </a>
</p>

---

## Documentation

For documentation and guides, visit [wagmi.sh](https://wagmi.sh).

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discuss Wagmi on GitHub](https://github.com/wevm/wagmi/discussions)

For casual chit-chat with others using the framework:

[Join the Wagmi Discord](https://discord.gg/SghfWBKexF)

## Contributing

Contributions to Wagmi are greatly appreciated! If you're interested in contributing to Wagmi, please read the [Contributing Guide](https://wagmi.sh/dev/contributing) **before submitting a pull request**.

## Sponsors

If you find Wagmi useful or use it for work, please consider [sponsoring Wagmi](https://github.com/sponsors/wevm?metadata_campaign=gh_readme_support). Thank you 🙏  [Sponsor Wagmi](https://github.com/sponsors/wevm?metadata_campaign=gh_readme_support_bottom)


  </a>
  <p align="center">
  <a href="https://sequence.xyz">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/sequence-dark.svg">
      <img alt="sequence logo" src="https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/sequence-light.svg" width="auto" height="50">
    </picture>
  </a>
</p>


Demo app example on how to use Sequence Wallet. Covers how to connect, sign messages and send transactions.

Try this dapp at: [https://0xsequence.github.io/demo-dapp](https://0xsequence.github.io/demo-dapp)

For complete documentation on Sequence, please see: [https://docs.sequence.build](https://docs.sequence.build)

## Usage

1. pnpm install
2. pnpm start
3. Open browser to http://localhost:4000 to access the demo dapp
4. Open browser inspector to see responses from the remote Sequence Wallet

## Development

See https://github.com/0xsequence/demo-dapp/blob/master/src/App.tsx for the source
usage for a variety of functions. Be sure to open your browser's dev inspector to see output.
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


