/**
 * Generated by @openapi-codegen
 *
 * @version 1.0
 */
import * as reactQuery from '@tanstack/react-query'
import { useApiContext, ApiContext } from './apiContext'
import type * as Fetcher from './apiFetcher'
import { apiFetch } from './apiFetcher'
import type * as Schemas from './apiSchemas'

export type HomeControllerAppInfoError = Fetcher.ErrorWrapper<undefined>

export type HomeControllerAppInfoVariables = ApiContext['fetcherOptions']

export const fetchHomeControllerAppInfo = (
  variables: HomeControllerAppInfoVariables,
  signal?: AbortSignal
) =>
  apiFetch<undefined, HomeControllerAppInfoError, undefined, {}, {}, {}>({
    url: '/',
    method: 'get',
    ...variables,
    signal,
  })

export const useHomeControllerAppInfo = <TData = undefined,>(
  variables: HomeControllerAppInfoVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<undefined, HomeControllerAppInfoError, TData>,
    'queryKey' | 'queryFn' | 'initialData'
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } = useApiContext(options)
  return reactQuery.useQuery<undefined, HomeControllerAppInfoError, TData>({
    queryKey: queryKeyFn({
      path: '/',
      operationId: 'homeControllerAppInfo',
      variables,
    }),
    queryFn: ({ signal }) =>
      fetchHomeControllerAppInfo({ ...fetcherOptions, ...variables }, signal),
    ...options,
    ...queryOptions,
  })
}

export type LlmControllerRunQueryError = Fetcher.ErrorWrapper<undefined>

export type LlmControllerRunQueryVariables = {
  body: Schemas.RunQueryDto
} & ApiContext['fetcherOptions']

export const fetchLlmControllerRunQuery = (
  variables: LlmControllerRunQueryVariables,
  signal?: AbortSignal
) =>
  apiFetch<
    Schemas.QueryResponseDto,
    LlmControllerRunQueryError,
    Schemas.RunQueryDto,
    {},
    {},
    {}
  >({ url: '/api/llm/query', method: 'post', ...variables, signal })

export const useLlmControllerRunQuery = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      Schemas.QueryResponseDto,
      LlmControllerRunQueryError,
      LlmControllerRunQueryVariables
    >,
    'mutationFn'
  >
) => {
  const { fetcherOptions } = useApiContext()
  return reactQuery.useMutation<
    Schemas.QueryResponseDto,
    LlmControllerRunQueryError,
    LlmControllerRunQueryVariables
  >({
    mutationFn: (variables: LlmControllerRunQueryVariables) =>
      fetchLlmControllerRunQuery({ ...fetcherOptions, ...variables }),
    ...options,
  })
}

export type LlmControllerStreamQueryError = Fetcher.ErrorWrapper<undefined>

export type LlmControllerStreamQueryVariables = {
  body: Schemas.RunQueryDto
} & ApiContext['fetcherOptions']

export const fetchLlmControllerStreamQuery = (
  variables: LlmControllerStreamQueryVariables,
  signal?: AbortSignal
) =>
  apiFetch<
    undefined,
    LlmControllerStreamQueryError,
    Schemas.RunQueryDto,
    {},
    {},
    {}
  >({ url: '/api/llm/stream', method: 'get', ...variables, signal })

export const useLlmControllerStreamQuery = <TData = undefined,>(
  variables: LlmControllerStreamQueryVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<undefined, LlmControllerStreamQueryError, TData>,
    'queryKey' | 'queryFn' | 'initialData'
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } = useApiContext(options)
  return reactQuery.useQuery<undefined, LlmControllerStreamQueryError, TData>({
    queryKey: queryKeyFn({
      path: '/api/llm/stream',
      operationId: 'llmControllerStreamQuery',
      variables,
    }),
    queryFn: ({ signal }) =>
      fetchLlmControllerStreamQuery(
        { ...fetcherOptions, ...variables },
        signal
      ),
    ...options,
    ...queryOptions,
  })
}

export type QueryOperation =
  | {
      path: '/'
      operationId: 'homeControllerAppInfo'
      variables: HomeControllerAppInfoVariables
    }
  | {
      path: '/api/llm/stream'
      operationId: 'llmControllerStreamQuery'
      variables: LlmControllerStreamQueryVariables
    }
