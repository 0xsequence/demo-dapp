// TODO: remove, we're not using this.
import React from 'react'
import { useContext, useState, useEffect, useMemo } from 'react'
import { Observable, Unsubscriber } from 'micro-observables'

import { RouterStore } from './RouterStore'

export class Store {
  router = new RouterStore(this)
}

export const createStore = () => new Store()

export const StoreContext = React.createContext<Store | null>(null)

export const StoreProvider = ({ store, children }: { store: Store; children: React.ReactNode }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStoreRoot(): Store {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('store cannot be null! check your <StoreProvider ...>')
  }
  return store
}

export function useStore<T>(storeKey: keyof Store): T {
  return useObservables<T>(useStoreRoot()[storeKey])
}

export function useObservables<T>(store: any): T {
  const [, forceRender] = useState({})

  const observables = useMemo<Observable<any>[]>(() => {
    let v: Observable<any>[] = []
    const keys = Object.keys(store)
    for (let i = 0; i < keys.length; i++) {
      if (store[keys[i]] instanceof Observable) {
        v.push(store[keys[i]])
      }
    }
    return v
  }, [store])

  useEffect(() => {
    const unsubscribers: Unsubscriber[] = []
    for (let i = 0; i < observables.length; i++) {
      unsubscribers.push(
        observables[i].onChange(() => {
          forceRender({})
        })
      )
    }
    return () => {
      for (let i = 0; i < unsubscribers.length; i++) {
        unsubscribers[i]()
      }
    }
  }, observables)

  return store as T
}

export { observable, Observable } from 'micro-observables'
