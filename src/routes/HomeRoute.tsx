import React from 'react'
import { Box, Button } from '~/style'
import { ethers } from 'ethers'

import { sequence } from '0xsequence'

import { ETHAuth, Proof } from '@0xsequence/ethauth'
import { ERC_20_ABI } from '~/utils/abi'
import { sequenceContext } from '@0xsequence/network'

import { configureLogger } from '@0xsequence/utils'
configureLogger({ logLevel: 'DEBUG' })

const HomeRoute = () => {

  const network = 'polygon'
  const wallet = new sequence.Wallet(network)

  // NOTE: to use mumbai, first go to https://sequence.app and click on "Enable Testnet".
  // As well, make sure to comment out any other `const wallet = ..` statements.
  // const network = 'mumbai'
  // const wallet = new sequence.Wallet(network)

  // Example of changing the walletAppURL
  // const wallet = new sequence.Wallet(network, { walletAppURL: 'https://sequence.app' })

  wallet.on('message', (message) => {
    console.log('wallet event (message):', message)
  })

  wallet.on('accountsChanged', p => {
    console.log('wallet event (accountsChanged):', p)
  })

  wallet.on('chainChanged', p => {
    console.log('wallet event (chainChanged):', p)
  })

  wallet.on('connect', p => {
    console.log('wallet event (connect):', p)
  })

  wallet.on('disconnect', p => {
    console.log('wallet event (disconnect):', p)
  })

  wallet.on('open', p => {
    console.log('wallet event (open):', p)
  })

  wallet.on('close', p => {
    console.log('wallet event (close):', p)
  })

  const connect = async (authorize: boolean = false) => {
    const connectDetails = await wallet.connect({
      app: 'Demo Dapp',
      authorize
      // keepWalletOpened: true
    })

    console.warn('connectDetails', {connectDetails})

    if (authorize) {
      const ethAuth = new ETHAuth()

      const decodedProof = await ethAuth.decodeProof(connectDetails.proof.proofString, true)

      console.warn({decodedProof})

      const isValid = await wallet.utils.isValidTypedDataSignature(
        await wallet.getAddress(),
        connectDetails.proof.typedData,
        decodedProof.signature,
        await wallet.getAuthChainId()
      )
      console.log('isValid?', isValid)
      if (!isValid) throw new Error('sig invalid')
    }
  }

  const disconnect = () => {
    wallet.disconnect()
  }

  const openWallet = () => {
    wallet.openWallet()
  }

  const closeWallet = () => {
    wallet.closeWallet()
  }

  const isConnected = async () => {
    console.log('isConnected?', wallet.isConnected())
  }

  const isOpened = async () => {
    console.log('isOpened?', wallet.isOpened())
  }

  const getDefaultChainID = async () => {
    console.log('TODO')
  }

  const getAuthChainID = async () => {
    console.log('TODO')
  }

  const getChainID = async () => {
    console.log('chainId:', await wallet.getChainId())

    const provider = wallet.getProvider()
    console.log('provider.getChainId()', await provider.getChainId())

    const signer = wallet.getSigner()
    console.log('signer.getChainId()', await signer.getChainId())
  }

  const getAccounts = async () => {
    console.log('getAddress():', await wallet.getAddress())

    const provider = wallet.getProvider()
    console.log('accounts:', await provider.listAccounts())
  }

  const getBalance = async () => {
    const provider = wallet.getProvider()
    const account = await wallet.getAddress()
    const balanceChk1 = await provider.getBalance(account)
    console.log('balance check 1', balanceChk1.toString())

    const signer = wallet.getSigner()
    const balanceChk2 = await signer.getBalance()
    console.log('balance check 2', balanceChk2.toString())
  }

  const getWalletState = async () => {
    console.log('wallet state:', await wallet.getSigner().getWalletState())
  }

  const getNetworks = async () => {
    console.log('networks:', await wallet.getNetworks())
  }

  const signMessage = async () => {
    console.log('signing message...')
    const signer = wallet.getSigner()

    const message = `Two roads diverged in a yellow wood,
Robert Frost poet

And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
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
And that has made all the difference.`

    // sign
    const sig = await signer.signMessage(message)
    console.log('signature:', sig)

    // validate
    const isValid = await wallet.utils.isValidMessageSignature(
      await wallet.getAddress(),
      message,
      sig,
      await signer.getChainId()
    )
    console.log('isValid?', isValid)
    if (!isValid) throw new Error('sig invalid')

    // recover
    // const walletConfig = await wallet.utils.recoverWalletConfigFromMessage(
    //   await wallet.getAddress(),
    //   message,
    //   sig,
    //   await signer.getChainId(),
    //   sequenceContext
    // )
    // console.log('recovered walletConfig:', walletConfig)
    // const match = walletConfig.address.toLowerCase() === (await wallet.getAddress()).toLowerCase()
    // if (!match) throw new Error('recovery address does not match')
    // console.log('address match?', match)
  }

  const signAuthMessage = async () => {
    console.log('signing message on AuthChain...')
    const signer = await wallet.getAuthSigner()
    
    const message = 'Hi there! Please sign this message, 123456789, thanks.'

    // sign
    const sig = await signer.signMessage(message, await signer.getChainId())//, false)
    console.log('signature:', sig)

    // here we have sig from above method, on defaultChain ..
    const notExpecting = '0x0002000134ab8771a3f2f7556dab62622ce62224d898175eddfdd50c14127c5a2bb0c8703b3b3aadc3fa6a63dd2dc66107520bc90031c015aaa4bf381f6d88d9797e9b9f1c02010144a0c1cbe7b29d97059dba8bbfcab2405dfb8420000145693d051135be70f588948aeaa043bd3ac92d98057e4a2c0fbd0f7289e028f828a31c62051f0d5fb96768c635a16eacc325d9e537ca5c8c5d2635b8de14ebce1c02'
    if (sig === notExpecting) {
      throw new Error('this sig is from the DefaultChain, not what we expected..')
    }

    // validate
    const isValid = await wallet.utils.isValidMessageSignature(
      await wallet.getAddress(),
      message,
      sig,
      await signer.getChainId()
    )
    console.log('isValid?', isValid)
    if (!isValid) throw new Error('sig invalid')

    console.log('is wallet deployed on mainnet?', await wallet.isDeployed('mainnet'))
    console.log('is wallet deployed on matic?', await wallet.isDeployed('polygon'))

    // recover
    //
    // TODO: the recovery here will not work, because to use addressOf(), we must have
    // the init config for a wallet, wait for next index PR to come through then can fix this.
    //
    // TODO/NOTE: in order to recover this, the wallet needs to be updated on-chain,
    // or we need the init config.. check if its deployed and updated?
    // NOTE: this should work though, lets confirm it is deployed, and that the config is updated..
    // const walletConfig = await wallet.utils.recoverWalletConfigFromMessage(
    //   await wallet.getAddress(),
    //   message,
    //   sig,
    //   await signer.getChainId()
    // )

    // const match = walletConfig.address.toLowerCase() === (await wallet.getAddress()).toLowerCase()
    // // if (!match) throw new Error('recovery address does not match')
    // console.log('address match?', match)
  }

  const signTypedData = async () => {
    console.log('signing typedData...')

    const typedData: sequence.utils.TypedData = {
      domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: await wallet.getChainId(),
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
      },
      types: {
        'Person': [
          {name: "name", type: "string"},
          {name: "wallet", type: "address"}
        ]
      },  
      message: {
        'name': 'Bob',
        'wallet': '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
      }
    }    

    const signer = wallet.getSigner()

    const sig = await signer.signTypedData(typedData.domain, typedData.types, typedData.message)
    console.log('signature:', sig)

    // validate
    const isValid = await wallet.utils.isValidTypedDataSignature(
      await wallet.getAddress(),
      typedData,
      sig,
      await signer.getChainId()
    )
    console.log('isValid?', isValid)
    if (!isValid) throw new Error('sig invalid')

    // recover
    // const walletConfig = await wallet.utils.recoverWalletConfigFromTypedData(
    //   await wallet.getAddress(),
    //   typedData,
    //   sig,
    //   await signer.getChainId()
    // )
    // console.log('recovered walletConfig:', walletConfig)

    // const match = walletConfig.address.toLowerCase() === (await wallet.getAddress()).toLowerCase()
    // if (!match) throw new Error('recovery address does not match')
    // console.log('address match?', match)
  }

  const signETHAuth = async () => {
    const address = await wallet.getAddress()

    const authSigner = await wallet.getAuthSigner()
    console.log('AUTH CHAINID..', await authSigner.getChainId())
    const authChainId = await authSigner.getChainId()

    const proof = new Proof()
    proof.address = address
    proof.claims.app = 'wee'
    proof.claims.ogn = 'http://localhost:4000'
    proof.setIssuedAtNow()
    proof.setExpiryIn(1000000)

    const messageTypedData = proof.messageTypedData()

    const digest = sequence.utils.encodeTypedDataDigest(messageTypedData)
    console.log('we expect digest:', digest)


    const sig = await authSigner.signTypedData(messageTypedData.domain, messageTypedData.types, messageTypedData.message)
    console.log('signature:', sig)


    // validate
    const isValid = await wallet.utils.isValidTypedDataSignature(
      await wallet.getAddress(),
      messageTypedData,
      sig,
      authChainId
    )
    console.log('isValid?', isValid)
    if (!isValid) throw new Error('sig invalid')

    // recover
    // TODO/NOTE: in order to recover this, the wallet needs to be updated on-chain,
    // or we need the init config.. check if its deployed and updated
    // const walletConfig = await wallet.utils.recoverWalletConfigFromTypedData(
    //   await wallet.getAddress(),
    //   messageTypedData,
    //   sig,
    //   authChainId
    // )

    // console.log('recovered walletConfig:', walletConfig)
    // const match = walletConfig.address.toLowerCase() === (await wallet.getAddress()).toLowerCase()
    // // if (!match) throw new Error('recovery address does not match')
    // console.log('address match?', match)
  }

  const sendETH = async (signer?: sequence.provider.Web3Signer) => {
    signer = signer || wallet.getSigner() // select DefaultChain signer by default

    console.log(`Transfer txn on ${signer.getChainId()} chainId`)

    // NOTE: on mainnet, the balance will be of ETH value
    // and on matic, the balance will be of MATIC value
    // const balance = await signer.getBalance()
    // if (balance.eq(ethers.constants.Zero)) {
    //   const address = await signer.getAddress()
    //   throw new Error(`wallet ${address} has 0 balance, so cannot transfer anything. Deposit and try again.`)
    // }

    const toAddress = ethers.Wallet.createRandom().address

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

    console.log(`balance of ${toAddress}, before:`, await provider.getBalance(toAddress))

    const txnResp = await signer.sendTransactionBatch([tx1, tx2])
    await txnResp.wait()

    console.log(`balance of ${toAddress}, after:`, await provider.getBalance(toAddress))
  }

  const sendDAI = async(signer?: sequence.provider.Web3Signer) => {
    signer = signer || wallet.getSigner() // select DefaultChain signer by default

    const toAddress = ethers.Wallet.createRandom().address

    const amount = ethers.utils.parseUnits('5', 18)
    
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
    await txnResp.wait()
  }

  const sendETHSidechain = async () => {
    // const signer = wallet.getSigner(137)
    // Select network that isn't the DefaultChain..
    const networks = await wallet.getNetworks()
    const n = networks.find(n => n.isAuthChain)
    sendETH(wallet.getSigner(n))
  }

  const send1155Tokens = async () => {
    console.log('TODO')
  }

  // const sendBatchTransaction = async () => {
  //   console.log('TODO')
  // }

  return (
    <Box sx={{
      width: '80%',
      textAlign: 'center',
      mx: 'auto',
      color: 'black',
      my: '50px'
    }}>
      <h1 style={{ color: 'white', marginBottom: '10px' }}>Demo Dapp ({network && network.length > 0 ? network : 'mainnet' })</h1>

      <p style={{ color: 'white', marginBottom: '14px', fontSize: '14px', fontStyle: 'italic' }}>Please open your browser dev inspector to view output of functions below</p>

      <p>
        <Button px={3} m={1} onClick={() => connect()}>Connect</Button>
        <Button px={3} m={1} onClick={() => connect(true)}>Connect & Auth</Button>
        <Button px={3} m={1} onClick={() => disconnect()}>Disconnect</Button>
        <Button px={3} m={1} onClick={() => openWallet()}>Open Wallet</Button>
        <Button px={3} m={1} onClick={() => closeWallet()}>Close Wallet</Button>
        <Button px={3} m={1} onClick={() => isConnected()}>Is Connected?</Button>
        <Button px={3} m={1} onClick={() => isOpened()}>Is Opened?</Button>
        <Button px={3} m={1} onClick={() => getDefaultChainID()}>DefaultChain?</Button>
        <Button px={3} m={1} onClick={() => getAuthChainID()}>AuthChain?</Button>
      </p>
      <br />
      <p>
        <Button px={3} m={1} onClick={() => getChainID()}>ChainID</Button>
        <Button px={3} m={1} onClick={() => getNetworks()}>Networks</Button>
        <Button px={3} m={1} onClick={() => getAccounts()}>Get Accounts</Button>
        <Button px={3} m={1} onClick={() => getBalance()}>Get Balance</Button>
        <Button px={3} m={1} onClick={() => getWalletState()}>Get Wallet State</Button>
      </p>
      <br />
      <p>
        <Button px={3} m={1} onClick={() => signMessage()}>Sign Message</Button>
        <Button px={3} m={1} onClick={() => signTypedData()}>Sign TypedData</Button>
        <Button px={3} m={1} onClick={() => signAuthMessage()}>Sign Message on AuthChain</Button>
        <Button px={3} m={1} onClick={() => signETHAuth()}>Sign ETHAuth</Button>
      </p>
      <br />
      <p>
        <Button px={3} m={1} onClick={() => sendETH()}>Send on DefaultChain</Button>
        <Button px={3} m={1} onClick={() => sendETHSidechain()}>Send on AuthChain</Button>
        <Button px={3} m={1} onClick={() => sendDAI()}>Send DAI</Button>
        <Button px={3} m={1} onClick={() => send1155Tokens()}>Send ERC-1155 Tokens</Button>
        {/* <Button px={3} m={1} onClick={() => sendBatchTransaction()}>Send Batch Txns</Button> */}
      </p>

    </Box>
  )
}

const erc1155Abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export default React.memo(HomeRoute)
