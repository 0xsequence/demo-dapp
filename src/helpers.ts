export const getDefaultChainId = () => {
  const chainId = window.localStorage.getItem('defaultChainId')
  if (chainId === null || chainId === undefined) {
    return null
  } else {
    return Number(chainId)
  }
}

export const saveDefaultChainId = (chainId: number) => {
  console.log('huh?', chainId)
  window.localStorage.setItem('defaultChainId', `${chainId}`)
}

export const toHexString = (value: bigint) => {
  return '0x' + value.toString(16)
}
