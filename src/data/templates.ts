import type { ExampleTemplate } from '@/types/eip712';

const domainMessageSample = {
  domain: {
    name: 'EIP712Example',
    version: '1',
    chainId: 1,
    verifyingContract: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail' as const,
  message: {
    from: {
      name: 'Alice',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
};

const permitSample = {
  domain: {
    name: 'Permit2',
    chainId: 1,
    verifyingContract: '0x000000000022D473030F116dDEE9F6B43aC78BA3' as `0x${string}`,
  },
  types: {
    TokenPermissions: [
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    PermitTransferFrom: [
      { name: 'permitted', type: 'TokenPermissions' },
      { name: 'spender', type: 'address' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  },
  primaryType: 'PermitTransferFrom' as const,
  message: {
    permitted: {
      token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      amount: '1000000',
    },
    spender: '0x0000000000000000000000000000000000000001',
    nonce: '0',
    deadline: '1735689600',
  },
};

const etherMailSample = {
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
  },
};

/**
 * BatchTransfer: eth_signTypedData_v4 type coverage, no duplicate types.
 * Order: basic → nested structs → fixed bytes → fixed-size array → uint → uint[] → int → int[].
 */
const batchTransferSample = {
  domain: {
    name: 'MultiSig Transaction',
    version: '2',
    chainId: 1,
    verifyingContract: '0x123e4ad9951c7b0D09aB73AE96CD8a060666582A' as `0x${string}`,
  },
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    TransferItem: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    TransferMetadata: [
      { name: 'label', type: 'string' },
      { name: 'version', type: 'uint8' },
    ],
    BatchTransfer: [
      // --- Basic: string, address, address[], bool, bool[], bytes ---
      { name: 'description', type: 'string' },
      { name: 'singleAddress', type: 'address' },
      { name: 'recipients', type: 'address[]' },
      { name: 'flag', type: 'bool' },
      { name: 'flags', type: 'bool[]' },
      { name: 'dynamicBytes', type: 'bytes' },
      // --- Nested: struct, struct[] ---
      { name: 'metadata', type: 'TransferMetadata' },
      { name: 'items', type: 'TransferItem[]' },
      // --- Fixed-size bytes: bytes1, bytes4, bytes8, bytes16, bytes32, bytes1[], bytes32[] ---
      { name: 'fixedByte1', type: 'bytes1' },
      { name: 'fixedByte4', type: 'bytes4' },
      { name: 'fixedByte8', type: 'bytes8' },
      { name: 'fixedByte16', type: 'bytes16' },
      { name: 'fixedByte32', type: 'bytes32' },
      { name: 'fixedBytes1Array', type: 'bytes1[]' },
      { name: 'dataHashes', type: 'bytes32[]' },
      // --- Unsigned: uint8..uint256, uint8[], uint16[], uint32[], uint64[], uint128[], uint256[], uint256[M] ---
      { name: 'u8', type: 'uint8' },
      { name: 'u16', type: 'uint16' },
      { name: 'u32', type: 'uint32' },
      { name: 'u64', type: 'uint64' },
      { name: 'u128', type: 'uint128' },
      { name: 'u256', type: 'uint256' },
      { name: 'u8Array', type: 'uint8[]' },
      { name: 'u16Array', type: 'uint16[]' },
      { name: 'u32Array', type: 'uint32[]' },
      { name: 'u64Array', type: 'uint64[]' },
      { name: 'u128Array', type: 'uint128[]' },
      { name: 'u256Array', type: 'uint256[]' },
      { name: 'u256Fixed3', type: 'uint256[3]' },
    ],
  },
  primaryType: 'BatchTransfer' as const,
  message: {
    description: 'Batch transfer to multiple recipients',
    singleAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    recipients: [
      '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    ],
    flag: true,
    flags: [true, false, true],
    dynamicBytes: '0x48656c6c6f',
    metadata: { label: 'batch', version: 1 },
    items: [
      { to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', amount: '1000000000000000000' },
      { to: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', amount: '2500000000000000000' },
      { to: '0x90F79bf6EB2c4f870365E785982E1f101E93b906', amount: '500000000000000000' },
    ],
    fixedByte1: '0x01',
    fixedByte4: '0x12345678',
    fixedByte8: '0x1234567890abcdef',
    fixedByte16: '0x1234567890abcdef1234567890abcdef',
    fixedByte32: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    fixedBytes1Array: ['0x01', '0x02', '0xff'],
    dataHashes: [
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
    ],
    u8: '255',
    u16: '65535',
    u32: '4294967295',
    u64: '18446744073709551615',
    u128: '340282366920938463463374607431768211455',
    u256: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    u8Array: ['0', '1', '255'],
    u16Array: ['0', '65535', '100'],
    u32Array: ['0', '4294967295', '1000'],
    u64Array: ['0', '18446744073709551615', '10000'],
    u128Array: ['0', '340282366920938463463374607431768211455', '100000'],
    u256Array: ['1000000000000000000', '2500000000000000000'],
    u256Fixed3: ['1', '2', '3'],
  },
};

function toTypedDataJson(obj: object): string {
  return JSON.stringify(obj, null, 2);
}

export const EXAMPLE_TEMPLATES: ExampleTemplate[] = [
  {
    method: 'eth_signTypedData',
    label: 'eth_signTypedData (v1)',
    json: toTypedDataJson(domainMessageSample),
  },
  {
    method: 'eth_signTypedData_v3',
    label: 'eth_signTypedData_v3',
    json: toTypedDataJson(permitSample),
  },
  {
    method: 'eth_signTypedData_v4',
    label: 'Ether Mail',
    json: toTypedDataJson(etherMailSample),
  },
  {
    method: 'eth_signTypedData_v4',
    label: 'BatchTransfer (MultiSig)',
    json: toTypedDataJson(batchTransferSample),
  },
];
