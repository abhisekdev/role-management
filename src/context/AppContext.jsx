/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer, useContext } from 'react'

// Initial state
const initialState = {
  users: [],
  roles: [],
  features: [],
  locations: [],
  assets: [],
  loading: false,
  error: null
}

// Create context
const AppContext = createContext()

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return { ...state, users: action.payload, loading: false }
    case 'FETCH_ROLES':
      return { ...state, roles: action.payload, loading: false }
    case 'FETCH_FEATURES':
      return { ...state, features: action.payload, loading: false }
    case 'FETCH_LOCATIONS':
      return { ...state, locations: action.payload, loading: false }
    case 'FETCH_ASSETS':
      return { ...state, assets: action.payload, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: true }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

// Context provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext)
