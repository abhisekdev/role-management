import { getAssets } from '../api/assetApi'
import { getFeatures } from '../api/featureApi'
import { getLocations } from '../api/locationApi'
import { getRoles } from '../api/roleApi'
import { getUsers } from '../api/userApi'
import Cookies from 'js-cookie'

export const handleLogout = () => {
  Cookies.remove('token')
  localStorage.clear()
  window.location.href = '/auth/login'
}

export const fetchUsers = async (dispatch) => {
  dispatch({ type: 'SET_LOADING' })
  try {
    const users = await getUsers()
    dispatch({ type: 'FETCH_USERS', payload: users })
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message })
  }
}

export const fetchRoles = async (dispatch) => {
  dispatch({ type: 'SET_LOADING' })
  try {
    const roles = await getRoles()
    dispatch({ type: 'FETCH_ROLES', payload: roles })
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message })
  }
}

export const fetchFeatures = async (dispatch) => {
  dispatch({ type: 'SET_LOADING' })
  try {
    const features = await getFeatures()
    dispatch({ type: 'FETCH_FEATURES', payload: features })
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message })
  }
}

export const fetchLocations = async (dispatch) => {
  dispatch({ type: 'SET_LOADING' })
  try {
    const locations = await getLocations()
    dispatch({ type: 'FETCH_LOCATIONS', payload: locations })
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message })
  }
}

export const fetchAssets = async (dispatch) => {
  dispatch({ type: 'SET_LOADING' })
  try {
    const assets = await getAssets()
    dispatch({ type: 'FETCH_ASSETS', payload: assets })
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message })
  }
}
