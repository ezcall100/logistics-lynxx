import { supabase } from '../lib/supabase'
import { User } from '../lib/supabase'

// User Management API Service
export interface CreateUserData {
  email: string
  password: string
  name?: string
  role: User['role']
}

export interface UpdateUserData {
  name?: string
  role?: User['role']
  avatar_url?: string
}

export interface UserFilters {
  role?: User['role']
  search?: string
  limit?: number
  offset?: number
}

// Get all users with filtering and pagination
export const getUsers = async (filters: UserFilters = {}) => {
  let query = supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  // Apply filters
  if (filters.role) {
    query = query.eq('role', filters.role)
  }

  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
  }

  if (filters.limit) {
    query = query.limit(filters.limit)
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error, count } = await query

  return { data, error, count }
}

// Get single user by ID
export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}

// Create new user
export const createUser = async (userData: CreateUserData) => {
  // First create the auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: userData.email,
    password: userData.password,
    email_confirm: true,
  })

  if (authError) {
    return { data: null, error: authError }
  }

  // Then create the profile
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
    })
    .select()
    .single()

  return { data: profileData, error: profileError }
}

// Update user profile
export const updateUser = async (id: string, updates: UpdateUserData) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

// Delete user
export const deleteUser = async (id: string) => {
  // First delete the profile
  const { error: profileError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id)

  if (profileError) {
    return { error: profileError }
  }

  // Then delete the auth user
  const { error: authError } = await supabase.auth.admin.deleteUser(id)

  return { error: authError }
}

// Get user statistics
export const getUserStats = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')

  if (error) {
    return { data: null, error }
  }

  const stats = {
    total: data.length,
    super_admin: data.filter(u => u.role === 'super_admin').length,
    admin: data.filter(u => u.role === 'admin').length,
    analyst: data.filter(u => u.role === 'analyst').length,
    viewer: data.filter(u => u.role === 'viewer').length,
  }

  return { data: stats, error: null }
}

// Get recent user activity
export const getRecentUsers = async (limit = 10) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  return { data, error }
}

// Bulk update user roles
export const bulkUpdateUserRoles = async (updates: { id: string; role: User['role'] }[]) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(updates.map(u => ({ id: u.id, role: u.role })))
    .select()

  return { data, error }
}
