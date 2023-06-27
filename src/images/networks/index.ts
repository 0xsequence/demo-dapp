import { ChainId } from '@0xsequence/network'

import mainnet from './1.png'
import optimism from './10.png'
import gnosis from './100.png'
import polygonZkevm from './1101.png'
import polygon from './137.png'
import fantom from './250.png'
import arbitrum from './42161.png'
import arbitrumNova from './42170.png'
import avalanche from './43114.png'
import bsc from './56.png'

export const networkImages = {
  [ChainId.MAINNET]: mainnet,
  // [ChainId.RINKEBY]: mainnet,
  [ChainId.ROPSTEN]: mainnet,
  [ChainId.GOERLI]: mainnet,
  [ChainId.KOVAN]: mainnet,
  [ChainId.OPTIMISM]: optimism,
  [ChainId.OPTIMISM_TESTNET]: optimism,
  [ChainId.POLYGON]: polygon,
  [ChainId.POLYGON_MUMBAI]: polygon,
  [ChainId.POLYGON_ZKEVM]: polygonZkevm,
  [ChainId.ARBITRUM]: arbitrum,
  [ChainId.ARBITRUM_NOVA]: arbitrumNova,
  [ChainId.ARBITRUM_GOERLI]: arbitrum,
  [ChainId.GNOSIS]: gnosis,
  [ChainId.BSC]: bsc,
  [ChainId.BSC_TESTNET]: bsc,
  [ChainId.FANTOM]: fantom,
  [ChainId.FANTOM_TESTNET]: fantom,
  [ChainId.AVALANCHE]: avalanche,
  [ChainId.AVALANCHE_TESTNET]: avalanche
}
