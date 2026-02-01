/**
 * EIP-712 TypedData structures for viem signTypedData.
 * All three methods (v1, v3, v4) use the same domain/types/message shape;
 * the RPC method name differs per wallet. We expose method labels and samples.
 */
export type SignMethod = 'eth_signTypedData' | 'eth_signTypedData_v3' | 'eth_signTypedData_v4';

export interface EIP712Domain {
  name?: string;
  version?: string;
  chainId?: number;
  verifyingContract?: `0x${string}`;
  salt?: `0x${string}`;
}

export interface TypedDataRecord {
  [key: string]: unknown;
}

export interface TypedDataParams {
  domain: EIP712Domain;
  types: Record<string, Array<{ name: string; type: string }>>;
  primaryType: string;
  message: TypedDataRecord;
}

export interface ExampleTemplate {
  method: SignMethod;
  label: string;
  json: string;
}
