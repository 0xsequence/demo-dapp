import {
  Box,
  Image,
  Text,
  Button,
  ExternalLinkIcon,
  Divider,
  Card,
  TransactionIcon,
  Select,
  TokenImage
} from '@0xsequence/design-system'

import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { sequence } from '0xsequence'

import { ETHAuth } from '@0xsequence/ethauth'
import { ERC_20_ABI } from './constants/abi'

import { configureLogger } from '@0xsequence/utils'

import logoUrl from './images/logo.svg'
import skyweaverBannerUrl from './images/skyweaver-banner.png'

import { Console } from './components/Console'
import { ConnectOptions, OpenWalletIntent, Settings } from '@0xsequence/provider'
import { Group } from './components/Group'
import { ChainId } from '@0xsequence/network'
import { networkImages } from './images/networks'
import { getDefaultChainId, saveDefaultChainId } from './helpers'

configureLogger({ logLevel: 'DEBUG' })

const DEFAULT_WALLET_APP_URL = 'https://sequence.app'
const DEFAULT_API_URL = 'https://api.sequence.app'

// Specify your desired default chain id. NOTE: you can communicate to multiple
// chains at the same time without even having to switch the network, but a default
// chain is required.
const defaultChainId = getDefaultChainId() || ChainId.MAINNET
// const defaultChainId = ChainId.POLYGON
// const defaultChainId = ChainId.GOERLI
// const defaultChainId = ChainId.ARBITRUM
// const defaultChainId = ChainId.AVALANCHE
// etc.. see the full list here: https://docs.sequence.xyz/multi-chain-support

// For Sequence core dev team -- app developers can ignore
// a custom wallet app url can specified in the query string
const urlParams = new URLSearchParams(window.location.search)
let walletAppURL = urlParams.get('walletAppURL')

if (walletAppURL && walletAppURL.length > 0) {
  // Wallet can point to a custom wallet app url
  // NOTICE: this is not needed, unless testing an alpha version of the wallet
  sequence.initWallet(defaultChainId, { walletAppURL })
} else {
  walletAppURL = DEFAULT_WALLET_APP_URL

  // Init the sequence wallet library at the top-level of your project with
  // your designed default chain id
  sequence.initWallet(defaultChainId, { walletAppURL })
}

// App component
const App = () => {
  const [consoleMsg, setConsoleMsg] = useState<null | string>(null)
  const [consoleLoading, setConsoleLoading] = useState<boolean>(false)
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)

  // Selected network is tracked in the dapp state
  // Sequence wallet allows talking to any network, any time
  // there is no need to switch networks
  const [chainId, setChainId] = useState<ChainId | undefined>()

  const wallet = sequence.getWallet()

  useEffect(() => {
    ;(async () => {
      const chainId = await wallet.getChainId()
      setChainId(chainId)
    })()
  }, [wallet])

  useEffect(() => {
    setIsWalletConnected(wallet.isConnected())
  }, [wallet])

  useEffect(() => {
    consoleWelcomeMessage()
    // eslint-disable-next-line
  }, [isWalletConnected])

  useEffect(() => {
    // Wallet events
    wallet.on('disconnect', () => {
      console.log('wallet disconnected')
      disconnect() // optional method, but useful in this example
    })
  }, [wallet])

  const defaultConnectOptions: ConnectOptions = {
    app: 'Demo Dapp',
    askForEmail: true
    // keepWalletOpened: true,
  }

  // Methods
  const connect = async (connectOptions: ConnectOptions = {}) => {
    if (isWalletConnected) {
      resetConsole()
      appendConsoleLine('Wallet already connected!')
      setConsoleLoading(false)
      return
    }

    connectOptions = {
      ...defaultConnectOptions,
      ...connectOptions,
      settings: {
        ...defaultConnectOptions.settings,
        ...connectOptions.settings
      }
    }

    try {
      resetConsole()
      appendConsoleLine('Connecting')
      const wallet = sequence.getWallet()

      const connectDetails = await wallet.connect(connectOptions)

      // Example of how to verify using ETHAuth via Sequence API
      if (connectOptions.authorize) {
        let apiUrl = urlParams.get('apiUrl')

        if (!apiUrl || apiUrl.length === 0) {
          apiUrl = DEFAULT_API_URL
        }

        const api = new sequence.api.SequenceAPIClient(apiUrl)
        // or just
        // const api = new sequence.api.SequenceAPIClient('https://api.sequence.app')

        const { isValid } = await api.isValidETHAuthProof({
          chainId: defaultChainId.toString(),
          walletAddress: connectDetails.session.accountAddress,
          ethAuthProofString: connectDetails.proof!.proofString
        })

        appendConsoleLine(`isValid (API)?: ${isValid}`)
      }

      // Example of how to verify using ETHAuth directl on the client
      if (connectOptions.authorize) {
        const ethAuth = new ETHAuth()

        if (connectDetails.proof) {
          const decodedProof = await ethAuth.decodeProof(connectDetails.proof.proofString, true)

          const isValid = await wallet.utils.isValidTypedDataSignature(
            await wallet.getAddress(),
            connectDetails.proof.typedData,
            decodedProof.signature,
            ethers.BigNumber.from(connectDetails.chainId).toNumber()
          )

          appendConsoleLine(`isValid (client)?: ${isValid}`)
        }
      }

      setConsoleLoading(false)
      if (connectDetails.connected) {
        setChainId(await wallet.getChainId())
        appendConsoleLine('Wallet connected!')
        appendConsoleLine(`shared email: ${connectDetails.email}`)
        setIsWalletConnected(true)
      } else {
        appendConsoleLine('Failed to connect wallet - ' + connectDetails.error)
      }
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const disconnect = () => {
    const wallet = sequence.getWallet()
    wallet.disconnect()
    consoleWelcomeMessage()
    setIsWalletConnected(false)
  }

  const openWallet = () => {
    const wallet = sequence.getWallet()
    wallet.openWallet()
  }

  const openWalletWithSettings = () => {
    const wallet = sequence.getWallet()

    const settings: Settings = {
      theme: 'light',
      includedPaymentProviders: ['moonpay', 'ramp', 'wyre'],
      defaultFundingCurrency: 'eth',
      defaultPurchaseAmount: 400,
      lockFundingCurrencyToDefault: false
    }

    const intent: OpenWalletIntent = {
      type: 'openWithOptions',
      options: {
        settings
      }
    }

    const path = 'wallet/add-funds'
    wallet.openWallet(path, intent)
  }

  const closeWallet = () => {
    const wallet = sequence.getWallet()
    wallet.closeWallet()
  }

  const isConnected = async () => {
    resetConsole()
    const wallet = sequence.getWallet()
    appendConsoleLine(`isConnected?: ${wallet.isConnected()}`)
    setConsoleLoading(false)
  }

  const isOpened = async () => {
    resetConsole()
    const wallet = sequence.getWallet()
    appendConsoleLine(`isOpened?: ${wallet.isOpened()}`)
    setConsoleLoading(false)
  }

  const getChainID = async () => {
    try {
      resetConsole()

      appendConsoleLine(`selected chainId: ${chainId}`)

      const topChainId = await wallet.getChainId()
      appendConsoleLine(`top chainId: ${topChainId}`)

      const provider = wallet.getProvider(chainId)
      const providerChainId = await provider!.getChainId()
      appendConsoleLine(`provider.getChainId(): ${providerChainId}`)

      const signer = wallet.getSigner(chainId)
      const signerChainId = await signer.getChainId()
      appendConsoleLine(`signer.getChainId(): ${signerChainId}`)

      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const getAccounts = async () => {
    try {
      resetConsole()

      const wallet = sequence.getWallet()
      const address = await wallet.getAddress()
      appendConsoleLine(`getAddress(): ${address}`)

      const provider = wallet.getProvider(chainId)
      const accountList = await provider!.listAccounts()
      appendConsoleLine(`accounts: ${JSON.stringify(accountList)}`)

      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const getBalance = async () => {
    try {
      resetConsole()

      const wallet = sequence.getWallet()

      const provider = wallet.getProvider(chainId)
      const account = await wallet.getAddress()
      const balanceChk1 = await provider!.getBalance(account)
      appendConsoleLine(`balance check 1: ${balanceChk1.toString()}`)

      const signer = wallet.getSigner(chainId)
      const balanceChk2 = await signer.getBalance()
      appendConsoleLine(`balance check 2: ${balanceChk2.toString()}`)

      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const getWalletState = async () => {
    try {
      resetConsole()

      const walletState = await wallet.getSigner(chainId).getWalletState()
      appendConsoleLine(`wallet state: ${JSON.stringify(walletState)}`)

      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const getNetworks = async () => {
    try {
      resetConsole()

      const wallet = sequence.getWallet()
      const networks = await wallet.getNetworks()

      appendConsoleLine(`networks: ${JSON.stringify(networks, null, 2)}`)
      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const signMessage = async () => {
    try {
      resetConsole()

      const wallet = sequence.getWallet()

      appendConsoleLine('signing message...')
      const signer = wallet.getSigner(chainId)

      const message = `1915 Robert Frost
The Road Not Taken
  
Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth
  
Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear
Though as for that the passing there
Had worn them really about the same,
  
And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.
  
I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.
  
\u2601 \u2600 \u2602`

      // sign
      const sig = await signer.signMessage(message)
      appendConsoleLine(`signature: ${sig}`)

      const isValid = await wallet.utils.isValidMessageSignature(
        await wallet.getAddress(),
        message,
        sig,
        await signer.getChainId()
      )
      appendConsoleLine(`isValid?: ${isValid}`)
      if (!isValid) throw new Error('sig invalid')

      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const signTypedData = async () => {
    try {
      resetConsole()
      const wallet = sequence.getWallet()

      appendConsoleLine('signing typedData...')

      const typedData: sequence.utils.TypedData = {
        types: {
          Person: [
            { name: 'name', type: 'string' },
            { name: 'wallet', type: 'address' }
          ],
          Mail: [
            { name: 'from', type: 'Person' },
            { name: 'to', type: 'Person' },
            { name: 'cc', type: 'Person[]' },
            { name: 'contents', type: 'string' },
            { name: 'attachements', type: 'string[]' }
          ]
        },
        primaryType: 'Mail',
        domain: {
          name: 'Ether Mail',
          version: '1',
          chainId: 1,
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
        },
        message: {
          from: {
            name: 'Cow',
            wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
          },
          to: {
            name: 'Bob',
            wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
          },
          cc: [
            { name: 'Dev Team', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB' },
            { name: 'Accounting', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB' }
          ],
          contents: 'Hello, Bob!',
          attachements: ['cat.png', 'dog.png']
        }
      }

      const signer = wallet.getSigner(chainId)

      const sig = await signer.signTypedData(typedData.domain, typedData.types, typedData.message)
      appendConsoleLine(`signature: ${sig}`)

      // validate
      const isValid = await wallet.utils.isValidTypedDataSignature(
        await wallet.getAddress(),
        typedData,
        sig,
        await signer.getChainId()
      )
      appendConsoleLine(`isValid?: ${isValid}`)

      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const estimateUnwrapGas = async () => {
    try {
      resetConsole()

      const wallet = sequence.getWallet()

      const wmaticContractAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
      const wmaticInterface = new ethers.utils.Interface(['function withdraw(uint256 amount)'])

      const tx: sequence.transactions.Transaction = {
        to: wmaticContractAddress,
        data: wmaticInterface.encodeFunctionData('withdraw', ['1000000000000000000'])
      }

      const provider = wallet.getProvider(chainId)!
      const estimate = await provider.estimateGas(tx)

      appendConsoleLine(`estimated gas needed for wmatic withdrawal : ${estimate.toString()}`)

      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const sendETH = async (signer?: sequence.provider.Web3Signer) => {
    try {
      resetConsole()
      const wallet = sequence.getWallet()

      signer = signer || wallet.getSigner(chainId)

      appendConsoleLine(`Transfer txn on ${signer.getChainId()} chainId`)

      // NOTE: on mainnet, the balance will be of ETH value
      // and on matic, the balance will be of MATIC value

      // Sending the funds to the wallet itself
      // so we don't lose any funds ;-)
      // (of course, you can send anywhere)
      const toAddress = await signer.getAddress()

      const tx1: sequence.transactions.Transaction = {
        delegateCall: false,
        revertOnError: false,
        gasLimit: '0x55555',
        to: toAddress,
        value: ethers.utils.parseEther('1.234'),
        data: '0x'
      }

      const tx2: sequence.transactions.Transaction = {
        delegateCall: false,
        revertOnError: false,
        gasLimit: '0x55555',
        to: toAddress,
        value: ethers.utils.parseEther('0.4242'),
        data: '0x'
      }

      const provider = signer.provider

      const balance1 = await provider.getBalance(toAddress)
      appendConsoleLine(`balance of ${toAddress}, before: ${balance1}`)

      const txnResp = await signer.sendTransactionBatch([tx1, tx2])
      appendConsoleLine(`txnResponse: ${JSON.stringify(txnResp)}`)

      const balance2 = await provider.getBalance(toAddress)
      appendConsoleLine(`balance of ${toAddress}, after: ${balance2}`)

      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const sendGoerliUSDC = async (signer?: sequence.provider.Web3Signer) => {
    try {
      resetConsole()

      const wallet = sequence.getWallet()

      signer = signer || wallet.getSigner(chainId) // select DefaultChain signer by default

      const toAddress = ethers.Wallet.createRandom().address
      const amount = ethers.utils.parseUnits('1', 1)

      // (USDC address on Goerli)
      const usdcAddress = '0x07865c6e87b9f70255377e024ace6630c1eaa37f'

      const tx: sequence.transactions.Transaction = {
        delegateCall: false,
        revertOnError: false,
        gasLimit: '0x55555',
        to: usdcAddress,
        value: 0,
        data: new ethers.utils.Interface(ERC_20_ABI).encodeFunctionData('transfer', [toAddress, amount.toHexString()])
      }

      const txnResp = await signer.sendTransactionBatch([tx], ChainId.GOERLI)
      appendConsoleLine(`txnResponse: ${JSON.stringify(txnResp)}`)

      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const sendDAI = async (signer?: sequence.provider.Web3Signer) => {
    try {
      resetConsole()

      const wallet = sequence.getWallet()

      signer = signer || wallet.getSigner(chainId) // select DefaultChain signer by default

      const toAddress = ethers.Wallet.createRandom().address
      const amount = ethers.utils.parseUnits('0.05', 18)
      const daiContractAddress = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063' // (DAI address on Polygon)

      const tx: sequence.transactions.Transaction = {
        delegateCall: false,
        revertOnError: false,
        gasLimit: '0x55555',
        to: daiContractAddress,
        value: 0,
        data: new ethers.utils.Interface(ERC_20_ABI).encodeFunctionData('transfer', [toAddress, amount.toHexString()])
      }

      const txnResp = await signer.sendTransactionBatch([tx])
      appendConsoleLine(`txnResponse: ${JSON.stringify(txnResp)}`)

      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const sendETHSidechain = async () => {
    try {
      const wallet = sequence.getWallet()

      // Send either to Arbitrum or Optimism
      // just pick one that is not the current chainId
      const pick = chainId === ChainId.ARBITRUM ? ChainId.OPTIMISM : ChainId.ARBITRUM
      sendETH(wallet.getSigner(pick))
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const send1155Tokens = async () => {
    try {
      resetConsole()
      appendConsoleLine('TODO')
      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const contractExample = async (signer?: sequence.provider.Web3Signer) => {
    try {
      resetConsole()

      const wallet = sequence.getWallet()

      signer = signer || wallet.getSigner(chainId)

      const abi = [
        'function balanceOf(address owner) view returns (uint256)',
        'function decimals() view returns (uint8)',
        'function symbol() view returns (string)',
        'function transfer(address to, uint amount) returns (bool)',
        'event Transfer(address indexed from, address indexed to, uint amount)'
      ]

      // USD Coin (PoS) on Polygon
      const address = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'

      const usdc = new ethers.Contract(address, abi, signer)

      const usdSymbol = await usdc.symbol()
      appendConsoleLine(`Token symbol: ${usdSymbol}`)

      const balance = await usdc.balanceOf(await signer.getAddress())
      appendConsoleLine(`Token Balance: ${balance.toString()}`)

      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const fetchTokenBalances = async () => {
    try {
      resetConsole()

      const wallet = sequence.getWallet()

      const signer = wallet.getSigner(chainId)
      const accountAddress = await signer.getAddress()

      const indexer = new sequence.indexer.SequenceIndexerClient(sequence.indexer.SequenceIndexerServices.POLYGON)

      const tokenBalances = await indexer.getTokenBalances({
        accountAddress: accountAddress,
        includeMetadata: true
      })

      appendConsoleLine(`tokens in your account: ${JSON.stringify(tokenBalances)}`)

      // NOTE: you can put any NFT/collectible address in the `contractAddress` field and it will return all of the balances + metadata.
      // We use the Skyweaver production contract address here for demo purposes, but try another one :)
      const skyweaverCollectibles = await indexer.getTokenBalances({
        accountAddress: accountAddress,
        includeMetadata: true,
        contractAddress: '0x631998e91476DA5B870D741192fc5Cbc55F5a52E'
      })
      appendConsoleLine(`skyweaver collectibles in your account: ${JSON.stringify(skyweaverCollectibles)}`)

      setConsoleLoading(false)
    } catch (e) {
      console.error(e)
      consoleErrorMessage()
    }
  }

  const appendConsoleLine = (message: string, clear = false) => {
    console.log(message)

    if (clear) {
      return setConsoleMsg(message)
    }

    return setConsoleMsg(prevState => {
      return `${prevState}\n\n${message}`
    })
  }

  const resetConsole = () => {
    setConsoleLoading(true)
  }

  interface AddNewConsoleLineOptions {
    logMessage?: boolean
  }

  const consoleWelcomeMessage = () => {
    setConsoleLoading(false)

    if (isWalletConnected) {
      setConsoleMsg('Status: Wallet is connected :)')
    } else {
      setConsoleMsg('Status: Wallet not connected. Please connect wallet first.')
    }
  }

  const consoleErrorMessage = () => {
    setConsoleLoading(false)
    setConsoleMsg('An error occurred')
  }

  // default network selector
  useEffect(() => {
    if (chainId === undefined) return
    if (defaultChainId !== chainId && !wallet.isConnected()) {
      saveDefaultChainId(chainId)
      window.location.reload()
    } else {
      // TODO: wallet.switchNetwork(chainId) etc..
      console.log('switching network to:', chainId)
    }
  }, [chainId])

  // networks list, filtered and sorted
  const omitNetworks = [
    ChainId.RINKEBY,
    ChainId.HARDHAT,
    ChainId.HARDHAT_2,
    ChainId.KOVAN,
    ChainId.FANTOM,
    ChainId.FANTOM_TESTNET,
    ChainId.ROPSTEN,
    ChainId.AURORA,
    ChainId.AURORA_TESTNET
  ]
  const networks = Object.values(sequence.network.networks)
    .filter(val => omitNetworks.indexOf(val.chainId) < 0)
    .sort((a, b) => (a.title > b.title ? 1 : -1))

  return (
    <Box marginY="0" marginX="auto" paddingX="6" style={{ maxWidth: '720px', marginTop: '80px', marginBottom: '80px' }}>
      <Box marginBottom="10">
        <a href="https://sequence.xyz/" target="_blank" rel="noopener">
          <Image height="6" alt="logo" src={logoUrl} />
        </a>
      </Box>

      <Box>
        <Text variant="normal" color="text100" fontWeight="bold">
          Demo Dapp
        </Text>
      </Box>

      <Box marginTop="1" marginBottom="4">
        <Text variant="normal" color="text80">
          A dapp example on how to use the Sequence Wallet. This covers how to connect, sign messages and send transctions.
        </Text>
      </Box>

      <Card background="backgroundMuted" alignItems="center" gap="3">
        <TransactionIcon />
        <Text variant="normal" color="text80">
          Please open your browser dev inspector to view output of functions below.
        </Text>
      </Card>

      <Divider background="buttonGlass" />

      <Box marginBottom="4">
        <Text as="div" variant="small" color="text100">
          Wallet URL
        </Text>

        <a href={walletAppURL} target="_blank" rel="noopener">
          <Box gap="1" marginTop="1" alignItems="center">
            <Text as="div" variant="normal" color="text80">
              {walletAppURL}
            </Text>
            <ExternalLinkIcon />
          </Box>
        </a>
      </Box>

      <Divider background="buttonGlass" />

      <Box marginBottom="4">
        <Select
          name="chainId"
          label={'Network'}
          labelLocation="top"
          onValueChange={value => setChainId(Number(value))}
          defaultValue={String(defaultChainId)}
          options={[
            ...Object.values(networks).map(network => ({
              label: (
                <Box alignItems="center" gap="2">
                  <TokenImage src={networkImages[network.chainId]} size="sm" />
                  <Text>{network.title!}</Text>
                </Box>
              ),
              value: String(network.chainId)
            }))
          ]}
        />
      </Box>

      <Group label="Connection">
        <Button width="full" shape="square" onClick={() => connect()} label="Connect" />
        <Button width="full" shape="square" onClick={() => connect({ authorize: true })} label="Connect & Auth" />
        <Button
          width="full"
          shape="square"
          onClick={() =>
            connect({
              authorize: true,
              settings: {
                // Specify signInOptions to pick the available sign in options.
                // signInOptions: ['email', 'google', 'apple'],
                theme: 'dark',
                bannerUrl: `${window.location.origin}${skyweaverBannerUrl}`,
                includedPaymentProviders: ['moonpay'],
                defaultFundingCurrency: 'matic',
                defaultPurchaseAmount: 111
              }
            })
          }
          label="Connect with Settings"
        />
        <Button
          width="full"
          shape="square"
          onClick={() => {
            const email = prompt('Auto-email login, please specify the email address:')
            connect({
              authorize: true,
              settings: {
                // Specify signInWithEmail with an email address to allow user automatically sign in with the email option.
                signInWithEmail: email,
                theme: 'dark',
                bannerUrl: `${window.location.origin}${skyweaverBannerUrl}`
              }
            })
          }}
          label="Connect with Email"
        />
        <Button width="full" shape="square" onClick={() => disconnect()} label="Disconnect" />
      </Group>

      <Group label="Basics">
        <Button width="full" shape="square" disabled={!isWalletConnected} onClick={() => openWallet()} label="Open Wallet" />
        <Button
          width="full"
          shape="square"
          disabled={!isWalletConnected}
          onClick={() => openWalletWithSettings()}
          label="Open Wallet with Settings"
        />
        <Button width="full" shape="square" disabled={!isWalletConnected} onClick={() => closeWallet()} label="Close Wallet" />
        <Button width="full" shape="square" disabled={!isWalletConnected} onClick={() => isConnected()} label="Is Connected?" />
        <Button width="full" shape="square" disabled={!isWalletConnected} onClick={() => isOpened()} label="Is Opened?" />
      </Group>

      <Group label="State">
        <Button width="full" shape="square" disabled={!isWalletConnected} onClick={() => getChainID()} label="ChainID" />
        <Button width="full" shape="square" disabled={!isWalletConnected} onClick={() => getNetworks()} label="Networks" />
        <Button width="full" shape="square" disabled={!isWalletConnected} onClick={() => getAccounts()} label="Get Accounts" />
        <Button width="full" shape="square" disabled={!isWalletConnected} onClick={() => getBalance()} label="Get Balance" />
        <Button
          width="full"
          shape="square"
          disabled={!isWalletConnected}
          onClick={() => getWalletState()}
          label="Get Wallet State"
        />
      </Group>

      <Group label="Signing">
        <Button width="full" shape="square" disabled={!isWalletConnected} onClick={() => signMessage()} label="Sign Message" />
        <Button
          width="full"
          shape="square"
          disabled={!isWalletConnected}
          onClick={() => signTypedData()}
          label="Sign TypedData"
        />
      </Group>

      <Group label="Simulation">
        <Button
          width="full"
          shape="square"
          disabled={!isWalletConnected}
          onClick={() => estimateUnwrapGas()}
          label="Estimate Unwrap Gas"
        />
      </Group>

      <Group label="Transactions">
        <Button width="full" shape="square" disabled={!isWalletConnected} onClick={() => sendETH()} label="Send funds" />
        <Button width="full" shape="square" disabled={!isWalletConnected} onClick={() => sendETHSidechain()} label="Send on L2" />
        <Button width="full" shape="square" disabled={!isWalletConnected} onClick={() => sendDAI()} label="Send DAI" />
        <Button
          width="full"
          shape="square"
          // TODO: Implement send ERC-1155 example
          disabled={!isWalletConnected || true}
          onClick={() => send1155Tokens()}
          label="Send ERC-1155 Tokens"
        />
        <Button
          width="full"
          shape="square"
          disabled={!isWalletConnected}
          onClick={() => sendGoerliUSDC()}
          label="Send USDC on Goerli"
        />
      </Group>

      <Group label="Various">
        <Button
          width="full"
          shape="square"
          disabled={!isWalletConnected}
          onClick={() => contractExample()}
          label="Read Symbol and Balance"
        />
        <Button
          width="full"
          shape="square"
          disabled={!isWalletConnected}
          onClick={() => fetchTokenBalances()}
          label="Fetch Token Balances"
        />
      </Group>

      <Console message={consoleMsg} loading={consoleLoading} />
    </Box>
  )
}

export default React.memo(App)
