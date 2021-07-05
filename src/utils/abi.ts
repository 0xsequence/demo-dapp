export const ERC_1155_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {
        internalType: 'uint256[]',
        name: '_ids',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: '_amounts',
        type: 'uint256[]'
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes'
      }
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export const ERC_20_ABI = [
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
