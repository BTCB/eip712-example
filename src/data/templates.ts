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
    BatchTransfer: [
      { name: 'description', type: 'string' },
      { name: 'recipients', type: 'address[]' },
      { name: 'amounts', type: 'uint256[]' },
      { name: 'dataHashes', type: 'bytes32[]' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  },
  primaryType: 'BatchTransfer' as const,
  message: {
    description: 'Batch transfer to multiple recipients',
    recipients: [
      '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    ],
    amounts: ['1000000000000000000', '2500000000000000000', '500000000000000000'],
    dataHashes: [
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
    ],
    nonce: '42',
    deadline: '1698765432',
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
